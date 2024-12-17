import React from 'react'

import About from '../Components/About'
import Footer from '../Components/Footer'
import ImageSlider from '../Components/ImageSlider'
import PopularBooks from '../Components/PopularBooks'
import RecentAddedBooks from '../Components/RecentAddedBooks'
import ReservedBooks from '../Components/ReservedBooks'
import Stats from '../Components/Stats'
import WelcomeBox from '../Components/WelcomeBox'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    return (
        <div id='home' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <ImageSlider/>
            <WelcomeBox/>
            <About/>
            <Stats/>
            <RecentAddedBooks/>
            <PopularBooks/>
            <ReservedBooks/>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}

export default Home
