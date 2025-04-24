import React, { useState, useMemo, useCallback } from "react";
import { 
  MdCheckCircle, 
  MdCancel, 
  MdKeyboardArrowDown, 
  MdKeyboardArrowUp,
  MdClose, 
  MdOutlineRemoveRedEye
} from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";

// API base URL (move to .env)
const API_BASE_URL = "https://artisanaid.onrender.com/v1/register/artisan";

const CATEGORIES = [
  "Carpentry Services",
  "Home Cleaning Services",
  "Plumbing Services",
  "Electrical Services",
  "Painting Services",
  "Gardening Services",
  "Laundry Services", // Fixed typo
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
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    category: "",
    password: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  const filteredCategories = useMemo(() =>
    CATEGORIES.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateInput = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) errorMessage = "This field is required";
        else if (!/^[A-Za-z\s]+$/.test(value)) errorMessage = "Only letters are allowed";
        else if (value.length > 30) errorMessage = "Cannot be more than 30 characters";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) errorMessage = "Enter a valid email address";
        break;
      case "phoneNumber":
        if (!/^(0|\+234)[0-9]{10}$/.test(value)) errorMessage = "Enter a valid Nigeria phone number";
        break;
      case "businessName":
        if (!value.trim()) errorMessage = "This field is required";
        break;
      case "category":
        if (!value.trim()) errorMessage = "This field is required";
        break;
      case "password":
        if (!value) errorMessage = "Password is required";
        else if (!validatePassword(value)) errorMessage = "Password does not meet requirements";
        break;
      case "confirmPassword":
        if (value !== formData.password) errorMessage = "Passwords do not match";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const validatePassword = (password) =>
    passwordRequirements.every((req) => req.regex.test(password));

  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);

    if (name === "password" && formData.confirmPassword) {
      validateInput("confirmPassword", formData.confirmPassword);
    }
  }, [formData.confirmPassword]);

  const handleSelectCategory = useCallback((categoryValue) => {
    setSearchTerm("");
    setFormData((prev) => ({ ...prev, category: categoryValue }));
    validateInput("category", categoryValue);
    setIsDropdownOpen(false);
  }, []);

  const getDropdownIcon = () => {
    if (isDropdownOpen) return <MdKeyboardArrowUp />;
    if (formData.category) return <MdClose />;
    return <MdKeyboardArrowDown />;
  };

  const handleDropdownHeaderClick = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return;
    }
    if (formData.category) {
      setFormData((prev) => ({ ...prev, category: "" }));
      validateInput("category", "");
      setSearchTerm("");
    } else {
      setIsDropdownOpen(true);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.dismiss();

    const payload = {
      fullname: formData.fullName.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      category: formData.category.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await axios.post(API_BASE_URL, payload);
      localStorage.setItem("email", formData.email.trim());
      toast.success(response.data.message || "Signup successful!", { toastId: "signup-success" });
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        businessName: "",
        category: "",
        password: "",
        confirmPassword: ""
      });
      navigate("/verificationmessage");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.", { toastId: "signup-error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <header className="signup-header">
          <div className="logo" onClick={() => navigate("/")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
            <img src="/Artisan.png" alt="ArtisanAid Logo" />
          </div>
        </header>

        <div className="signup-content">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">
            Enter the required information to create your account as an artisan
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form_input_container">
              <div className="form_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Type here"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="error-text" aria-live="polite">{errors.fullName}</p>
                )}
              </div>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Type here"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="error-text" aria-live="polite">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="form_input_container">
              <div className="form_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Type here"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  required
                  aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                />
                {errors.phoneNumber && (
                  <p id="phoneNumber-error" className="error-text" aria-live="polite">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="form_input">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  placeholder="Type here"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  required
                  aria-describedby={errors.businessName ? "businessName-error" : undefined}
                />
                {errors.businessName && (
                  <p id="businessName-error" className="error-text" aria-live="polite">{errors.businessName}</p>
                )}
              </div>
            </div>

            <div className="form_input_container">
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Type here"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onFocus={() => setTouched(true)}
                    required
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={togglePasswordVisibility}
                    onKeyDown={(e) => e.key === "Enter" && togglePasswordVisibility()}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="password-toggle"
                  >
                    {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                {touched && formData.password && (
                  <ul className="password-requirements">
                    {passwordRequirements.map((req, index) => {
                      const isValid = req.regex.test(formData.password);
                      return (
                        <li key={index} className={`requirement ${isValid ? "valid" : "invalid"}`}>
                          {isValid ? <MdCheckCircle /> : <MdCancel />} {req.label}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {errors.password && (
                  <p id="password-error" className="error-text" aria-live="polite">{errors.password}</p>
                )}
              </div>
              <div className="form_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Type here"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    required
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer", color: "black" }}
                    onKeyDown={(e) => e.key === "Enter" && toggleConfirmPasswordVisibility()}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="error-text" aria-live="polite">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="form-group custom-dropdown-group">
              <label htmlFor="category-dropdown">Category</label>
              <div className="custom-dropdown">
                <div
                  id="category-dropdown"
                  className="dropdown-header"
                  onClick={handleDropdownHeaderClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleDropdownHeaderClick()}
                  aria-expanded={isDropdownOpen}
                >
                  {formData.category || "Select Category"}
                  <span className="dropdown-arrow">{getDropdownIcon()}</span>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-body">
                    <input
                      type="text"
                      className="dropdown-search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <div className="dropdown-list">
                      {filteredCategories.map((item, index) => (
                        <div
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleSelectCategory(item)}
                          role="option"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleSelectCategory(item)}
                          aria-selected={formData.category === item}
                        >
                          {item}
                        </div>
                      ))}
                      {filteredCategories.length === 0 && (
                        <div className="dropdown-item no-match">No matching categories</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {errors.category && (
                <p className="error-text" aria-live="polite">{errors.category}</p>
              )}
            </div>

            <div className="terms_condition">
              <p className="signup-terms">
                By creating an account you automatically agree to ArtisanAid{" "}
                <a href="/terms" className="terms-link">Terms and Conditions</a>
              </p>
            </div>

            <div className="form_btn">
              <button
                type="submit"
                className={`signup-button ${!isFormValid ? "disabled" : ""}`}
                disabled={!isFormValid || isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Please wait..." : "Create Account"}
              </button>
            </div>

            <p className="signup-login-text">
              Already have an account?{" "}
              <a href="/login" className="login-link">Log in</a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;