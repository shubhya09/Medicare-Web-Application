/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
// import { tdoctors} from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

const AppContextProvider = (props) => {


    const currencySymbol=  '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [tdoctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):  false);
    const [userData, setUserData] = useState(false);

   
    const getDoctorsData = async () => {
        try{
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`)
            if(data.success){
            setDoctors(data.tdoctors)
            }else{
                toast.error(data.message)
            }
        }catch (error){
            console.log(error);
            toast.error(error.message)
        }
    }

        const loadUserProfileData = async () => {
            try{

                const {data} = await axios.get(`${backendUrl}/api/user/get-profire`, {headers: {token}})

                if(data.success){
                    setUserData(data.userData)
                }else{
                    toast.error(data.message)
                }
            } catch(error){
                console.log(error);
                toast.error(error.message)
            }
            
        }
     


    const value = {
        tdoctors,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }


        useEffect(() => {
            getDoctorsData()
        }, [])


        useEffect(() => {
            if(token){
                loadUserProfileData()
            }else{
                setUserData(false)
            }
        }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;