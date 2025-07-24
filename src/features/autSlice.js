import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const urlApi = "http://localhost:4000/api";
// export const urlApi = "https://api.bizmeup.id/api";

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}
// untuk heandling error
export const LoginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post(urlApi + '/login', {
            email: user.email,
            password: user.password
        });

        localStorage.setItem("token", response.data.token);

        return response.data.token;
    } catch (error) {
        // Pengecekan berjenjang untuk memastikan error.response dan error.response.data ada
        if (error.response && error.response.data) {
            const message = error.response.data.msg || "An error occurred";
            return thunkAPI.rejectWithValue(message);
        } else {
            const message = error.message || "Network error";
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Reset password
export const ResetPass = createAsyncThunk("user/resetPass", async (email, thunkAPI) => {
    try {
        const response = await axios.post(urlApi + '/forgotpassword', { email: email });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
        return "Tidak dapat melakukan reset password";
    }
});

export const RegisterUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => { });

// getMe karna dia punya function pada backendnya
export const getMe = createAsyncThunk("user/getMe", async (token, thunkAPI) => {
    const getUserId = getIdUser(token); // Dapatkan user_id dari token
    try {
        const response = await axios.get(urlApi + '/user/' + getUserId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        // Pengecekan berjenjang untuk error.response
        if (error.response && error.response.data) {
            const message = error.response.data.msg || "An error occurred";
            return thunkAPI.rejectWithValue(message);
        } else {
            const message = error.message || "Network error";
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
            state.user = null;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });

        // Get User Login 
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        });

        // send forgotPass
        builder.addCase(ResetPass.pending, (state) => {
            state.isLoading = true;
            state.message = "";
        });
        builder.addCase(ResetPass.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(ResetPass.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

export const getUsername = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.email : null;
};

export const getIdUser = (token) => {
    const decoded = jwtDecode(token);
    return decoded.user_id;
}

export const cekExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

export const getToken = () => {
    return localStorage.getItem("token");
}

export function TglIndo(newDate, ambil) {
    const months = {
        0: 'Januari',
        1: 'Februari',
        2: 'Maret',
        3: 'April',
        4: 'Mei',
        5: 'Juni',
        6: 'Juli',
        7: 'Agustus',
        8: 'September',
        9: 'Oktober',
        10: 'November',
        11: 'Desember',
    }
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const d = newDate
    const year = d.getFullYear()
    const date = d.getDate()
    const monthName = months[d.getMonth()]
    const dayName = days[d.getDay()]
    const jam = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
    const menit = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
    const formatted = `${dayName}, ${date} ${monthName} ${year}`


    if (ambil === 'hari') {
        return dayName;
    }


    if (ambil === 'bulan') {
        return monthName;
    }
    if (ambil === 'hariBulan') {
        return `${dayName}, ${date} ${monthName}`;
    }


    if (ambil === 'tglLengkap') {
        return `${date} ${monthName} ${year} ${jam}:${menit}`;
    }

    return formatted.toString()
}
// untuk mengambil profil user
export const getUserLocal = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export function formatDateToIndonesian(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];


    return `${dayName}, ${day} ${month} `;
}
// untuk mengumpulkan tanggal hari kerja
export function getWeekdays() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the previous Monday
    const monday = new Date(today);
    const daysFromMonday = (dayOfWeek + 6) % 7;
    monday.setDate(today.getDate() - daysFromMonday);

    // Calculate the upcoming Friday
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // Collect the weekdays
    const weekdays = [];
    for (let d = new Date(monday); d <= friday; d.setDate(d.getDate() + 1)) {
        weekdays.push(new Date(d)); // Push a new Date object to avoid mutation
    }

    return weekdays;
}
// generate tahun
export function generateYears(startYear) {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
        years.push(year);
    }
    return years;
}
// generate bulan
export const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
export function getCurrentAndPreviousMonth() {
    const date = new Date();
    const currentMonthIndex = date.getMonth(); // getMonth() returns 0 for January, 1 for February, and so on.
    const previousMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1; // handle December -> January case

    const currentMonth = months[currentMonthIndex];
    const previousMonth = months[previousMonthIndex];

    return [previousMonth, currentMonth];
}

// untuk menemukan tanggal terkahir di bulan tertentu
export const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};
