import React,{useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../redux/features/loginSlice";
function ProtectedRoute() {
    const dispatch = useDispatch();
    const {isAuth,token} = useSelector( (state) => state.user);
    useEffect(()=> {
        if(isAuth){
            dispatch(authUser(token))
        }
    }, [])  
    return(
        (isAuth) ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute;