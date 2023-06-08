import React, { useState } from "react";
import SignUpInfo from "./Signup/SignUpInfo";
import PersonalInfo from "./Survey/Survey";
import OtherInfo from "./Recap/Recap";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
  });
  const [isValidationMet, setIsValidationMet] = useState(true); // Track validation status
  const [showWarning, setShowWarning] = useState(false); // Track warning popup

  const FormTitles = ["Survey Sign Up", "Survey", "Thank you"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SignUpInfo
          formData={formData}
          setFormData={setFormData}
          setIsValidationMet={setIsValidationMet}
        />
      );
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  const handleNext = () => {
    if (page === FormTitles.length - 1) {
      alert("FORM SUBMITTED");
      console.log(formData);
    } else {
      const isNextPageValid = validateCurrentPage();
      if (isNextPageValid) {
        setPage((currPage) => currPage + 1);
        setIsValidationMet(true);
        setShowWarning(false); // Hide warning popup
      } else {
        setIsValidationMet(false);
        setShowWarning(true); // Show warning popup
      }
    }
  };

  const validateCurrentPage = () => {
    if (page === 0) {
      const isEmailValid = validateEmail(formData.email);
      const isUsernameValid = validateUsername(formData.username);
      const isPasswordValid = validatePassword(formData.password);
      return isEmailValid && isUsernameValid && isPasswordValid;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_ ]{1,}$/;
    const isNumber = /^\d+$/.test(username);
    return (
      username.trim() !== "" && !isNumber && usernameRegex.test(username)
    );
  };

  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{
            width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%",
          }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
              setIsValidationMet(true);
              setShowWarning(false); // Hide warning popup
            }}
          >
            Prev
          </button>
          <button onClick={handleNext}>
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
        {showWarning && (
          <div className="warning-popup">
            <p className="warning">Please fill in all fields correctly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;