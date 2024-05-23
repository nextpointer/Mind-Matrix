import { Card } from "../Components/Card"
import { NavSection } from "../Components/NavSection"
import '../styles/catagory.css'

export const Catagory = () => {
  return (
    <>
        <div id="catagory-container">
            <NavSection/>
        <div id="catagory-section">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        </div>
    </>
  )
}
