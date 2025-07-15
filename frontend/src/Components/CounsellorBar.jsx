import { useState } from "react";
import styled from "styled-components";
import NormalButtons from "./NormalButton";
import ProfileModal from "./ProfileModal";
import PropTypes from "prop-types";

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: #333;
  word-break: break-word;

  @media (min-width: 640px) {
    font-size: 1.75rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const CounsellorBar = ({ imglink, _id, name, specialization, bio }) => {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const handleViewProfileClick = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <>
      <MainDiv isBlurred={isProfileVisible}>
        <ImageDiv>
          <img src={imglink} alt={name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/E0E0E0/000000?text=No+Image"; }}/>
        </ImageDiv>
        <AboutDiv>
          <Heading>
            <SubHeading>{name}</SubHeading>
          </Heading>
          <Address>
            <p>{specialization}</p>
          </Address>
          <Bio>
            <p>{bio}</p>
          </Bio>
        </AboutDiv>
        <FunctionTab>
          <NormalButtons
            type="button"
            text="View Profile"
            onClick={handleViewProfileClick}
          />
        </FunctionTab>
      </MainDiv>
      <ProfileModal
        isVisible={isProfileVisible}
        onClose={handleViewProfileClick}
        _id={_id}
        img={imglink}
      />
    </>
  );
};

CounsellorBar.propTypes = {
  imglink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

const MainDiv = styled.div`
  color: #000;
  width: 95%;
  height: auto;
  min-height: 230px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  transition: all ease 0.3s;
  background-color: rgba(255, 255, 255, 0.074);
  border: 1px solid rgba(172, 172, 172, 0.529);
  ${(props) => props.isBlurred && `filter: blur(10px);`}
  &:hover {
    box-shadow: 0px 0px 20px 1px #7676763e;
    border: 1px solid rgba(160, 160, 160, 0.823);
  }
  padding: 10px;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    width: 90%;
    flex-direction: row;
    height: 230px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  }

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 70%;
  }
`;

const ImageDiv = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  img {
    height: 100%;
    width: auto;
    max-width: 150px;
    border-radius: 12px;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    height: 100%;
    width: 180px;
    flex-shrink: 0;
    padding: 0;
    img {
      height: 100%;
      width: 100%;
      max-width: none;
      border-radius: 0;
    }
  }
`;

const AboutDiv = styled.div`
  height: auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  text-align: center;

  @media (min-width: 640px) {
    height: inherit;
    flex: 1;
    width: auto;
    padding: 10px 15px;
    text-align: left;
    justify-content: space-around;
  }
`;

const Heading = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
  justify-content: center;
  margin-bottom: 5px;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`;

const Address = styled.div`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: #000;
    font-size: 15px;
    text-align: center;
  }

  @media (min-width: 640px) {
    justify-content: flex-start;
    p {
      text-align: left;
    }
  }
`;

const Bio = styled.div`
  height: auto;
  width: 100%;
  padding: 5px 10px;
  text-align: center;
  p {
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  @media (min-width: 640px) {
    height: auto;
    padding: 5px 0;
    text-align: left;
  }
`;

const FunctionTab = styled.div`
  height: auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;

  @media (min-width: 640px) {
    height: inherit;
    flex: 0 0 150px;
    width: auto;
    padding: 0;
  }
`;
