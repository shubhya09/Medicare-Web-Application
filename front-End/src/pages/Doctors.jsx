// // eslint-disable-next-line no-unused-vars
// import React, { useEffect } from 'react'

// import {useParams} from 'react-router-dom'
// import {AppContext} from '../context/AppContext'
// import { useState} from 'react'
// import {useNavigate } from 'react-router-dom'
// import { useContext } from 'react'

// const Doctors = () => {

//   const navigate = useNavigate();
//   const { speciality } = useParams();
//   const [ filterDoc, setFilterDoc] = useState([])
//   const { tdoctors } = useContext(AppContext);
  
 
//   const applyFilter = ()=> {
//     if (speciality) {
//       setFilterDoc(tdoctors.filter(doc => doc.speciality === speciality))
      
//     } else {
//       setFilterDoc(tdoctors)
//     }
//   }

//   useEffect(()=>{
    
//     applyFilter()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   } ,[tdoctors, speciality])

//   return (
//     <div>
//         <p>Browwse through the doctors speciality.</p>
//         <div>
//           <div>
//             <p>General physician</p>
//             <p>Gynecologist</p>
//             <p>Dermatologist</p>
//             <p>Pediatricians</p>
//             <p>Neurologist</p>
//             <p>Gastroenterologist</p>
//           </div>
//           <div>
//             {
//               filterDoc.map((item, index)=>(
//                 <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key= {index}>
                  
//                    <img className='bg-blue-50' src={item.image} alt="" /> 
//                    <div className='p-4'>
//                         <div className='flex items-center gap-2 text-sm text-center text-green-500'>
//                             <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
//                         </div>
//                         <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                         <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                    </div>
//                 </div>
//             ))
//             }
//           </div>
//         </div>
//     </div>
//   )
// }

// export default Doctors;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const[showfilter, setShowFilter] = useState(false);
  const { tdoctors } = useContext(AppContext);

  // Function to filter doctors by speciality
  const applyFilter = () => {
    if (speciality) {
      const filtered = tdoctors?.filter((doc) => doc.speciality === speciality) || [];
      setFilterDoc(filtered);
    } else {
      setFilterDoc(tdoctors || []);
    }
  };

  // Apply filter whenever `tdoctors` or `speciality` changes
  useEffect(() => {
    applyFilter();
  }, [tdoctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors by speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button className={`py-1 px-3 border roumded text-sm transition-all sm:hidden ${showfilter ? 'bg-primary text-white' : '' }`} onClick={()=> setShowFilter(prev => !prev)}>Filter</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showfilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'General physician' ? navigate ('/doctors') : navigate('/doctors/General physician') } className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-200 text-black' : ''} `}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate ('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3  py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''} `}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate ('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''} `}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate ('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''} `}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate ('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3  py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''} `}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate ('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3  py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''} `}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">  
          {/* grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => item._id && navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt={item.name || 'Doctor'} />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
