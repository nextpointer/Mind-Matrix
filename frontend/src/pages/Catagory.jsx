import { Card } from "../Components/Card"
import { NavSection } from "../Components/NavSection"
import '../styles/catagory.css'

export const Catagory = () => {
  return (
    <>
        <div id="catagory-container">
            <NavSection/>
        <div id="catagory-section">
            <Card link='/user/screeningtest/Anxiety' header='Anxiety' about='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi nisi, nobis quam labore ill'/>
            <Card link='/user/screeningtest/Emotional Intelligence' header='Emotional Intelligence' about='Lorem ipsum dolor sit amet consectetu'/>
            <Card link='/user/screeningtest/Addiction' header='Addiction' about='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi nisi, nobis quam labore ill'/>
            <Card link='/user/screeningtest/Stress' header='Stress' about='Lorem ipsum dolor sit amet consectetur adipisicing elit'/>
            <Card link='/user/screeningtest/Depression' header='Depression' about='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi nisi, nobis quam labore il!'/>
            <Card link='/user/screeningtest/Emotional Intelligence' header='Others' about='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi nisi, nobis quam labore ill'/>
        </div>
        </div>
    </>
  )
}
