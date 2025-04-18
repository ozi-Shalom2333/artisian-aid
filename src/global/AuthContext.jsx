// src/AuthContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
};

const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_AUTH_DATA: 'SET_AUTH_DATA'
};

function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
        isAuthenticated: true
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload.error,
        isAuthenticated: false
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return {
        ...initialState,
        isAuthenticated: false
      };
    case actionTypes.SET_AUTH_DATA:
        const isAuthenticated = !!action.payload.token && !!action.payload.user;
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: isAuthenticated
        };
    default:
      return state;
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');

    if (storedToken && storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        dispatch({
          type: actionTypes.SET_AUTH_DATA,
          payload: { user, token: storedToken }
        });
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (identifier, password) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhoneNumber = (number) => /^0[789][01]\d{8}$/.test(number);

    const isEmailValid = isValidEmail(identifier);
    const isPhoneValid = isValidPhoneNumber(identifier);

    if (!isEmailValid && !isPhoneValid) {
      const errorMessage = 'Enter a valid email or Nigerian phone number.';
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { error: errorMessage } });
      toast.error(errorMessage);
      return;
    }

    const loginData = {
      password,
      ...(isEmailValid ? { email: identifier } : { phoneNumber: identifier })
    };

    const baseUrl = 'https://artisanaid.onrender.com';

    try {
      const response = await axios.post(`${baseUrl}/v1/login`, loginData);

      if (response.status === 200) {
        const { token, data: user } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { user, token }
        });

        toast.success(response.data.message || 'Login successful!');
        toast.info('Redirecting...');

      } else {
         const errorMessage = response.data?.message || 'Login successful, but an unexpected response was received.';
         dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { error: errorMessage } });
         toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again later.';
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: { error: errorMessage }
      });

      const status = error.response?.status;
      if (status === 400) {
        toast.error(error.response?.data?.message || 'Incorrect password.');
      } else if (status === 401) {
        toast.error(error.response?.data?.message || 'Account not verified or is restricted.');
      } else {
        toast.error('Login failed. Please try again later.');
        console.error("Login Error:", error);
      }
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};