import React, { useEffect, useState } from "react";
import "../assets/css/AdminLogin.css";
import logo from "../assets/images/in4logo.png";
import mtclogo from "../assets/images/banner.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { toggleSidebarTrue } from "../redux/reducers/sidebarReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import { useLocation } from 'react-router-dom';
import { fetchOAuthToken } from "../utils/fectchOAuthToken";

function ForgotPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const token = queryParams.get('token');
  const serverToken = useSelector((state) => state.server.serverToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleSidebarfalse());
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setPasswordConfirmShown(!passwordConfirmShown);
  };

  const validateForm = () => {
    let valid = true;
    if (password.length <= 7) {
      setPasswordError("Chacters should not be less than 8");
      valid = false;
    }
    if (confirmPassword.length <= 7) {
      setConfirmPasswordError("Chacters should not be less than 8");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirm password does not match is password");
      valid = false;
    }
    return valid;
  };
  console.log(userId,token)
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setConfirmPasswordError("");
    setPasswordError("");

    if (validateForm()) {
      const tokenData = await fetchOAuthToken();
      if (tokenData.access_token) {
        try {
          setIsSubmitting(true);
          const response = await fetch("https://api-gw.mtc.com.na/mdt-nipdb/v1/auth/admin/newPassword", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenData.access_token}`
            },
            
            body: JSON.stringify({
              newPassword:password,
              confirmPassword,
              token,
              userId
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setIsSubmitting(false);
            setPassword("");
            setConfirmPassword("");
            setSuccess(true);
            toast.success(data.message);
          } else {
            setIsSubmitting(false);
            toast.error(data.message);
          }
        } catch (error) {
          setIsSubmitting(false);
          toast.error(
            "Network error. Please check your network connection and try again",
            "Please check your network connection and try again"
          );
        }
      }
      
    }
  };

  return (
    <div className="">
      <div className="d-flex vh-100 w-100 ">
        <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <h3 className="portal-text">IN4MSME Portal</h3>
          </div>
          <div className="col-12 col-sm-9 col-md-8 col-lg-10 col-xl-9 p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow text-start">
            <form onSubmit={handleForgotPassword}>
              <h3>Create New Password</h3>
              <p className="pb-md-3">Enter new password</p>
              <div
                className={`form-group pb-3 position-relative ${
                  passwordError ? "error-class" : ""
                }`}
              >
                <label htmlFor="password" className="pb-2">
                  New Password
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  className="form-control place-holder"
                  id="password"
                  placeholder="***************"
                  autoComplete="off"
                  name="password"
                  onChange={(e) => {
                    setPasswordError("");
                    setPassword(e.target.value);
                  }}
                />
                {passwordError && (
                  <>
                    <p className="error mt-1">{passwordError}</p>
                  </>
                )}
                <span
                  className={`${
                    passwordError
                      ? "show-password-top"
                      : "show-password mt-1 position-absolute translate-middle-y pr-4"
                  }`}
                  onClick={togglePassword}
                  style={{ cursor: "pointer" }}
                >
                  {passwordShown ? (
                    <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  )}
                </span>
              </div>
              <div
                className={`form-group pb-3 position-relative ${
                  confirmPasswordError ? "error-class" : ""
                }`}
              >
                <label htmlFor="password" className="pb-2">
                  Confirm Password
                </label>
                <input
                  type={passwordConfirmShown ? "text" : "password"}
                  value={confirmPassword}
                  className="form-control place-holder"
                  id="password"
                  placeholder="***************"
                  autoComplete="off"
                  name="password"
                  onChange={(e) => {
                    setConfirmPasswordError("");
                    setConfirmPassword(e.target.value);
                  }}
                />
                {confirmPasswordError && (
                  <>
                    <p className="error mt-1">{confirmPasswordError}</p>
                  </>
                )}
                <span
                  className={`${
                    confirmPasswordError
                      ? "show-password-top"
                      : "show-password mt-1 position-absolute translate-middle-y pr-4"
                  }`}
                  onClick={toggleConfirmPassword}
                  style={{ cursor: "pointer" }}
                >
                  {passwordConfirmShown ? (
                    <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  )}
                </span>
              </div>
              <button
                type="submit"
                className="submission"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  "Submit"
                )}
              </button>
              {success && (
                <div className="mt-2 d-flex justify-content-center">
                  <button
                    onClick={() =>navigate('/')}
                    className="back"
                
                  >
                    Login
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
