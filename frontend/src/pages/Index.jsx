import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingPage from '../components/LoadingPage';
import Hero from '../components/Hero';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Web3 Template</title>
      </Helmet>
      <Hero/>
    </>
  )
}

export default Index;