import React, { useState, useRef } from "react";

export default function ImageResize() {
  const [customerdata, setCustomerdata] = useState({ photo: "" });
  const inputRef = useRef(null);

  const resizeAndCompressImage = (img, targetSizeKB) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      const maxDimension = 1000; // Maximum width/height in pixels

      // Resize image to fit within the maxDimension
      if (width > height) {
        if (width > maxDimension) {
          height *= maxDimension / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width *= maxDimension / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const compress = (quality) => {
        return canvas.toDataURL("image/jpeg", quality);
      };

      let quality = 0.9; // Initial quality
      let compressedImage = compress(quality);

      // Iteratively reduce quality to achieve the target size
      const targetSizeBytes = targetSizeKB * 1024;
      while (compressedImage.length > targetSizeBytes && quality > 0.1) {
        quality -= 0.1;
        compressedImage = compress(quality);
      }

      resolve(compressedImage);
    });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = async () => {
        const compressedImage = await resizeAndCompressImage(img, 100); // Compress to ~100KB
        const compressedImageSize = (compressedImage.length * (3 / 4)) / 1024; // Size in KB

        if (compressedImageSize <= 100) {
          console.log(
            `Image compressed successfully to ~${compressedImageSize.toFixed(
              2
            )} KB`
          );
          setCustomerdata((prev) => ({ ...prev, photo: compressedImage }));
        } else {
          alert("Unable to compress the image to the desired size.");
          inputRef.current.value = null;
          setCustomerdata((prev) => ({ ...prev, photo: "" }));
        }
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImgChange}
      />
      {customerdata.photo && (
        <div>
          <p>Compressed Image:</p>
          <img src={customerdata.photo} alt="Compressed" />
          <a href={customerdata.photo} download="compressed-image.jpg">
            Download
          </a>
        </div>
      )}
    </div>
  );
}
