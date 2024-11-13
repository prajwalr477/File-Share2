import React, { useState } from 'react';
import './auth.css';

const Auth = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', password: '', confirmPassword: '' });
  const [passwordStrength, setPasswordStrength] = useState('');

  // Toggle between Login and Signup forms
  const toggleForms = () => setIsLoginVisible(!isLoginVisible);

  // Show or hide passwords
  const togglePasswordVisibility = (formType) => {
    if (formType === 'login') {
      const loginPassword = document.getElementById('login-password');
      loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
    } else {
      const signupPassword = document.getElementById('signup-password');
      const confirmPassword = document.getElementById('signup-confirm-password');
      const isChecked = document.getElementById('signup-show-password').checked;
      signupPassword.type = confirmPassword.type = isChecked ? 'text' : 'password';
    }
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;

    if (strength <= 1) setPasswordStrength('Weak');
    else if (strength === 2) setPasswordStrength('Moderate');
    else setPasswordStrength('Strong');
  };

  // Validate form inputs
  const validateLogin = () => {
    if (loginData.name && loginData.password) alert('Login successful!');
  };

  const validateSignup = () => {
    if (signupData.name && signupData.password && signupData.password === signupData.confirmPassword) {
      alert('Signup successful!');
    }
  };

  return (
    <div className="container">
      <div className="form-container" style={{ transform: isLoginVisible ? 'translateX(0)' : 'translateX(-50%)' }}>
        
        {/* Login Form */}
        <div className="form" id="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={loginData.name}
            onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
            required
          />
          <div className="error-message">{!loginData.name && 'Fill this field'}</div>
          <input
            type="password"
            id="login-password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <div className="error-message">{!loginData.password && 'Fill this field'}</div>
          <div className="toggle-password">
            <input type="checkbox" id="login-show-password" onClick={() => togglePasswordVisibility('login')} />
            <label htmlFor="login-show-password">Show Password</label>
          </div>
          <button type="button" onClick={validateLogin}>Login</button>
          <p>Don't have an account? | <span className="link" onClick={toggleForms}>Signup</span></p>
        </div>

        {/* Signup Form */}
        <div className="form" id="signup-form">
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            required
          />
          <div className="error-message">{!signupData.name && 'Fill this field'}</div>
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => {
              setSignupData({ ...signupData, password: e.target.value });
              checkPasswordStrength(e.target.value);
            }}
            required
          />
          <div className="error-message">{!signupData.password && 'Fill this field'}</div>
          <div className="strength-indicator">Password strength: {passwordStrength}</div>
          <input
            type="password"
            id="signup-confirm-password"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            required
          />
          <div className="error-message">{signupData.password && signupData.confirmPassword !== signupData.password && 'Passwords do not match!'}</div>
          <div className="toggle-password">
            <input type="checkbox" id="signup-show-password" onClick={() => togglePasswordVisibility('signup')} />
            <label htmlFor="signup-show-password">Show Password</label>
          </div>
          <button type="button" onClick={validateSignup}>Signup</button>
          <p>Already have an account? | <span className="link" onClick={toggleForms}>Login</span></p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
