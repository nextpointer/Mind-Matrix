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
      "https://www.youtube.com/embed/15GaKTP0gFE?si=TSVkIen7ma5kW3m0",
      "https://www.youtube.com/embed/v-t1Z5-oPtU?si=cTnPXRZKEHV0CiGf",
      "https://www.youtube.com/embed/WuyPuH9ojCE?si=N2h-D_2RTI_2beyy",
      "https://www.youtube.com/embed/hnpQrMqDoqE?si=kgR3Cuu4VjZWcKJq",
      "https://www.youtube.com/embed/tMcw-7cHD7A?si=z8RU0sXjPRAOztmS",
      "https://www.youtube.com/embed/TZZlIKXcolo?si=YcYQt5EPsjQQaVqm",
      "https://www.youtube.com/embed/f9yCYlV-gNM?si=iQS5Bnqb1ZrkZoxi",
      "https://www.youtube.com/embed/9Hto1HeMrYQ?si=VokAytmWdAu-K-Mn"
    ],
    [
      "https://www.youtube.com/embed/DxIDKZHW3-E?si=Uy1xdPHoB4Moufjt",
      "https://www.youtube.com/embed/do8mqz6XmTE?si=sDxF4_jX6dKjn9ti",
      "https://www.youtube.com/embed/lh068GG3N98?si=JayLTfLDS_vhXbBN",
      "https://www.youtube.com/embed/II5h6uJPvvs?si=WCBjPhwTAX2lPR5Y",
      "https://www.youtube.com/embed/iNyUmbmQQZg?si=iUxJAJZzPBxGdb6_",
      "https://www.youtube.com/embed/eBz7iUJu9UM?si=70RxFux-LV7WPcCK",
      "https://www.youtube.com/embed/2XZNNZnGhGY?si=EKAfg1BSp_6UW_yI",
      "https://www.youtube.com/embed/49mfPFTZsHs?si=tWozJ1GzJt5gMSyG"

    ],
    [
      "https://www.youtube.com/embed/nCrjevx3-Js?si=NS9h9h3X7Z0SdXmP",
      "https://www.youtube.com/embed/0QXmmP4psbA?si=scxG6QmJGN96Fp7L",
      "https://www.youtube.com/embed/gWs-AswW398?si=-7zUIXIWaFPJv-Jd",
      "https://www.youtube.com/embed/LY4i5CSn7AA?si=ppGwr9VhNzd3DS8l",
      "https://www.youtube.com/embed/Cg_GW7yhq20?si=XBx0KY9zLcrxASR6",
      "https://www.youtube.com/embed/NastuJfCQm8?si=DmvOt3-oLTRn-g95",
      "https://www.youtube.com/embed/w6T02g5hnT4?si=1FozRXW0yAhr0HAA",
      "https://www.youtube.com/embed/ARmBCl4nid0?si=1CUWvejVTnC6UbFZ"
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
            {loading && <Loader bg={"white"} barcolor={"var(--primary-color)"} />}
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