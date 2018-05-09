/**
 * 轮播图效果组件
 */
import React from 'react';
import { Carousel } from 'antd';
import img01 from './img01.jpg'
import img02 from './img02.jpg'
import img03 from './img03.jpg'
import img04 from './img04.jpg'
import './myCarousel.css'

class MyCarousel extends React.Component {

  render() {
    return (
      <div className="carousel-wrap">
        <Carousel autoplay>
          <div><img src={img01} /></div>
          <div><img src={img02} /></div>
          <div><img src={img03} /></div>
          <div><img src={img04} /></div>
        </Carousel>
      </div>
    )
  }
}

export default MyCarousel
