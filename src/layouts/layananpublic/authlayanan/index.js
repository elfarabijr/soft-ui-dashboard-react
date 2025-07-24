import React, { useState } from 'react';
import {
    Typography,
    Link,
    Grid,
    Alert,
    Card,
    Snackbar,
    Slide,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import curved6 from "assets/images/curved-images/curved14.jpg";
import PageLayout from 'examples/LayoutContainers/PageLayout';
import SoftBox from 'components/SoftBox';
import brand from "assets/images/bizmeup.png";
import SoftButton from 'components/SoftButton';
import { TextInput } from 'components/CustomInput';
import { PasswordInput } from 'components/CustomInput';
import { LoginUser } from 'features/autSlice';
import { useDispatch } from 'react-redux';
import { reset } from 'features/autSlice';
import { getMe } from 'features/autSlice';
import { getToken } from 'features/autSlice';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const AuthLayanan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Extract redirect param from query string
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect') || '/';

    const [loginMode, setLoginMode] = useState(true); // true=login, false=register
    const [isLoading, setIsLoading] = useState(false);
    // Login form state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // Register form state
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');

    const [errAlert, setErrAlert] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [open, setOpen] = useState(false);

    const Auth = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setErrAlert('');
        setIsLoading(true);

        if (!loginEmail || !loginPassword) {
            setErrAlert('Isi semua kolom.');
            setIsLoading(false);
            setOpen(true);
            return;
        }

        const userCredential = { email: loginEmail, password: loginPassword };
        try {
            const result = await dispatch(LoginUser(userCredential));

            if (result.error) {
                setErrorMessage(result.error.message || 'Email atau password salah!')
                setIsLoading(false);
                dispatch(reset());
                return;
            }

            const hasil = await dispatch(getMe(getToken()));
            if (hasil.error) {
                setErrorMessage(hasil.error.message || 'Gagal memvalidasi user!')
                setIsLoading(false);
                dispatch(reset());
                return;
            }

            const user = hasil.payload;
            localStorage.setItem("user", JSON.stringify(user));
            navigate(redirect);

        } catch (error) {
            console.error("Auth error:", error);
            setErrAlert(error.message || 'Gagal Login, Coba beberapa saat lagi.');
            setOpen(true);
        } finally {
            setIsLoading(false);
            dispatch(reset());
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        if (regPassword !== regConfirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        // Simulate registration success
        setSuccessMessage('Registration successful! You can now log in.');
        // Clear registration form
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        // Switch to login mode to allow user to login
        setLoginMode(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <PageLayout>
            <SoftBox
                width="calc(100% - 2rem)"
                minHeight="35vh"
                borderRadius="lg"
                mx={2}
                my={2}
                pt={6}
                pb={28}
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        curved6 &&
                        `${linearGradient(
                            rgba(gradients.dark.main, 0.6),
                            rgba(gradients.dark.state, 0.6)
                        )}, url(${curved6})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
                    <Grid xs={10} lg={4}>
                        <SoftBox component="img" src={brand} alt="Bizmeup" width="200px" />
                    </Grid>
                </Grid>
            </SoftBox>
            <SoftBox mt={{ xs: -28, md: -26 }} px={4} mb={4} width="calc(100% - 2rem)" >
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={11} sm={9} md={4} >
                        <Card>
                            <SoftBox p={3} mb="8" textAlign="center">
                                <Typography component="h1" variant="h5" fontWeight="bold" mb={3}>
                                    {loginMode ? 'Sign in to BizmeUp' : 'Create an Account'}
                                </Typography>
                                {errorMessage && (
                                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                        {errorMessage}
                                    </Alert>
                                )}
                                {successMessage && (
                                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                                        {successMessage}
                                    </Alert>
                                )}

                                {loginMode ? (
                                    <SoftBox pt={1} pb={2} textAlign="center">
                                        <SoftBox component="form" role="form" onSubmit={Auth}>
                                            <SoftBox mb={1}>
                                                <TextInput
                                                    id="email"
                                                    label="Email"
                                                    type="email"
                                                    value={loginEmail}
                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    autoComplete="email"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mb={1}>
                                                <PasswordInput
                                                    id="password"
                                                    label="Password"
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mt={4} mb={1}>
                                                <SoftButton
                                                    type="submit"
                                                    variant="gradient"
                                                    color="info"
                                                    fullWidth
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Loading..." : "Masuk"}
                                                </SoftButton>
                                            </SoftBox>
                                        </SoftBox>
                                        {/* <Typography variant="body2" gutterBottom mt={0}>
                                            Belum memiliki akun?{" "}
                                            <Link
                                                component="button"
                                                variant="body2"
                                                style={{ color: "blue" }}
                                                underline="hover"
                                                onClick={() => {
                                                    setErrorMessage('');
                                                    setSuccessMessage('');
                                                    setLoginMode(false);
                                                }}
                                            >
                                                Registrasi
                                            </Link>
                                        </Typography> */}
                                    </SoftBox>
                                ) : (
                                    <SoftBox pt={1} pb={2} textAlign="center">
                                        <SoftBox component="form" role="form" onSubmit={handleRegisterSubmit}>
                                            <SoftBox mb={1}>
                                                <TextInput
                                                    id="fullname"
                                                    label="Nama Lengkap"
                                                    type="text"
                                                    value={regName}
                                                    onChange={(e) => setRegName(e.target.value)}
                                                    placeholder="Your fullname"
                                                    autoComplete="fullname"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mb={1}>
                                                <TextInput
                                                    id="email"
                                                    label="Email"
                                                    type="email"
                                                    value={regEmail}
                                                    onChange={(e) => setRegEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    autoComplete="email"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mb={1}>
                                                <PasswordInput
                                                    id="password"
                                                    label="Password"
                                                    value={regPassword}
                                                    onChange={(e) => setRegPassword(e.target.value)}
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mb={1}>
                                                <PasswordInput
                                                    id="confpassword"
                                                    label="Confirm Password"
                                                    value={regConfirmPassword}
                                                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                                                    placeholder="Re-type your password"
                                                    required
                                                />
                                            </SoftBox>
                                            <SoftBox mt={4} mb={1}>
                                                <SoftButton
                                                    type="submit"
                                                    variant="gradient"
                                                    color="primary"
                                                    fullWidth
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Loading..." : "Daftar"}
                                                </SoftButton>
                                            </SoftBox>
                                        </SoftBox>
                                        <Typography variant="body2" gutterBottom mt={0}>
                                            Sudah punya akun?{" "}
                                            <Link
                                                component="button"
                                                variant="body2"
                                                style={{ color: "blue" }}
                                                underline="hover"
                                                onClick={() => {
                                                    setErrorMessage('');
                                                    setSuccessMessage('');
                                                    setLoginMode(true);
                                                }}
                                            >
                                                Login
                                            </Link>
                                        </Typography>
                                    </SoftBox>
                                )}
                            </SoftBox>
                        </Card>
                    </Grid>
                </Grid>
            </SoftBox>
            <Snackbar open={open} autoHideDuration={2000} slots={{ transition: SlideTransition }} onClose={handleSnackClose}>
                <Alert severity="error">{errAlert || 'Terjadi kesalahan, silahkan coba lagi'}</Alert>
            </Snackbar>
        </PageLayout>
    );
};

export default AuthLayanan;