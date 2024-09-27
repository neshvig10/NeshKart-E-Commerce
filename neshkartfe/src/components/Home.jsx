import {React} from "react"
import Carousel from './Carousel'

const Home = ()=> {

    const images = [
        "/images/carousel1.jpg",
        "/images/carousel2.jpg",
        "/images/carousel3.jpg",
        "/images/carousel4.jpg"
    ];
    return (
    <>  
    <Carousel images={images}></Carousel>     
    </>
    )
};

export default Home;