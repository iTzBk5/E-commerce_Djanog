import React from 'react';
import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { Lastes } from '../Components/Lastes/Lastes'

const Shop = () => {
  // component logic
  return (
    <div>
      <Hero/>
      <Popular/>
      <Lastes/>
    </div>
  );
};

export default Shop;