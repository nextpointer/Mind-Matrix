import { Card } from "../Components/Card"
import { NavSection } from "../Components/NavSection"
import '../styles/catagory.css'

export const Catagory = () => {
  return (
    <>
        <div id="catagory-container">
            <NavSection/>
        <div id="catagory-section">
            <Card link='/user/screeningtest/Anxiety' header='Anxiety' about='Intense, persistent worry or fear about everyday situations'/>
            <Card link='/user/screeningtest/Emotional Intelligence' header='Emotional Intelligence' about='Understanding and managing emotions effectively'/>
            <Card link='/user/screeningtest/Addiction' header='Addiction' about='Compulsive dependence on substances or behaviors'/>
            <Card link='/user/screeningtest/Stress' header='Stress' about=' Mental tension from demanding situations or challenges.'/>
            <Card link='/user/screeningtest/Depression' header='Depression' about='Persistent sadness and loss of interest in activities'/>
            <Card link='/user/counsellor' header='Others' about='If you are understand what the problem is then consult with our counselor'/>
        </div>
        </div>
    </>
  )
}
