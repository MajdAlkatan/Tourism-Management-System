import  { useState } from "react";
import PropTypes from 'prop-types';
import "./imageinput2.css";

function MultiImageUpload({ onImagesChange }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const totalImages = images.length + files.length;

    if (totalImages > 7) {
      setError("You can upload a maximum of 7 images.");
    } else if (files.length + images.length < 2) {
      setError("Please upload at least 2 images.");
    } else {
      setError("");
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
      onImagesChange(files); // Pass the selected files to the parent component
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="containerg">
      <label htmlFor="file-input" className="upload-areag">
        <input
          type="file"
          id="file-input"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="file-inputg"
        />
        <div className="upload-textg">
          <span className="upload-icong">+</span>
          <div>Drag & Drop or Click to Upload</div>
        </div>
      </label>
      {error && <div className="error-textg">{error}</div>}
      <div className="image-gridg">
        {images.map((image, index) => (
          <div key={index} className="image-itemg">
            <img
              src={image}
              alt={`preview ${index + 1}`}
              className="image-previewg"
            />
            <button
              className="remove-btng"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

MultiImageUpload.propTypes = {
  onImagesChange: PropTypes.func.isRequired, // Validate that onImagesChange is a function and is required
};

export default MultiImageUpload;
