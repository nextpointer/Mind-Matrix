import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useAlert } from "../Store/useAlert";
import { useAuthStore } from "../Store/authStore";
import { api } from "../lib/axios.config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Login = () => {
  const { login } = useAuthStore();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLongLoadMessage, setShowLongLoadMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowLongLoadMessage(true);
      }, 3000);
    } else {
      setShowLongLoadMessage(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const newErrors = {};

    if (!trimmedEmail) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!trimmedPassword) {
      newErrors.password = "Password is required.";
    } else if (trimmedPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Directly use setAlert from useAlert store, without local setTimeout
    setAlert({ type: 'info', message: '', visible: false }); // Hide any existing alerts

    try {
      const response = await api.post("/user/login", {
        Email: email.trim(),
        Password: password.trim(),
      });

      login(response.data.data.user, response.data.data.AccessToken);
      setAlert({ type: "success", message: "Login successful!", visible: true });
      navigate("/user/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setAlert({ type: "error", message: errorMessage, visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="login-page-container">
        <div className="register-header-container">
          <Link to={"/"}>
            <ArrowBackIcon />
          </Link>
          <h1 className="register-header">Welcome Again</h1>
        </div>
        <div className="login-box">
          <div className="login-section">
            <Form className="form" onSubmit={handleSubmit}>
              <div className="flex-column">
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="inputForm">
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex-column">
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="inputForm">
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="button-submit">
                <StyledLoginButton type="submit" disabled={loading}>
                  {loading ? <ButtonLoader /> : "Login"}
                </StyledLoginButton>
              </div>

              {showLongLoadMessage && (
                <LongLoadMessage>
                  Server might be waking up, please wait a moment...
                </LongLoadMessage>
              )}

              <p className="p">
                Don&apos;t have an account?{" "}
                <span className="span-link">
                  <Link to="/user/register">Sign Up</Link>
                </span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Re-using original styles as much as possible, only adding new styled components
// for the button and loader, and the long load message.

// Original styles from your provided code
const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;
`;

const RegisterHeaderContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  a {
    color: #3b82f6;
    margin-right: 15px;
    display: flex;
    align-items: center;
    font-size: 2rem;
  }
`;

const RegisterHeader = styled.h1`
  font-size: 2.2rem;
  color: #1f2937;
  margin: 0;
  text-align: center;
  flex-grow: 1;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const LoginBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.85rem;
`;

const InputForm = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const ButtonSubmit = styled.div`
  margin-top: 20px;
  width: 100%;
`;

// Custom Styled Button
const StyledLoginButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: black; 
  color: #e4e4e4;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: var(--primary-color); 
    color: black;
  }

  &:disabled {
    background-color: #9ca3af; 
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// Custom Button Loader
const ButtonLoader = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

// Long Load Message
const LongLoadMessage = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
`;

const Paragraph = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: #555;
  margin-top: 20px;
`;

const SpanLink = styled.span`
  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
