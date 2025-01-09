import { useState } from "react";
import styled from "styled-components";
import { SubHeading } from "./SubHeading";
import NormalButtons from "./NormalButton";
import ProfileModal from "./ProfileModal";
import PropTypes from "prop-types";

export const CounsellorBar = ({ imglink, _id, name, specialization, bio }) => {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const handleViewProfileClick = () => {
    setProfileVisible(!isProfileVisible);
  };


  return (
    <>
      <MainDiv isBlurred={isProfileVisible}>
        <ImageDiv>
          <img src={imglink} alt={name} />
        </ImageDiv>
        <AboutDiv>
          <Heading>
            <SubHeading text={name} />
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
  height: 230px;
  color: #000;
  width: 70%;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  transition: all ease 0.3s;
  background-color: rgba(255, 255, 255, 0.074);
  border: 1px solid rgba(172, 172, 172, 0.529);
  ${(props) => props.isBlurred && `filter: blur(10px);`}
  &:hover {
    box-shadow: 0px 0px 20px 1px #7676763e;
    border: 1px solid rgba(160, 160, 160, 0.823);
  }
`;
const ImageDiv = styled.div`
  height: inherit;
  width: 200px;
  img {
    height: 100%;
    width: 100%;
  }
`;
const AboutDiv = styled.div`
  height: inherit;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: end;
  padding-left: 10px;
`;
const Address = styled.div`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  p {
    color: #000;
    font-size: 15px;
  }
`;
const Bio = styled.div`
  height: calc(100% - 40px - 40px);
  width: 100%;
  padding: 5px 5px 5px 10px;
  p {
    color: #000000;
  }
`;
const FunctionTab = styled.div`
  height: inherit;
  width: calc(100% - 50% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default CounsellorBar;
