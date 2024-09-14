import React, { useEffect, useState } from "react";
import "../assets/css/AdminLogin.css";
import logo from "../assets/images/in4logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { toggleSidebarTrue } from "../redux/reducers/sidebarReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import {toggleAuthenticationTrue, toggleAuthenticationfalse} from "../redux/reducers/twoFactorReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../redux/reducers/authReducer";
import { login } from "../redux/reducers/authReducer";
import { toggleActiveTab } from "../redux/reducers/tabsReducer";

const AdminLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFactorDigits, setTwoFactorDigits] = useState("");
  const [twoFactorDigitsError, setTwoFactorDigitsError] = useState("");
  const [userId, setUserId] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const isUserAuthenticated = useSelector((state) => state.authentication.isAuthenticated)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleSidebarfalse());
    dispatch(toggleActiveTab({ activeTab: 1 }));
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
  
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  }, []);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError("Username is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Username is invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (rememberPassword) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const response = await fetch("http://localhost:4000/auth/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);

          setIsSubmitting(false);
          setUserId(data.userId);
          console.log(data);
          console.log(data.userId);
          setTwoFactorDigits("");
          dispatch(toggleAuthenticationTrue());
        } else {
          setIsSubmitting(false);
          toast.error(`Wrong username or password:`);
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(
          "Network error. Please check your network connection and try again",
          "Please check your network connection and try again"
        );
      }
    }
  };

  const validateTwoFactor = () => {
    let valid = true;
    if (!twoFactorDigits) {
      setTwoFactorDigitsError("Code is required");
      valid = false;
    } else if (twoFactorDigits.length !== 4) {
      setTwoFactorDigitsError("Code is invalid");
      valid = false;
    } else if (!userId) {
      toast.error(
        `Something went wrong during the authentication process. Try again`
      );
      dispatch(toggleAuthenticationfalse())
      valid = false;
    }
    return valid;
  };
  const handleTwoFactorAuthentication = async (e) => {
    e.preventDefault();

    setTwoFactorDigitsError("");
    if (validateTwoFactor()) {
      try {
        console.log(userId);
        setIsSubmitting(true);
        const response = await fetch(
          "http://localhost:4000/auth/admin/verify-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              userId,
              otp: twoFactorDigits,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {

          dispatch(toggleSidebarTrue());
          dispatch(
            login({
              user: data.currentUser,
            })
          );
          dispatch(toggleAuthenticationfalse());
          dispatch(updateToken({
            token: `Bearer ${data.currentUser.token}`
          }));
          console.log("I am the current user",currentUser)
          navigate("/Dashboard");
        } else {
          setIsSubmitting(false);
          toast.error(`${data.message}:`);
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(
          "Network error. Please check your network connection and try again",
          "Please check your network connection and try again"
        );
      }
    }
  };
  return (
    <div className="">
      <div className="d-flex vh-100 w-100">
        <div className="d-none d-lg-block d-lg-flex col-lg-6 col-xl-7 justify-content-center align-items-center left-box">
          <img
            src={logo}
            alt="Illustration"
            className="img-fluid mtc-logo-login"
          />
        </div>
        {isUserAuthenticated ? (
          <>
            <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex align-items-center">
                <h3 className="portal-text">IN4MSME Portal</h3>
              </div>
              <div className="col-12 col-sm-9 col-md-8 col-lg-10 col-xl-9 p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow text-start">
                <form>
                  <h3>Enter your code</h3>
                  <p className="pb-md-3 text-secondary">
                    Enter the 4-digit code on your email. It may take a minute
                    to arrive
                  </p>
                  <div className="form-group pb-3">
                    <label htmlFor="twoFactorCode" className="pb-2">
                      2FA code
                    </label>
                    <input
                      type="text"
                      value={twoFactorDigits || ""}
                      className="form-control place-holder"
                      placeholder="****"
                      autoComplete="off"
                      name="twoFactorCode"
                      onChange={(e) => {
                        setTwoFactorDigitsError("");
                        setTwoFactorDigits(e.target.value);
                      }}
                    />
                    {twoFactorDigitsError && (
                      <>
                        <p className="error mt-1">{twoFactorDigitsError}</p>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleTwoFactorAuthentication}
                    className="submission"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <div className="loader"></div> : "Submit"}
                  </button>
                  <div className="mt-2 d-flex justify-content-center">
                    
                    <button
                    onClick={() => {
                      setPassword("");
                      setEmail("");
                      dispatch(toggleAuthenticationfalse());
                      window.location.reload();
                    }}
                    className="back"
                
                  >
                    Back
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex align-items-center"> 
                <h3 className="portal-text">IN4MSME Portal</h3>
              </div>
              <div className="col-12 col-sm-9 col-md-8 col-lg-10 col-xl-9 p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow text-start">
                <form>
                  <h3>Sign in to account</h3>
                  <p className="pb-md-3 text-secondary">
                    Welcome back. Sign into your account
                  </p>
                  <div className="form-group pb-3">
                    <label htmlFor="username" className="pb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={email || ""}
                      className="form-control place-holder"
                      placeholder="example@nipdb.com.na"
                      autoComplete="off"
                      name="username"
                      onChange={(e) => {
                        setEmailError("");
                        setEmail(e.target.value);
                      }}
                    />
                    {emailError && (
                      <>
                        <p className="error mt-1">{emailError}</p>
                      </>
                    )}
                  </div>
                  <div
                    className={`form-group pb-3 position-relative ${
                      emailError ? "error-class" : ""
                    }`}
                  >
                    <label htmlFor="password" className="pb-2">
                      Password
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control place-holder"
                      id="password"
                      placeholder="***************"
                      value={password || ""}
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
                        <VisibilityOffIcon
                          sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                        />
                      )}
                    </span>
                  </div>
                  <div
                    className={`form-group form-check mb-4 ${
                      passwordError ? "error-class" : ""
                    }`}
                  >
                    <div className="text-end forgot-div">
                      <p className="forgot-text">
                        <span onClick={() => navigate("/Submit")}>
                          Forgot Password
                        </span>
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberPassword"
                      checked={rememberPassword}
                  onChange={() => setRememberPassword(!rememberPassword)}
                    />
                    <label className="form-check-label" htmlFor="rememberPassword">Remember password</label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="submission"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <div className="loader"></div> : "Sign in"}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
