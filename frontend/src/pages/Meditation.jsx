import MeditationCard from "../Components/MeditationCard";
import { NavSection } from "../Components/NavSection";
import '../styles/meditation.css'

export const Meditation = () => {
  return (
    <>
      <div id="meditation-conatainer">
        <NavSection />
        <div id="meditation-section">
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
          <MeditationCard />
        </div>
      </div>
    </>
  );
};
