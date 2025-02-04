import React from 'react'
import { Link } from 'react-router-dom';
import cube3d from '../assets/3d-glassy-cube-of-square-blocks.webm';
import './Hero.css';
import { FaGithub } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="grid grid-cols-5 pt-28 md:pt-0 items-center justify-center min-h-screen">
      <div className="col-span-5 md:col-span-3">
        <div className="flex flex-col relative gap-3">
          <p className="flex text-5xl lg:text-6xl font-extrabold">
            <span className="absolute">
              Welcome To
              <span className="blur-xl block
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text box-content text-transparent select-none">
                Web3 Starter
              </span>
              Template
            </span>
            <span className="relative">
              Welcome To
              <span className="relative block pb-2.5
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text text-transparent select-auto">
                Web3 Starter
              </span>
              <span className='relative -top-2.5'>Template</span>
            </span>
          </p>
          <p className='text-xl'>
            A starter frontend for building web3 interfaces with <b className='text-purple-600'>React,</b> <b className='text-pink-400'>Tailwind CSS,</b> and <b className='text-blue-400'>Web3js,</b> to help you quickly develop your DAPP with ease.
          </p>
          <div className="flex pt-4">
          <Link to={'/presale'} className='btn bg-gradient-to-r from-pink-400 to-purple-400 to-90% btn-lg rounded-full text-white'>
            <FaGithub/>
            Fork on Github
          </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:col-span-2 md:flex relative">
        <div className="w-full h-full overflow-hidden">
          <video className="scale-video" autoPlay loop muted playsInline>
            <source src={cube3d} type="video/webm"/>
          </video>
        </div>
      </div>
    </div>
  )
}

export default Hero