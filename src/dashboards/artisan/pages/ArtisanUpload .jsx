import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios"; 
import "../../../styles/artisanUpload.css"; 

const ArtisanUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);

      // Generate image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("jobImage", selectedFile);

    try {
      setLoading(true); 
      const response = await axios.post(
        "https://artisanaid.onrender.com/v1/upload/job",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Job uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading job:", error);
      alert("Failed to upload job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-job-container">
      <h1>Upload a Job Post</h1>
      <p className="upload-subtitle">
        You can easily upload your job post here.
      </p>

      <div
        className="upload-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-icon">
          <AiOutlineCloudUpload size={50} color="#888" />
        </div>
        <p className="drag-drop-text">Drag & drop files here</p>
        <p className="file-types-text">
          (PDF, DOC, DOCX, TXT, or image files are allowed)
        </p>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          className="select-file-button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Select File
        </button>
      </div>

      {imagePreview && (
        <div className="image-preview-container">
          <h3>Uploaded Image Preview</h3>
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Selected Preview"
              className="preview-img"
            />
          </div>
        </div>
      )}

      <button
        className="upload-post-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Post"}
      </button>
    </div>
  );
};

export default ArtisanUpload;