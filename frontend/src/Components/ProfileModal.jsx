import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NormalButtons from "./NormalButton";
import { api } from "../lib/axios.config";

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: #333;
  word-break: break-word;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 1.75rem;
    text-align: left;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ProfileModal = ({ isVisible, onClose, _id, img }) => {
  const [counsellorData, setCounsellorData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/counsellors/${_id}`);
        setCounsellorData(response.data.data);
      } catch (error) {
        console.error("Error fetching counsellor data:", error);
        setMessage("Failed to load counsellor data.");
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible, _id]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleCopyEmail = () => {
    document.execCommand('copy', false, Email);
    showMessage("Email address copied to clipboard!");
  };

  if (!isVisible) {
    return null;
  }

  if (!counsellorData) {
    return (
      <Backdrop>
        <FloatingWindow>
          <CloseButton onClick={onClose}>X</CloseButton>
          <LoadingContent>
            {message ? <ErrorMessage>{message}</ErrorMessage> : <p>Loading counsellor data...</p>}
          </LoadingContent>
        </FloatingWindow>
      </Backdrop>
    );
  }

  const { CounsellorName, FullBio, PhoneNumber, Email, Glance, Address, SpecializedBio, Specialized } = counsellorData;

  return (
    <>
      <Backdrop />
      <FloatingWindow>
        <CloseButton onClick={onClose}>X</CloseButton>
        {message && <MessageBox>{message}</MessageBox>}
        <ProfileContent>
          <ProfileDetails>
            <ProfileNameimg>
              <Img>
                <img src={img} alt={CounsellorName} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/E0E0E0/000000?text=No+Image"; }}/>
              </Img>
              <Name>
                <SubHeading>{CounsellorName}</SubHeading>
                <p>{SpecializedBio}</p>
              </Name>
            </ProfileNameimg>
            <FullBios>
              <p>{FullBio}</p>
            </FullBios>
          </ProfileDetails>
          <ContactDetails>
            <Emails>
              <LetsConnect>Let&apos;s Connect</LetsConnect>
              <PhoneNumbers>
                <Number>{PhoneNumber}</Number>
              </PhoneNumbers>
              <NormalButtons
                text="Email Me"
                type="button"
                onClick={handleCopyEmail}
              />
            </Emails>
            <MoreDetails>
              <Availability>
                <LetsConnect>My Practice at a Glance</LetsConnect>
                <Avail>
                  <p><span>-</span>{Glance}</p>
                </Avail>
              </Availability>
              <AddressSection>
                <p>{Address}</p>
              </AddressSection>
              <Specialization>
                <Special>Specialization</Special>
                <Points>
                  {Specialized && Specialized.map((item, index) => (
                    <p key={index}>- {item}</p>
                  ))}
                </Points>
              </Specialization>
            </MoreDetails>
          </ContactDetails>
        </ProfileContent>
      </FloatingWindow>
    </>
  );
};

ProfileModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  transition: all ease 0.1s;
`;

const FloatingWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 95vh;
  width: 95%;
  padding: 10px;
  z-index: 1000;
  color: #000;
  transition: all ease 0.5s;
  display: flex;
  flex-direction: start;
  justify-content: start;
  /* overflow-y: scroll; */
  /* align-items: center; */
  border-radius: 24px; /* Added border-radius for consistency */

  @media (min-width: 640px) {
    height: 100vh;
    width: 80%;
    padding: 20px;
    /* background-color: red; */
  }

  @media (min-width: 768px) {
    height: 100vh;
    width: 70%;
    padding: 40px;
  }

  @media (min-width: 1024px) {
    height: 95vh;/* Slightly smaller for larger screens */
    width: 60%;
  }
`;

const ProfileContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  transition: all ease 0.3s;
  background-color: rgb(255, 255, 255);
  padding: 15px;
  overflow-y: auto;
  /* background-color: red; */

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 5px;
    /* background-color: red; */
  }
`;

const ProfileDetails = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    height: inherit;
    width: 60%;
    margin-bottom: 0;
  }
`;

const ProfileNameimg = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    height: 40%;
    margin-bottom: 0;
  }
`;

const Img = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-bottom: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    height: 150px;
    width: 150px;
    margin-right: 20px;
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    height: 100%;
    width: 40%;
    border-radius: 22px;
  }
`;

const Name = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;

  p {
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: center;
  }

  @media (min-width: 640px) {
    align-items: flex-start;
    p {
      text-align: left;
    }
  }

  @media (min-width: 768px) {
    height: 100%;
    width: 60%;
    padding: 5px 15px 5px 10px;
  }
`;

const FullBios = styled.div`
  height: auto;
  width: 100%;
  padding: 10px;
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 200;
    line-height: 1.5;
  }

  @media (min-width: 640px) {
    padding: 15px;
    text-align: left;
    p {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 768px) {
    height: 60%;
    padding: 20px;
  }
`;

const ContactDetails = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    height: inherit;
    width: 40%;
    gap: 5px;
    
  }
`;

const Emails = styled.div`
  height: auto;
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 24px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    position: static;
    margin-top: 10px;
  }

  @media (min-width: 768px) {
    height: 35%;
    align-items: flex-start;
    /* background-color: red; */
    button {
      position: relative;
      left: 10px;
      margin-top: 0;
    }
  }
`;

const LetsConnect = styled.p`
  font-weight: 600;
  position: static;
  margin-bottom: 10px;
  text-align: center;
  

  @media (min-width: 768px) {
    position: relative;
    left: 10px;
    top: 5px;
    text-align: left;
  }
`;

const Icon = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;

const PhoneNumbers = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    height: 80px;
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0;
  }
`;

const Number = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem;
    letter-spacing: 0.4rem;
  }
`;

const MoreDetails = styled.div`
  height: auto;
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 24px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    height: 70%;
    gap: 5px;
  }
`;

const Availability = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
  gap: 5px;
  align-items: center;

  p {
    position: static;
    text-align: center;
  }

  @media (min-width: 768px) {
    height: 25%;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 0;
    p {
      position: relative;
      right: 10px;
      text-align: left;
    }
  }
`;
const Avail = styled.div`
  height: auto;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  p {
    text-align: center;
  }

  @media (min-width: 768px) {
    height: 40px;
    width: 90%;
    justify-content: space-around;
    p {
      text-align: left;
    }
  }
`;

const AddressSection = styled.div`
  height: auto;
  width: 100%;
  border-bottom: 1px solid #d5d5d5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  text-align: center;

  @media (min-width: 768px) {
    height: 35%;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    padding-right: 100px;
    text-align: left;
  }
`;

const Icon2 = styled.div`
  height: 30px;
  width: 30px;
  img {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

const Specialization = styled.div`
  height: auto;
  width: 100%;
  padding-top: 10px;

  @media (min-width: 768px) {
    height: 40%;
    padding-top: 0;
  }
`;

const Special = styled.p`
  font-weight: 600;
  position: static;
  margin-top: 10px;
  text-align: center;

  @media (min-width: 768px) {
    position: relative;
    left: 10px;
    top: 5px;
    margin-top: 20px;
    text-align: left;
  }
`;

const Points = styled.div`
  height: auto;
  width: 100%;
  position: static;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  align-items: center;

  p {
    text-align: center;
  }

  @media (min-width: 768px) {
    position: relative;
    left: 20px;
    gap: 8px;
    padding: 12px;
    align-items: flex-start;
    p {
      text-align: left;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000000;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 5px 13px;
  box-shadow: 0 0 20px 1px #5353533e;
  z-index: 1001;

  @media (min-width: 768px) {
    top: 0;
    right: 0;
  }
`;

const MessageBox = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1002;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 0.9em;
  text-align: center;
`;

const LoadingContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 1.2em;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
`;

export default ProfileModal;
