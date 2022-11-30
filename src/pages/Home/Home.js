import React from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Category from './Category';

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <Advertise/>
        </div>
    );
};

export default Home;