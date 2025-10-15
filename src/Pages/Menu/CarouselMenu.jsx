import React, { useState } from "react";
import "./Menu.css";

const carouselImages = [
  { src: "/Img/Cartas.jpg", alt: "Cartas" },
  { src: "/Img/consolas.png", alt: "Consolas" },
  { src: "/Img/Naruto.jpg", alt: "Naruto" },
];

export default function CarouselMenu() {
  const [index, setIndex] = useState(1);

  const prev = () => setIndex((i) => (i === 0 ? carouselImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === carouselImages.length - 1 ? 0 : i + 1));

  const left = (index + carouselImages.length - 1) % carouselImages.length;
  const right = (index + 1) % carouselImages.length;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div id="carousel-menu" className="d-flex align-items-center">
        <button id="left-arrow" className="btn btn-dark me-3" onClick={prev}>&#8592;</button>
        <div className="carousel-images d-flex align-items-center">
          <img src={carouselImages[left].src} className="carousel-img small-img" alt={carouselImages[left].alt} />
          <img src={carouselImages[index].src} className="carousel-img center-img" alt={carouselImages[index].alt} />
          <img src={carouselImages[right].src} className="carousel-img small-img" alt={carouselImages[right].alt} />
        </div>
        <button id="right-arrow" className="btn btn-dark ms-3" onClick={next}>&#8594;</button>
      </div>
    </div>
  );
}