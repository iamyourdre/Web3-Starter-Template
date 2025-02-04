import React from 'react'

const LoadingPage = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center relative'>
      <span className="loading loading-ring w-24 "></span>
      <p>Preparing</p>
    </div>
  )
}

export default LoadingPage