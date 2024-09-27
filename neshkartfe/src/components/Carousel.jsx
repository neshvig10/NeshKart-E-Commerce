import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel flex">
            <button onClick={goToPrevious}>&lt;</button>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                style={{ width: '2000px', height: '600px' }}
            />
            <button onClick={goToNext}>&gt;</button>
        </div>
    );
};

export default Carousel;
