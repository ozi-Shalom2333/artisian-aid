import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/artisanUpload.css";

const ArtisanUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [jobPosts, setJobPosts] = useState(JSON.parse(localStorage.getItem("jobPostImage")) || {});
  console.log(jobPosts)
  const baseUrl = "https://artisanaid.onrender.com";

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/v1/user/${userData._id}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };
    getUser();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("jobImage", selectedFile);

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${baseUrl}/v1/upload/job`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      localStorage.setItem('jobPostImage', JSON.stringify(response.data.data))

      const imageUrl = response.data?.imageUrl;
      const newJobPost = response.data?.jobPost;

      if (imageUrl) setImagePreview(imageUrl);

      // if (newJobPost) setJobPosts((prev) => [...prev, newJobPost]);

      toast.success("Job uploaded successfully!");
      setUploadSuccess(true);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong.";
      console.error("Error uploading job:", error.response?.data || error);
      toast.error(`Upload failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token)
      await axios.delete(`${baseUrl}/v1/delete/job/${jobPosts._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("jobPostImage");
      setJobPosts({});
      toast.success("Job post deleted successfully!");
      // setJobPosts(jobPosts.filter((post) => post._id !== jobPostId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job post.");
    }
  };
    return (
      <>
        {
          jobPosts?.jobImage ? <div className="job-post-container">
          <h1>Job Post</h1>
          <p>Your job post has been successfully uploaded!</p>
          {/* {imagePreview && (
            <div className="image-preview-container">
              <h3>Uploaded Image</h3>
              <div className="image-preview">
                <img src={imagePreview} alt="Uploaded Job Post" className="preview-img" />
              </div>
            </div>
          )} */} 
          <div className="job-post-list">
              <div className="job-post-item">
                <img src={jobPosts?.jobImage?.image_url} alt="Job" className="preview-img" />
  
              </div>
                <button className="delete-post-button" onClick={()=>handleDeletePost()}>Delete</button>
          </div>
        </div> : 
        <div className="upload-job-container">
        <h1>Upload a Job Post</h1>
        <p className="upload-subtitle">You can easily upload your job post here.</p>
  
        <div className="upload-box" onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className="upload-icon">
            <AiOutlineCloudUpload size={50} color="#888" />
          </div>
          <p className="drag-drop-text">Drag & drop files here</p>
          <p className="file-types-text">(PDF or image files are allowed)</p>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
          <button className="select-file-button" onClick={() => document.getElementById("fileInput").click()}>
            Select File
          </button>
        </div>
  
        {imagePreview && (
          <div className="image-preview-container">
            <h3>Uploaded Image Preview</h3>
            <div className="image-preview">
              <img src={imagePreview} alt="Selected Preview" className="preview-img" />
            </div>
          </div>
        )}
  
        <button className="upload-post-button" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Post"}
        </button>
  
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
        }
      </>
    )
}

export default ArtisanUpload;
