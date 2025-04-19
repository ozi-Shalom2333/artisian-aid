import React, { useState } from "react";
import {
  MdCheckCircle,
  MdCancel,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose,
} from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Carpentry Services",
  "Home Cleaning Services",
  "Plumbing Services",
  "Electrical Services",
  "Painting Services",
  "Gardening Services",
  "Laundary Services",
];

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // Custom dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Password requirements array
  const passwordRequirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ },
  ];

  // Filter categories based on search term
  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Validation logic for text fields
  const validateInput = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          errorMessage = "This field is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = "Only letters are allowed";
        } else if (value.length > 30) {
          errorMessage = "Cannot be more than 30 characters";
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = "Enter a valid email address";
        }
        break;
      case "phoneNumber":
        // Example Nigeria phone number: starts with 0 followed by 10 digits
        if (!/^(0)[0-9]{10}$/.test(value)) {
          errorMessage = "Enter a valid Nigeria phone number";
        }
        break;
      case "businessName":
        if (!value.trim()) {
          errorMessage = "This field is required";
        }
        break;
      case "category":
        if (!value.trim()) {
          errorMessage = "This field is required";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Password is required";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // Validate password based on all requirements
  const validatePassword = (password) =>
    passwordRequirements.every((req) => req.regex.test(password));

  // Handle input changes (text, email, password, phone)
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);

    if (
      (name === "password" || name === "confirmPassword") &&
      formData.confirmPassword
    ) {
      if (name === "password") {
        validateInput("confirmPassword", formData.confirmPassword);
      }
    }
  };

  // Handle category selection from the dropdown
  const handleSelectCategory = (categoryValue) => {
    setSearchTerm("");
    setFormData((prev) => ({ ...prev, category: categoryValue }));
    validateInput("category", categoryValue);
    setIsDropdownOpen(false);
  };

  // Decide which icon to display in the dropdown header
  const getDropdownIcon = () => {
    if (isDropdownOpen) {
      // Dropdown is open => Up Arrow
      return <MdKeyboardArrowUp />;
    } else if (formData.category) {
      // A category is selected => Close icon
      return <MdClose />;
    } else {
      // No category selected => Down Arrow
      return <MdKeyboardArrowDown />;
    }
  };

  // Handle clicks on the custom dropdown header
  const handleDropdownHeaderClick = () => {
    if (isDropdownOpen) {
      // If dropdown is open, close it
      setIsDropdownOpen(false);
      return;
    }

    if (formData.category) {
      // If a category is selected and dropdown is closed, clear it
      setFormData((prev) => ({ ...prev, category: "" }));
      validateInput("category", "");
      setSearchTerm("");
    } else {
      // No category selected => open the dropdown
      setIsDropdownOpen(true);
    }
  };

  // Check if the form is valid
  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phoneNumber &&
    formData.businessName &&
    formData.category &&
    formData.password &&
    formData.confirmPassword &&
    validatePassword(formData.password) &&
    formData.password === formData.confirmPassword &&
    Object.values(errors).every((error) => error === "");

  // Submit form (calls the API endpoint using axios)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      fullname: formData.fullName.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      category: formData.category.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await axios.post(
        "https://artisanaid.onrender.com/v1/register/artisan",
        payload
      );
      // set the email to localStorage
      localStorage.setItem("email", formData.email.trim());
      toast.success(response.data.message || "Signup successful!");
      navigate("/verificationmessage");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="overlay"></div>

        {/* Header / Branding */}
        <header className="signup-header">
          <div className="logo">
            <img src="/Artisan.png" alt="ArtisanAid Logo" />
          </div>
        </header>

        {/* Form Content */}
        <div className="signup-content">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">
            Enter the required information to create your account as an artisan
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="signup-input"
                placeholder="Type here"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Type here"
                className="signup-input"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phoneNumber" style={{ maxHeight: `5vh` }}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="signup-input"
                placeholder="08012345678"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
              />
              {errors.phoneNumber && (
                <p className="error-text">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Business Name */}
            <div className="form-group">
              <label htmlFor="businessName" style={{ maxHeight: `5vh` }}>
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                className="signup-input"
                placeholder="Type here"
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                required
              />
              {errors.businessName && (
                <p className="error-text">{errors.businessName}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" style={{ maxHeight: `5vh` }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="signup-input"
                placeholder="Type here"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onFocus={() => setTouched(true)}
                required
              />
              {touched && formData.password && !validatePassword(formData.password) && (
                <ul className="password-requirements">
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.regex.test(formData.password);
                    return (
                      <li
                        key={index}
                        className={`requirement ${
                          isValid ? "valid" : "invalid"
                        }`}
                      >
                        {isValid ? <MdCheckCircle /> : <MdCancel />} {req.label}
                      </li>
                    );
                  })}
                </ul>
              )}
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword" style={{ maxHeight: `5vh` }}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="signup-input"
                style={{ maxHeight: "7vh" }}
                placeholder="Type here"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                required
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Custom Category Dropdown with dynamic icons */}
            <div className="form-group custom-dropdown-group">
              <label>Category</label>
              <div className="custom-dropdown">
                {/* Dropdown Header */}
                <div
                  className="dropdown-header"
                  onClick={handleDropdownHeaderClick}
                >
                  {/* Show either the category or placeholder */}
                  {formData.category || "Select Category"}
                  {/* Icon on the right */}
                  <span className="dropdown-arrow">{getDropdownIcon()}</span>
                </div>

                {/* Dropdown Body */}
                {isDropdownOpen && (
                  <div className="dropdown-body">
                    <input
                      type="text"
                      className="dropdown-search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="dropdown-list">
                      {filteredCategories.map((item) => (
                        <div
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleSelectCategory(item)}
                        >
                          {item}
                        </div>
                      ))}
                      {filteredCategories.length === 0 && (
                        <div className="dropdown-item no-match">
                          No matching categories
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <p className="signup-terms">
              By creating an account you automatically agree to ArtisanAid{" "}
              <a href="#terms" className="terms-link">
                Terms and Conditions
              </a>
            </p>

            {/* Create Account Button */}
            <button
              type="submit"
              className={`signup-button ${!isFormValid ? "disabled" : ""}`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Please wait..." : "Create Account"}
            </button>

            {/* Already have an account link */}
            <p className="signup-login-text">
              Already have an account?{" "}
              <a href="/login" className="login-link">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
