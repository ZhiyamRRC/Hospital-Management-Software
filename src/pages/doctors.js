import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Doctor from '@/model/Doctor'
import mongoose from 'mongoose'
import Link from 'next/link'

const Doctors = ({ user, logout, dbDoctors }) => {


  let images = [ 'female1.png', 'female2.png', 'male1.png', 'male2.png']

  // Function to pick a random image
  function getRandomImage(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }


  return (
    <div>
      <Navbar user={user} logout={logout} bg={'white'} logoColor={'primary'} hoverSigninBG={'gray-50'}/>


      <div className='py-14'>

        {dbDoctors.length > 0 && <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-wide leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Doctors List</h2>}
        
        <div className='grid grid-cols-6 gap-6 px-3'>
          
          
          {dbDoctors.length > 0 && dbDoctors.map((item, index)=>{

            let image = getRandomImage(images);
            
            return <div key={index} className="col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg object-cover object-top h-96 w-full" src={item.profilePic || image} alt="" />
              <div className="py-4 px-2">
                
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                <p className="mb-2 text-sm font-medium tracking-widest text-baseColor dark:text-gray-400">{item.specialization}</p>

                <p className="mb-2 text-sm font-normal tracking-wider text-gray-600 dark:text-gray-400">{item.courses}</p>
                
                <Link href={`/doctorDetail?id=${item._id}`} className="mt-10 flex justify-center mx-auto w-full  text-sm font-medium text-white py-2 bg-baseColor rounded-lg hover:bg-hoverBaseColor">
                  Book an appointment
                </Link>
                
              </div>
          </div>})}
          

          {dbDoctors.length === 0 && <div className='w-full col-span-6'>
            <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
          </div>}


        </div>
    
      </div>

      <Footer/>
    </div>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbDoctors = await Doctor.find();

  // Pass data to the page via props
  return {
    props: {
      dbDoctors: JSON.parse(JSON.stringify(dbDoctors)),
    }
  }
}

export default Doctors