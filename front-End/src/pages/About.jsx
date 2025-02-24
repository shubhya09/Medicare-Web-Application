import React from 'react'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div>
        
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>About Us</p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium aut laborum ratione, voluptatibus, reiciendis accusamus aliquid at temporibus deserunt vero doloremque incidunt architecto fugiat omnis libero? Fuga, deserunt optio?</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, vel! Ex enim, id consectetur, modi nobis corrupti maiores provident impedit necessitatibus nam debitis non nesciunt? Eum aspernatur reiciendis quis atque!
            Assumenda eveniet autem nam earum repudiandae commodi fuga. Nihil earum ut commodi cum fugiat doloribus reprehenderit iure omnis alias illum vitae blanditiis maiores, ea obcaecati tempore aspernatur provident recusandae vel!
             eos vero magnam reprehenderit ea labore hic itaque voluptatibus expedita non numquam fuga, sed sint totam distinctio soluta consequuntur pariatur, quaerat, rerum laborum voluptatum illo. Eum.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia temporibus quam culpa porro a eligendi delectus! Animi, hic ipsum. Temporibus molestias dolor aliquam. Distinctio delectus enim amet nihil, perspiciatis odit.
            Unde sunt fugiat autem, possimus blanditiis voluptatem, quis earum libero esse nisi magnam id nostrum illum? Fuga nihil eaque aliquam, harum quod omnis odit distinctio qui. Reprehenderit repellendus dolor natus.</p>

          </div>
        </div>

        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Efficiency:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>It was th ebset suited Hospital So any how visit with best Doctors.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on the top of your Health.</p>
          </div>

        </div>
    </div>
  )
}

export default About