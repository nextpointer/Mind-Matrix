import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SubHeading } from "./SubHeading";
import Ratings from "./Ratings";
import NormalButtons from "./NormalButton";
import Axios from "axios";

const ProfileModal = ({ isVisible, onClose, _id,img }) => {
  const [counsellorData, setCounsellorData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/v1/counsellors/${_id}`);
        setCounsellorData(response.data.data);
      } catch (error) {
        console.error("Error fetching counsellor data:", error);
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible, _id]);

  if (!isVisible || !counsellorData) {
    return null;
  }

  // Destructure data from counsellorData
  const { CounsellorName, FullBio, PhoneNumber, Email, Glance, Address, SpecializedBio, Specialized } = counsellorData;

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(Email)
      .then(() => {
        alert("Email address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  return (
    <>
      <Backdrop />
      <FloatingWindow>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ProfileContent>
          <ProfileDetails>
            <ProfileNameimg>
              <Img>
                <img src={img} alt={CounsellorName} />
              </Img>
              <Name>
                <SubHeading text={CounsellorName} />
                <p>{SpecializedBio}</p>
                <Ratings />
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
                <Icon>
                  <img src="/images/phone.svg" alt="Phone" />
                </Icon>
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
                <Icon2>
                  <img src="/images/building.svg" alt="Address" />
                </Icon2>
                <p>{Address}</p>
              </AddressSection>
              <Specialization>
                <Special>Specialization</Special>
                <Points>
                  {Specialized.map((item, index) => (
                    <p key={index}>{item}</p>
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

ProfileModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired
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
  height: 80vh;
  width: 70%;
  padding: 40px;
  z-index: 1000;
  color: #000;
  transition: all ease 0.5s;
`;

const ProfileContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  transition: all ease 0.3s;
  background-color: rgb(255, 255, 255);
  padding: 5px;
`;

const ProfileDetails = styled.div`
  height: inherit;
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const ProfileNameimg = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.div`
  height: 100%;
  width: 40%;
  border-radius: 22px;

  img {
    height: inherit;
    width: 100%;
  }
`;

const Name = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 5px 15px 5px 10px;

  p {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const FullBios = styled.div`
  height: 60%;
  width: 100%;
  padding: 20px;

  p {
    font-size: 1.1rem;
    font-weight: 200;

    span {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }
`;

const ContactDetails = styled.div`
  height: inherit;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Emails = styled.div`
  height: 30%;
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 24px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  button {
    position: relative;
    left: 10px;
  }
`;

const LetsConnect = styled.p`
  font-weight: 600;
  position: relative;
  left: 10px;
  top: 5px;
`;

const Icon = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 60%;
    width: 60%;
  }
`;

const PhoneNumbers = styled.div`
  height: 80px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Number = styled.p`
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.4rem;
`;

const MoreDetails = styled.div`
  height: 70%;
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 24px;
  padding: 15px;
`;

const Availability = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d5d5d5;
  gap: 10px;
  p {
    position: relative;
    right: 10px;
  }
`;
const Avail = styled.div`
  height: 40px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AddressSection = styled.div`
  height: 35%;
  width: 100%;
  border-bottom: 1px solid #d5d5d5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
  padding-right: 100px;
`;

const Icon2 = styled.div`
  height: 40px;
  width: 40px;
  img {
    height: 100%;
    width: 100%;
  }
`;

const Specialization = styled.div`
  height: 40%;
  width: 100%;
`;

const Special = styled.p`
  font-weight: 600;
  position: relative;
  left: 10px;
  top: 5px;
  margin-top: 20px;
`;

const Points = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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
`;

export default ProfileModal;
