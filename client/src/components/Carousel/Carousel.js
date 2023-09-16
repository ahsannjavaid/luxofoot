import React, { useState } from 'react'
import { carouselImages } from '../../helper/CarouselImages'

const Carousel = () => {
  const [activeCarousel, setActiveCarousel] = useState(0)
  function setActive(slideNo) {
    setActiveCarousel(slideNo)
  }
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {
          carouselImages.map((x, ind) =>
            <button key={ind} onClick={() => setActive(ind)} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={ind} className={`${ind === activeCarousel ? "active" : ""}`} aria-label={`Slide ${ind}`} />
          )
        }
      </div>
      <div className="carousel-inner">
        {
          carouselImages.map((x, ind) =>
            <div key={ind} className={`carousel-item ${!ind ? "active" : ""}`}>
              <img src={x} className="d-block w-100 carousel-images" alt={ind} />
            </div>
          )
        }
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carousel