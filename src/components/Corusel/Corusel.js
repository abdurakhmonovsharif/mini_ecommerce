import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay'
import './scss/Corusel.scss'
const Corusel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    return (
        <div className='Section'>
            <div className='my-corusel'>
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        <div className="embla__slide1">
                            <h1>Air Pods</h1>
                            <button className="cta">
                                <span>Shop Now</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                        <div className="embla__slide2">
                            <h1>Nike / Fly Elite</h1>
                            <button className="cta">
                                <span>Shop Now</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                        <div className="embla__slide3">
                            <h1>Amber Crystal</h1>
                            <button className="cta">
                                <span>Shop Now</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Corusel;
