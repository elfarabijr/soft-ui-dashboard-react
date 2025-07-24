import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Avatar,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { urlApi } from 'features/autSlice';
import SoftButton from 'components/SoftButton';
import CloseIcon from '@mui/icons-material/Close';
import brand from "assets/images/bizmeup-color.png";
import SoftBox from 'components/SoftBox';
import { getToken } from 'features/autSlice';
import { TextInput } from 'components/CustomInput';
import { checkIdProgram } from 'globalFunction';
import { addCourseIdToLocalStorage } from 'globalFunction';
import { stringAvatar } from 'globalFunction';
import { TextArea } from 'components/CustomInput';
import ErrorLoadData from 'components/ErrorLoadData';
import { formatTel } from 'globalFunction';
import SkeletonLoading from '../component/SkeletonLoading';
import NotFound from '../component/NotFound';
import ShareButton from '../component/ShareButton';
import PageLayout from 'examples/LayoutContainers/PageLayout';

const bannerImage =
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1280&q=80';

const DetailLayanan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [errLoad, setErrLoad] = useState(null);
  const [dtLayanan, setdtLayanan] = useState(null);
  const [userDt, setUserDt] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [snackOp, setSnackOp] = useState(false);
  const [snackSc, setSnackSc] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [terdaftar, setTerdaftar] = useState(false);
  // form registrasi state
  const [regName, setRegName] = useState('');
  const [kontak, setKontak] = useState('');
  const [ket, setKet] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const fetchProgData = async () => {
      try {
        const response = await axios.get(`${urlApi}/jenislayanan/programs`);
        const prgdt = response.data.programs.filter(it => it.id === id)[0] || null;
        setdtLayanan(prgdt);
        setErrLoad(null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setdtLayanan(null);
        setErrLoad("Terjadi kesalahan");
        setIsLoading(false);
      }
    };

    const userLoc = localStorage.getItem('user');
    if (userLoc) {
      setUserDt(JSON.parse(userLoc));
    }

    const isId = checkIdProgram(id);
    if (isId) {
      setTerdaftar(true);
    }

    fetchProgData();
  }, [id]);

  const klikJoin = () => {
    if (!userDt) {
      const redirectUrl = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      setOpenRegisterModal(true);
    }
  }

  const handleCloseModal = () => {
    setOpenRegisterModal(false);
    setRegName('');
    setKontak('');
    setKet('');
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);

    const dt = {
      jenisLayanan: dtLayanan.namaProgram,
      idProgram: id,
      idjnslayanan: dtLayanan.jenisLayananId,
      keterangan: ket.slice(0, 150),
      urlBanner: dtLayanan.banner,
      pengisi: dtLayanan.narasumber?.nama || "Bizmeup",
      namaPeserta: regName || userDt.namaLengkap,
      contact: kontak ? kontak : userDt.contact,
      pembuat: userDt.namaLengkap,
      usaha: userDt.tenant,
      komunitas: userDt.komunitas,
      tenanId: userDt.tenantId,
    };

    try {
      await axios.post(urlApi + "/layanan", dt, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      setTerdaftar(true);
      addCourseIdToLocalStorage(id);
      setLoadingAdd(false);
      handleCloseModal();
      setSnackSc(true);
    } catch (error) {
      setLoadingAdd(false);
      setOpenRegisterModal(false);
      setSnackOp(true);
    }
  };

  const handleSnackCl = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackSc(false);
    setSnackOp(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const input = e.target.value;
    // Remove all non-digit chars to get raw digits
    const digitsOnly = input.replace(/\D/g, '');
    if (digitsOnly === '') {
      // Empty input
      setKontak("");
      return;
    }
    setKontak(digitsOnly);
  };

  if (isLoading) return <PageLayout><SkeletonLoading /></PageLayout>
  if (errLoad) return <PageLayout><ErrorLoadData /></PageLayout>
  if (!dtLayanan) return <PageLayout><NotFound /></PageLayout>

  return (
    <>
      <PageLayout>

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 768,
            paddingY: 4,
            px: 3,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
            <Link to={"/"}><SoftBox component="img" src={brand} alt="Bizmeup" width="180px" /></Link>
            <ShareButton />
          </Box>
          {/* Course Banner */}
          <Box
            sx={{
              position: 'relative',
              height: 220,
              borderRadius: 3,
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="img"
              src={dtLayanan?.banner || bannerImage}
              alt="Course banner"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.6)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: 3,
              }}
            >
              <Typography variant="h3" fontWeight="bold" sx={{ color: '#fff' }} component="h1" gutterBottom>
                {dtLayanan.namaProgram}
              </Typography>
              <Typography variant="h6" sx={{ color: '#eee' }}>{dtLayanan.objective}</Typography>
            </Box>
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={4}>
            {/* Left Column - Course Info */}
            <Grid item xs={12} md={8}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                {dtLayanan.deskripsi}
              </Typography>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Benefit
                </Typography>
                <List>
                  {dtLayanan.benefit.map((ket, idx) => (
                    <ListItem key={ket + idx} disableGutters>
                      <ListItemText
                        primary={"- " + ket}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Area Layanan
                </Typography>
                <List>
                  {dtLayanan.areaLayanan.map((ket, idx) => (
                    <ListItem key={ket + idx} disableGutters>
                      <ListItemText
                        primary={ket}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>

            {/* Right Column - Instructor & Enrollment */}
            <Grid item xs={12} md={4}>
              <Card elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar {...stringAvatar(dtLayanan.narasumber?.nama || 'Instruktur')} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {dtLayanan.narasumber?.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instructor
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {dtLayanan.narasumber?.gelar}<br />{dtLayanan.narasumber?.karya}
                </Typography>

                <Divider sx={{ mb: 3 }} />
                <Box mt={1} mb={2}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Info Layanan
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2">{dtLayanan.durasiPerSesi}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Frekuensi:
                  </Typography>
                  <Typography variant="body2">{dtLayanan.frekuensi}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Peserta:
                  </Typography>
                  <Typography variant="body2">{dtLayanan.peserta}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Tempat
                  </Typography>
                  <Typography variant="body2">{dtLayanan.tempat}</Typography>
                </Box>
                {!terdaftar && <SoftButton
                  type="button"
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={klikJoin}
                  disabled={false}
                >
                  Join Now
                </SoftButton>}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </PageLayout>
      {/* Registration Modal */}
      <Dialog open={openRegisterModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Registration Form
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleRegistrationSubmit} sx={{ mt: 1 }}>
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
            <SoftBox>
              <TextInput
                value={formatTel(kontak)}
                onChange={handleChange}
                placeholder="No. HP"
                autoComplete="tel"
                type="tel"
                inputprops={{ inputMode: 'numeric', maxLength: 15 }}
                required
                maxLength={15}
                name="phone"
                label="Telepon"
                id="phone"
              />
            </SoftBox>
            <SoftBox>
              <TextArea
                id="keterangan"
                label="Keterangan"
                name="keterangan"
                placeholder="catatan / alasan..."
                required
                value={ket}
                onChange={(e) => setKet(e.target.value)}
                rows={3}
              />
            </SoftBox>
            <DialogActions sx={{ px: 0, pt: 3 }}>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <SoftButton
                type="submit"
                variant="gradient"
                color="primary"
                disabled={loadingAdd}
              >
                {loadingAdd ? "Loading..." : "Submit"}
              </SoftButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackOp}
        autoHideDuration={2000}
        onClose={handleSnackCl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackCl} severity="error" sx={{ width: '90%' }}>
          Gagal registrasi layanan.
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackSc}
        autoHideDuration={4000}
        onClose={handleSnackCl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackCl} variant="filled" severity="success" sx={{ width: '90%' }}>
          Selamat, kamu telah berhasil registrasi.
        </Alert>
      </Snackbar>
    </>
  );
};

export default DetailLayanan;