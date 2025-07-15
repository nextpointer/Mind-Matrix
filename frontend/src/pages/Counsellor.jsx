import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CounsellorBar } from '../Components/CounsellorBar';
import { NavSection } from '../Components/NavSection';
import Loader from '../Components/Loader';
import { api } from '../lib/axios.config';

export const Counsellor = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = '/counsellors';

  const fetchCounselors = async () => {
    const response = await api.get(API_URL);
    return response.data.data;
  };

  useEffect(() => {
    const getCounselors = async () => {
      try {
        const data = await fetchCounselors();
        setCounselors(data);
      } catch (error) {
        console.error("Error fetching counselors:", error);
        setError("Failed to load counselors");
      } finally {
        setLoading(false);
      }
    };

    getCounselors();
  }, []);

  if (loading) {
    return <Loader bg={'#fff'} barcolor={'#A1EEBD'}/>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <MainContainer>
      <DummyDataNotice>Counsellor data is dummy</DummyDataNotice>
      <NavSection />
      <CounsellorSection>
        {counselors.map((counselor) => (
          <CounsellorBar
            key={counselor._id}
            imglink={counselor.ImgLink}
            name={counselor.CounsellorName}
            specialization={counselor.SpecializedBio}
            bio={counselor.ShortBio}
            _id={counselor._id}
          />
        ))}
      </CounsellorSection>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f0f2f5;
  position: relative;
`;

const CounsellorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  flex-grow: 1;
  overflow-y: scroll;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px;
    gap: 30px;
    height: 100vh;
  }

  @media (min-width: 1024px) {
    padding: 40px;
    gap: 40px;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
`;

const DummyDataNotice = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px 20px;
  border-radius: 24px;
  font-size: 0.8em;
  color: #ff0000;
  z-index: 1000;

  @media (max-width: 480px) {
    font-size: 0.7em;
    padding: 3px 6px;
    top: 5px;
    left: 5px;
  }
`;
