import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

//login back end api
export const loginUser = createAsyncThunk('user/login', async (postData,{rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL+`/user/login`,postData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
})

//Auth User
export const authUser = createAsyncThunk('user/auth-user', async (token, {rejectWithValue}) => {
    try{
        const response  =await axios.get(API_URL+"/user/auth-user",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data;
    }catch(error){
        const refreshToken = localStorage.getItem('refreshToken');
        try{
             const response = await axios.get(API_URL+"/user/refresh-token",{
                headers:{
                    Authorization: `Bearer ${refreshToken}`
                }
             });
             return rejectWithValue(response.data);
        }catch(error){
            return rejectWithValue(error.response.data.message);
        }
        //return rejectWithValue(error.res)
    }
})

const initialState = {
    isLoading:false,
    isAuth:localStorage.getItem('token') ? true : false,
    user:[],
    token:localStorage.getItem('token') || '',
    refreshToken:localStorage.getItem('refreshToken') || '',
    message:'',
    error:''
}

const  loginSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        clearMessage:(state) => {
            state.message = '';
        },
        clearError:(state) => {
            state.error = '';
        },
        logOut:(state) => {
            state.isAuth = false;
            state.token = '';
            state.refreshToken = '';
            state.user = [];
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken')
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.authUser
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.message = action.payload.message
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('refreshToken',action.payload.refreshToken)

        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(authUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(authUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.user = action.payload.authUser

        })
        builder.addCase(authUser.rejected,(state, action)=>{
            state.isLoading = false;
            if(action.payload.authUser){
                state.user = action.payload.authUser;
                state.isAuth = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token',action.payload.token);
                localStorage.setItem('refreshToken',action.payload.refreshToken)
            }else {
                state.user = [];
                state.isAuth = false;
                state.token = '';
                state.refreshToken = '';
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken')
            } 
        })
    }
})

const {reducer, actions} = loginSlice;
export default reducer;
export const {clearMessage, clearError, logOut} = actions;