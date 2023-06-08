import React from 'react';

export function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
}

export function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_ ]{1,}$/;
  const isNumber = /^\d+$/.test(username);
  return username.trim() !== '' && !isNumber && usernameRegex.test(username);
}

export function validatePasswordStrength(password) {
  return password.length >= 8;
};
function SignUpInfo({ formData, setFormData }) {
  

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const isValidEmail = validateEmail(email);

    setFormData({
      ...formData,
      email: email,
      isEmailValid: isValidEmail,
    });
  };

  const handleUsernameChange = (event) => {
    const username = event.target.value;
    const isValidUsername = validateUsername(username);

    setFormData({
      ...formData,
      username: username,
      isUsernameValid: isValidUsername,
    });
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const isPasswordStrong = validatePasswordStrength(password);

    setFormData({
      ...formData,
      password: password,
      isPasswordStrong: isPasswordStrong,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;

    setFormData({
      ...formData,
      confirmPassword: confirmPassword,
    });
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    formData.isEmailValid &&
    formData.isUsernameValid &&
    isPasswordMatch &&
    formData.isPasswordStrong;

  const handleFormSubmit = () => {
    if (formData.email.trim() === '' || formData.username.trim() === '') {
      console.log('Form submission failed. Please fill in all fields.');
      return;
    }

    if (isFormValid) {
      // Perform form submission or any additional actions here
      console.log('Form submitted:', formData);
    } else {
      console.log('Form submission failed. Please fill in all fields correctly.');
    }
  };

  return (
    <div className="sign-up-container">
      <input
        type="text"
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={handleEmailChange}
        className={formData.isEmailValid ? '' : 'invalid'}
      />
      {formData.isEmailValid === false && formData.email.trim() !== '' && (
        <p className="error">Invalid email format</p>
      )}

      <input
        type="text"
        placeholder="Username..."
        value={formData.username}
        onChange={handleUsernameChange}
        className={formData.isUsernameValid ? '' : 'invalid'}
      />
      {formData.isUsernameValid === false && formData.username.trim() !== '' && (
        <p className="error">Invalid username</p>
      )}
      <input
        type="password"
        placeholder="Password..."
        value={formData.password}
        onChange={handlePasswordChange}
      />
      {!formData.isPasswordStrong && formData.password.trim() !== '' && (
        <p className="error">Password should be at least 8 characters long</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password..."
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        className={isPasswordMatch ? '' : 'invalid'}
      />
      {!isPasswordMatch && (
        <p className="error">Passwords do not match</p>
      )}
    </div>
  );
}

export default SignUpInfo;
