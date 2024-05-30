import { useState, useEffect } from "react";
import { NavSection } from "../Components/NavSection";
import "../styles/video.css";
import Loader from "../Components/Loader";
import Tabss from "../Components/Tabss";

export const Video = () => {
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const totalIframes = 2; // Each tab now loads two iframes

  const handleIframeLoad = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (loadedCount === totalIframes) {
      setLoading(false);
    }
  }, [loadedCount]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setLoading(true);
    setLoadedCount(0); // Reset loading state for the new iframes
  };

  const videoSrc = [
    [
      "https://www.youtube.com/embed/eBz7iUJu9UM?si=SgY3jHkoPsf13Zkx",
      "https://www.youtube.com/embed/JOKS9Bx8-Sw?si=SNvekto8--zqnvcy",
      "https://www.youtube.com/embed/xsEJ6GeAGb0?si=kT1BO0E3AsKx4Ak9",
      "https://www.youtube.com/embed/-ieJU5gklO4?si=M1hzYzVz-4gfC8yZ",
      "https://www.youtube.com/embed/QhukM33VLgo?si=ApkXH_Ox3Jm9TCR4",
      "https://www.youtube.com/embed/dhYF3AqVhgU?si=oC9uSqRa35Byd5jn"
    ],
    [
      "https://www.youtube.com/embed/xsEJ6GeAGb0?si=kT1BO0E3AsKx4Ak9",
      "https://www.youtube.com/embed/-ieJU5gklO4?si=M1hzYzVz-4gfC8yZ",
      "https://www.youtube.com/embed/KSvk8LLBo2g?si=IfclyTDdvE_cdTUN",
      "https://www.youtube.com/embed/fWFuQR_Wt4M?si=bHABPaDrpb_MIIqx",
      "https://www.youtube.com/embed/0GEIkXVmBVU?si=raz6_-sGn7HqwlQS",
      "https://www.youtube.com/embed/QhukM33VLgo?si=EQLOlGrj4Q6VF5IY"


    ],
    [
      "https://www.youtube.com/embed/Eaoh89a0YD8?si=KNOSSPOlIrmVgEOc",
      "https://www.youtube.com/embed/SnXWEXmVMnk?si=hKn19H0mlIvkesth"
    ],
    [
      "https://www.youtube.com/embed/QhukM33VLgo?si=ApkXH_Ox3Jm9TCR4",
      "https://www.youtube.com/embed/dhYF3AqVhgU?si=oC9uSqRa35Byd5jn"
    ],
    [
      "https://www.youtube.com/embed/-MNp9bmNI60?si=ZBeiSoJ2yuW5R_vV",
      "https://www.youtube.com/embed/75d_29QWELk?si=Yn6cTcJGtaGK21C4"
    ],
  ];

  return (
    <>
      <div id="video-container">
        <NavSection />
        <div id="video-section">
          <div id="tab-section">
            <Tabss value={tabValue} handleChange={handleTabChange} />
          </div>
          <div id="change-section">
            {loading && <Loader bg={"transparent"} barcolor={"#fff"} />}
            <div style={{ display: loading ? "none" : "flex", gap: "20px", flexWrap: "wrap" }}>
              {videoSrc[tabValue].map((src, index) => (
                <iframe
                  key={index}
                  width="300"
                  height="200"
                  src={src}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    borderRadius: "10px",
                    display: loading ? "none" : "block",
                    boxShadow: "6px 6px 10px 1px #000",
                    margin: "25px",
                  }}
                  onLoad={handleIframeLoad}
                ></iframe>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};