import React from "react";
import NavBar from '../components/NavBar';
import TrendingProduct from "../components/TrendingProducts";
import Footer from '../components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import home1 from '../images/carousel/home1.jpg';
import home2 from '../images/carousel/home2.jpg';
import home3 from '../images/carousel/home3.jpg';
import home4 from '../images/carousel/home4.jpg';
import home5 from '../images/carousel/home5.jpg';
import home6 from '../images/carousel/home6.jpg';

const Home = () => {

    const carousel = [
        { img: home1, alt: '' },
        { img: home2, alt: '' },
        { img: home3, alt: '' },
        { img: home4, alt: '' },
        { img: home5, alt: '' },
        { img: home6, alt: '' },
    ];

    return (
        <div>
            <NavBar/>

            <div className="lg:w-2/3 w-full mx-auto">
                <Swiper
                effect="fade"
                className="max-h-min"
                loop={true} 
                autoplay={{
                    delay:5000,
                }}
                modules={[EffectFade, Pagination, Autoplay]}>
                    {carousel.map((images, i) => {
                        return (
                            <SwiperSlide key={i}
                            >
                                <img src={images.img} alt={images.alt} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <TrendingProduct />
            <Footer />
        </div>
    );
}

export default Home;