import Carousel from '@/components/Carousel'
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import React from 'react'
import Footer from '@/components/Footer'
import Statistic from '@/components/Statistic'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'

const HomePage = ({ user, logout }) => {
  return (
    <div>

      
      <div className="bg-gradient-to-r from-[#f4fafe] to-[#cce3f4] text-gray-800">
        {/* Navbar */}
        <Navbar user={user} logout={logout} />

        {/* Hero Section */}
        <section className="flex justify-between items-center px-6 lg:px-12">
          {/* Left Section */}
          <div className="w-full lg:w-[55%] xl:w-[50%] mt-10 lg:mt-0 lg:space-y-3">
            
            <h1 className='text-black font-bold text-4xl tracking-widest'>වෙදමහත්තයා</h1>
            <h1 className='text-gray-600 text-sm'>At Your Health Matters, we&apos;re dedicated to providing comprehensive medical care to help you achieve optimal health and wellness.</h1>

            <Link href={'/doctors'} className="w-fit bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
              Book an Appointment
            </Link>

          </div>

          {/* Right Section */}
          <div className="hidden w-[45%] xl:w-[50%] lg:block">
            {/* Replace with an actual image */}
            <img className='w-full h-full' src="/doctor.png" alt="" />
          </div>
        </section>
      </div>

      <Card />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img className="rounded-xl object-cover" src="https://images.unsplash.com/photo-1625563016057-3964c9b5fdb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlbnRlcnMlMjBjbGluaWN8ZW58MHx8MHx8fDA%3D" alt="about Us image" />
              </div>
              <img className="sm:ml-0 ml-auto rounded-xl object-cover" src="https://images.unsplash.com/photo-1615631508158-ce306dc0dcb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VudGVycyUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D" alt="about Us image" />
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Holistic Healing for Mind, Body, and Spirit
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Welcome to our Ayurvedic Department, where ancient wisdom and natural remedies meet modern wellness practices. Our dedicated team of Ayurvedic practitioners offers personalized treatments designed to restore balance and promote overall well-being, helping you achieve harmony in every aspect of your life.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">25+</h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Expertise</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">200+</h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Natural Remedies</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">1000+</h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Satisfied Patients</h6>
                  </div>
                </div>
              </div>
              <button className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>
      <Statistic />
      <Testimonials />


      <Footer/>

    </div>
  )
}

export default HomePage