import MusicPlayer from "../Components/MusicPlayer"
import { NavSection } from "../Components/NavSection"
import '../styles/music.css'

export const Music = () => {
  return (
    <>
        <div id="music-container">
            <NavSection />
            <div id="music-section">
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
                <MusicPlayer/>
            </div>

        </div>
    </>
  )
}
