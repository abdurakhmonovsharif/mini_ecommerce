import React from 'react';
import Corusel from '../../Corusel/Corusel';
import Footer from '../../Footer/Footer';
import Section from '../../Section/Section';

const Main = () => {
    return (
        <div>
            <div className='sider-section'>
                <Corusel />
                <Section />
            </div>
            <Footer />
        </div>
    );
}

export default Main;
