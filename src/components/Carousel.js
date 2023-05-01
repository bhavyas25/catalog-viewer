import React, { useState, useEffect, useRef } from "react";
import data from "./Data.json";
import "@fortawesome/fontawesome-free/css/all.css";

function Carousel() {
  const images = data.map((image) => image.src);
  const headings = data.map((image) => image.heading);
  const descriptions = data.map((image) => image.description);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoChange, setAutoChange] = useState(false);

  const imgStyle = {
    width: "9vw",
    height: "6vw",
    margin: "0.5vw",
    filter: "grayscale(100%)",
    borderRadius: "1.5vw",
  };

  const btnStyle = {
    border: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const pausePlayBtn = {
    width: "6vw",
    height: "6vw",
    borderRadius: "50%",
    color: "white",
    backgroundColor: "cyan",
    border: "none",
    fontSize: "3vw",
    textAlign: "center",
    cursor: "pointer",
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (autoChange) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
      }, 3000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [autoChange, currentIndex, images.length]);

  const handleAutoChangeToggle = () => {
    setAutoChange((prevAutoChange) => !prevAutoChange);
  };

  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        justifyContent: "space-evenly",
        color: "black",
      }}
    >
      <div className="lhs" style={{ marginRight: "20px" }}>
        <div className="bimg">
          <img
            src={images[currentIndex]}
            alt=""
            style={{
              width: "50vw",
              height: "30vw",
              borderRadius: "2rem",
            }}
          />
        </div>
        <div
          className="slider"
          style={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={handlePrev} style={btnStyle}>
            &#x25C0;
          </button>
          <img
            src={images[(currentIndex - 2 + images.length) % images.length]}
            style={imgStyle}
            alt=""
          />
          <img
            src={images[(currentIndex - 1 + images.length) % images.length]}
            style={imgStyle}
            alt=""
          />
          <img
            src={images[currentIndex]}
            style={{ ...imgStyle, filter: "grayscale(0%)" }}
            alt=""
          />
          <img
            src={images[(currentIndex + 1) % images.length]}
            style={imgStyle}
            alt=""
          />
          <img
            src={images[(currentIndex + 2) % images.length]}
            style={imgStyle}
            alt=""
          />
          <button onClick={handleNext} style={btnStyle}>
            {" "}
            &#x25B6;{" "}
          </button>
        </div>
      </div>
      <div
        className="rhs"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: 0 }}>
          <h2 style={{ textAlign: "left", fontSize: "2vw" }}>
            {headings[currentIndex]}
          </h2>
          <p
            style={{
              textAlign: "justify",
              marginLeft: "1.5vw",
              fontSize: "1vw",
            }}
          >
            {descriptions[currentIndex]}
          </p>
        </div>
        <div style={{ paddingBottom: "35px" }}>
          <button onClick={handleAutoChangeToggle} style={pausePlayBtn}>
            {autoChange ? (
              <i className="fas fa-pause"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
