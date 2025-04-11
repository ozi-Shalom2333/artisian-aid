import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css";
import axios from 'axios';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [categoryIcon, setCategoryIcon] = useState(false);
  const categoryArray = ['Carpentry Services', 'Home cleaning services', 'Plumbing Services', 'Electrical Services', 'Painting Services', 'Gardening Services'];
  const [categorySearch, setCategorySearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categoryArray);
  const [fullname, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [validForm,setValidForm] = useState(false)

  const myData = { fullname, businessName, email, phoneNumber, password, confirmPassword, category };

  useEffect(() => {
    const filtered = categoryArray.filter(item => 
      item.toLowerCase().includes(categorySearch.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categorySearch]);

  const toggleCategoryDropdown = () => {
    setCategoryIcon(prev => !prev);
  };

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  
  
  const navigateToLogin = () => {
    navigate('/login');
  };
  
  
  
  const baseUrl = 'https://artisanaid.onrender.com/v1/';

  const createUser = async (e, myData) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}register/artisan`,myData);

      toast.success('Account registered successfully');
      setIsLoading(false);

    
      setFullName('');
      setBusinessName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setCategory('Select Category');

      setTimeout(() => {
        navigate('/login');
      }, 6000);

    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message === 'Network Error') {
        toast.error('Oops network error');
      } else {
        toast.error('An unexpected error occurred');
        console.log(error);
      }
    }
  };

  return (
    <div className='signUpMainBody'>
      <aside className='signUpImage'>
        <img src='/Artisan.png' alt=""/>
      </aside>
      <section className='signUpHeaderContainer'>
        <h2>Create Account</h2>
        <span>Enter the required information to create your account as an artisan.</span>
      </section>
      <main className='signUpInputSection'>
      
        <div className='SignUpForNameAndBusinessInput'>
          <section className='signUpInputForName'>
            <p>Full Name</p>
            <input 
              type="text" 
              placeholder='Type here' 
              value={fullname} 
              onChange={(e) => setFullName(e.target.value)} 
            />
          </section>
          <section className='signUpInputForBusiness'>
            <p>Business Name</p>
            <input 
              value={businessName} 
              type="text" 
              placeholder='Type here'
              onChange={(e) => setBusinessName(e.target.value)} 
            />
          </section>
        </div>

        <div className='SignUpForNameAndBusinessInput'>
          <section className='signUpInputForName'>
            <p>Email</p>
            <input 
              value={email} 
              type="email" 
              placeholder='Type here'
              onChange={(e) => setEmail(e.target.value)} 
            />
          </section>
          <section className='signUpInputForBusiness'>
            <p>Phone Number</p>
            <input 
              value={phoneNumber} 
              type="tel" 
              placeholder='080********'
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </section>
        </div>

        <div className='SignUpForNameAndBusinessInput'>
          <section className='signUpInputForName'>
            <p>Password</p>
              <input 
                value={password} 
                type="password"
                placeholder='Type here'
                onChange={(e) => setPassword(e.target.value)} 
              />
            
            
          </section>
          <section className='signUpInputForBusiness'>
            <p>Confirm Password</p>
              <input 
                value={confirmPassword} 
                type="password"
                placeholder='Type here'
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            
            
          </section>
        </div>

        <div className='SignUpForCategoryInput'>
          <section className='signUpInputForCategory'>
          
            <aside className="category-dropdown-container">
              <p>{category}</p>
              <div className="category-dropdown-toggle" onClick={toggleCategoryDropdown}>
                {categoryIcon ? <MdKeyboardArrowUp fontSize={25} /> : <MdKeyboardArrowDown fontSize={25} />}
              </div>
              {categoryIcon && (
                
                  <div className="category-list">
                    <input
                      type="text"
                      className="category-search-input"
                      placeholder="Search"
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                    />
                    <IoIosSearch className="signup-search" />
                    {filteredCategories.map((item, index) => (
                      <nav key={index} onClick={() => { setCategory(item); setCategoryIcon(false); }} >
                        {item}
                      </nav>
                    ))}
                  </div>
                
              )}
            </aside>
          </section>
        </div>
      </main>

      {errorMessage && <div className="error-message">{errorMessage}</div>} 

      <section className='signUpTermsAndConditions'>
        <div className='SignUpForTermsAndConditonContainer'>
          <p>By creating an account you automatically agree to ArtisanAid</p>
          <span>Terms and Condition</span>
        </div>

        <button 
          className='signUpCreateAccountButton' 
          onClick={(e) => createUser(e, myData)} 
          disabled={isLoading} 
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        <div className='signUpRouteToLogin'>
          <p>Already have an account?</p> 
          <span onClick={navigateToLogin}>Login</span> 
        </div>
      </section>
    </div>
  );
};

export default SignUp;
