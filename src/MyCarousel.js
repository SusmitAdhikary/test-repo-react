import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

//function MyCarousel(){
const MyCarousel = ({ imgs }) => {

    const index = 1;      
    
    return (
    
        <Carousel>
            { imgs.map((img,i) => (
                <Carousel.Item key={i}>
                    <img
                        className="d-block w-100"
                        src={img}
                        alt={`slide ${ index + 1 }`}
                    />
                    <Carousel.Caption>
                    <h3>slide label { i + 1 }</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )) }            
        </Carousel>

    );
}
export default MyCarousel;