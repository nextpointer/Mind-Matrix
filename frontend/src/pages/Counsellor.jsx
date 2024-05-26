import { useState, useEffect } from 'react';
import { CounsellorBar } from '../Components/CounsellorBar';
import { NavSection } from '../Components/NavSection';
import Loader from '../Components/Loader';
import '../styles/counsellor.css';
import axios from 'axios';

export const Counsellor = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:8000/api/v1/counsellors';

  const fetchCounselors = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data.data);
    return response.data.data; // Adjust based on actual API response structure
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
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div id="counsellor-container">
        <NavSection />
        <div id="counsellor-section">
          {counselors.map((counselor) => (
            <CounsellorBar
              key={counselor._id}
              imglink="/images/beard.svg"
              name={counselor.CounsellorName}
              specialization={counselor.SpecializedBio}
              bio={counselor.ShortBio}
              _id={counselor._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
