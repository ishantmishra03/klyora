'use client';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import axios from '../../config/axios';

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = useCallback(async () => {
        try {
            const { data } = await axios.post('/api/auth/logout');
            if(data.success){
                dispatch(logoutUser());
                router.push('/');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },[dispatch ,router]);

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <div>Logging Out...</div>
    )
}

export default Page
