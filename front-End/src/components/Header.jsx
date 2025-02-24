// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className=' flex flex-col md:flex-row flex-wrap bg-green-500 rounded-lg px-10 md:px-6 lg:px-10 '>
      
        {/*------------Left Side----------------*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-10 py-10 m-auto md:py-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointment <br/> with Trusted Doctors
                </p>           
         <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive lisst of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</p>
         </div>
         <a href="#speciality1" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duratio-300'>
            Book apointment <img className='w-4' src={assets.arrow_icon} alt="" />
         </a>
    </div> 
    {/* ---------Right Side------------------ */}
    <div className='md:w-1/3 relative'>

        <img className='w-full md:absolute bottom-0 h-auto rounded-lg top-25' src={assets.header_img} alt="" />
    </div>


    </div>
  )
}

export default Header;