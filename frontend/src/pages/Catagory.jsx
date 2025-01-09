import { Card } from "../Components/Card";
import { NavSection } from "../Components/NavSection";
import "../styles/catagory.css";

export const Catagory = () => {
  // Define card data as an array of objects
  const categories = [
    {
      link: "/user/screeningtest/Anxiety",
      header: "Anxiety",
      about: "Intense, persistent worry or fear about everyday situations",
    },
    {
      link: "/user/screeningtest/Emotional Intelligence",
      header: "Emotional Intelligence",
      about: "Understanding and managing emotions effectively",
    },
    {
      link: "/user/screeningtest/Addiction",
      header: "Addiction",
      about: "Compulsive dependence on substances or behaviors",
    },
    {
      link: "/user/screeningtest/Stress",
      header: "Stress",
      about: "Mental tension from demanding situations or challenges.",
    },
    {
      link: "/user/screeningtest/Depression",
      header: "Depression",
      about: "Persistent sadness and loss of interest in activities",
    },
    {
      link: "/user/counsellor",
      header: "Others",
      about: "If you don't understand what the problem is, consult with our counselor",
    },
  ];

  return (
    <>
      <div id="catagory-container">
        <NavSection />
        <div id="catagory-section">
          {/* Map over the categories array to render Card components */}
          {categories.map((category, index) => (
            <Card
              key={index}
              link={category.link}
              header={category.header}
              about={category.about}
            />
          ))}
        </div>
      </div>
    </>
  );
};
