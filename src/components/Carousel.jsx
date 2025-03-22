import { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(5000);

  const fetchImages = async () => {
    try {
      const allImages = await axios.get("http://localhost:5000/api/images/");
      console.log("this is all images", allImages.data);
      setImages(allImages.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [images, intervalTime]);

  const nextImage = () => images.length > 0 && setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () => images.length > 0 && setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="container text-center mt-4">
      {images.length > 0 ? (
        <>
          <div className="position-relative d-inline-block">
            {/* Carousel Image */}
            <img 
              src={`http://localhost:5000/${images[currentIndex]?.imageUrl}`} 
              alt={images[currentIndex].title} 
              className="img-fluid rounded shadow mb-3" 
              style={{ maxWidth: "600px", height: "auto" }} 
            />
            
            {/* Navigation Buttons */}
            <button 
              className="btn btn-dark position-absolute top-50 start-0 translate-middle-y px-3 py-2 rounded-circle shadow"
              onClick={prevImage}
              style={{ fontSize: "20px" }}
            >
              ❮
            </button>
            
            <button 
              className="btn btn-dark position-absolute top-50 end-0 translate-middle-y px-3 py-2 rounded-circle shadow"
              onClick={nextImage}
              style={{ fontSize: "20px" }}
            >
              ❯
            </button>
          </div>
          
          <h2 className="mt-2">{images[currentIndex].title}</h2>
          <p className="fst-italic">{images[currentIndex].description}</p>
        </>
      ) : (
        <p>No images available. Please upload some in settings.</p>
      )}

      {/* Interval Setting */}
      <div className="mt-3">
        <label className="fw-bold">Set Interval (ms): </label>
        <input 
          type="number" 
          value={intervalTime} 
          onChange={e => setIntervalTime(Number(e.target.value))} 
          className="form-control w-25 d-inline mx-2"
        />
      </div>
    </div>
  );
};

export default Carousel;
