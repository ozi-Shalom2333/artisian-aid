import "../../../styles/artisanVerification.css";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ArtisanVerification = () => {
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorNumber, setGuarantorNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://artisanaid.onrender.com";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guarantorName || !guarantorNumber || !file) {
      toast.error("Please complete all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("guarantorName", guarantorName);
    formData.append("guarantorPhoneNumber", guarantorNumber);
    formData.append("workCertificate", file);
    const myToken = localStorage.getItem("authToken");
    console.log(myToken)

    if (!myToken) {
      toast.error("Authentication token not found.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${baseUrl}/v1/account/verification`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${myToken}`,
            Accept: "application/json",
          },
        }
      );

      const resData = res.data;
      toast.success(resData.message || "Verification submitted successfully!");

      // Reset form
      setGuarantorName("");
      setGuarantorNumber("");
      setFile(null);
      setFileName("");
      setImagePreview(null);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Submission failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guarantor-container">
      <h2>Please Fill & Upload necessary Information for verification</h2>
      <p className="subtitle">
        Fill & Select relevant information to complete your verification
      </p>

      <form className="guarantor-form" onSubmit={handleSubmit}>
        <label>Guarantor’s name</label>
        <input
          type="text"
          placeholder="Guarantor’s name"
          value={guarantorName}
          onChange={(e) => setGuarantorName(e.target.value)}
        />

        <label>Guarantor’s number</label>
        <input
          type="text"
          placeholder="080*******"
          value={guarantorNumber}
          onChange={(e) => setGuarantorNumber(e.target.value)}
        />

        <div className="file-upload">
          <div className="upload-box">
            <span className="upload-instruction">
              Select a file or drag and drop here
              <br />
              <small>
                <AiOutlineCloudUpload size={50} color="#888" /> JPG, PNG or PDF,
                file size no more than 10MB
              </small>
            </span>
            <label htmlFor="fileInput" className="file-label">
              SELECT FILE
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              hidden
            />
          </div>
          <p className="file-name">
            {fileName ? `File added: ${fileName}` : ""}
          </p>
          {imagePreview && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="preview-img"
              />
            </div>
          )}
        </div>

        <button type="submit" className="verify-btn" disabled={loading}>
          {loading ? "Submitting..." : "Verify"}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default ArtisanVerification;
