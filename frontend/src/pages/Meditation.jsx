import MeditationCard from "../Components/MeditationCard";
import { NavSection } from "../Components/NavSection";
import '../styles/meditation.css'

export const Meditation = () => {
  return (
    <>
      <div id="meditation-conatainer">
        <NavSection />
        <div id="meditation-section">
          <MeditationCard name="Mindfulness Meditation" about="Enhances self-awareness, reduces stress, and improves emotional regulation, fostering overall mental well-being and resilience" image="/images/a1.jpg"/>
          <MeditationCard name="Body Scan Meditation" about="Promotes compassion and empathy, reducing feelings of anger and anxiety, and improving relationships and social connections" image="/images/a3.jpg"/>
          <MeditationCard name="Transcendental Meditation " about="Provides deep relaxation and reduces stress by promoting a state of restful alertness and mental clarity" image="/images/medi.svg"/>
          <MeditationCard name="Guided Imagery Meditation" about="Utilizes visualizations to enhance relaxation, reduce anxiety, and manage symptoms of depression and stress" image="/images/a3.jpg"/>
          <MeditationCard name="Zen Meditation" about="Cultivates mindfulness, improves concentration, and promotes a balanced emotional state through sitting and focused breathing techniques" image="/images/medi.svg"/>
          <MeditationCard name="Yoga Nidra" about="Induces deep relaxation and helps manage stress, anxiety, and insomnia by guiding practitioners through a conscious relaxation process" image="/images/a1.jpg"/>

        </div>
      </div>
    </>
  );
};
