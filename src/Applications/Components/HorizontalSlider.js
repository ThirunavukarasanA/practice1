import React, { useState, useEffect, useRef } from "react";

export default function HorizontalSlider() {
  const slides = [
    { id: 1, content: "Slide 1 Content", bgColor: "bg-[#7C0201]" },
    { id: 2, content: "Slide 2 Content", bgColor: "bg-[#1589ee]" },
    { id: 3, content: "Slide 3 Content", bgColor: "bg-[#1DA1F2]" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // For hover pause
  const [isDragging, setIsDragging] = useState(false); // For drag state
  const [startX, setStartX] = useState(0); // Mouse start position
  const [translate, setTranslate] = useState(0); // Custom translate during drag
  const sliderRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Use modulus to loop
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, isDragging, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Use modulus to loop
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1 // Ensure it loops backward
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX); // Set the starting position of the mouse
    setIsPaused(true); // Pause auto-scroll while dragging
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dragDistance = e.clientX - startX; // Calculate drag distance
    setTranslate(-currentIndex * 100 + (dragDistance / sliderRef.current.offsetWidth) * 100);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine if the slide should change based on drag distance
    if (translate > -currentIndex * 100 + 20) {
      prevSlide(); // Go to the previous slide if dragged enough to the right
    } else if (translate < -currentIndex * 100 - 20) {
      nextSlide(); // Go to the next slide if dragged enough to the left
    } else {
      setTranslate(-currentIndex * 100); // Stay on the current slide
    }

    setIsPaused(false); // Resume auto-scroll
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp(); // Treat mouse leave as mouse up
    }
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // Pause auto-scroll on hover
      onMouseLeave={handleMouseLeave} // Handle dragging outside slider
      ref={sliderRef}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(${isDragging ? translate : -currentIndex * 100}%)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-64 select-none flex-shrink-0 flex items-center justify-center ${slide.bgColor} text-black text-2xl font-bold cursor-grab`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-black p-2 rounded-full hover:bg-gray-600"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-black p-2 rounded-full hover:bg-gray-600"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
