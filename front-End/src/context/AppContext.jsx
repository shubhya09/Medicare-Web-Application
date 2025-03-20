/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Context
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    // State
    const storedToken = localStorage.getItem('token');
    const [tdoctors, setDoctors] = useState([]);
    const [token, setToken] = useState(storedToken ? storedToken : false);
    const [userData, setUserData] = useState(false);

    // Fetch doctors data
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success && data.tdoctors) {
                setDoctors(data.tdoctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch doctors");
        }
    };

    // Load user profile data
    const loadUserProfileData = async () => {
        if (!token) return;
        
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch profile");
        }
    };

    // Context value
    const value = {
        tdoctors,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    };

    // Effect: Fetch doctors on mount
    useEffect(() => {
        getDoctorsData();
    }, []);

    // Effect: Load profile when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;