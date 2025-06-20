import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import axios from '../../config/axios';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = useCallback(async () => {
        try {
            const { data } = await axios.post('/api/auth/logout');
            if(data.success){
                dispatch(logoutUser());
                navigate('/');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },[dispatch ,navigate]);

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <div>Logging Out...</div>
    )
}

export default Logout
