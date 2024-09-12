import React, { useState, useRef } from "react";

export default function ImageResize() {
  const [customerdata, setCustomerdata] = useState({ photo: "" });
  const inputRef = useRef(null);
  const resizeImage = (img, maxSize) => {
    // Create an offscreen canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the dimensions to reduce the image size
    let width = img.width;
    let height = img.height;

    // Calculate the aspect ratio and resize the image to fit within the maxSize limit
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    // Set the canvas size to the new dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw the image to the canvas at the new size
    ctx.drawImage(img, 0, 0, width, height);

    // Convert the canvas to a base64 string
    return canvas.toDataURL("image/webp", 0.8); // Adjust quality for JPEG (80% quality)
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1 MB
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = () => {
        // Resize image if it's larger than 10 MB
        const resizedImage = resizeImage(img, 1000); // Resize to a maximum width/height of 1000px

        const base64Length = resizedImage.length * (3 / 4) - 2; // Base64 size estimation
        if (base64Length <= maxSize) {
          console.log("Image is under 10MB after resizing");
          setCustomerdata((prev) => ({ ...prev, photo: resizedImage }));
        } else {
          alert("Image is still larger than 10MB after resizing.");
          inputRef.current.value = null;
          setCustomerdata((prev) => ({ ...prev, photo: "" }));
        }
      };
    };

    reader.readAsDataURL(file); // Convert the file to a base64 string for the <img> tag
  };
  return (
    <div>
      <input type="file" ref={inputRef} onChange={handleImgChange} />
      {customerdata.photo && (
        <div>
          <p>Resized Image:</p>
          <img src={customerdata.photo} alt="Resized"  />
        </div>
      )}
    </div>
  );
}
