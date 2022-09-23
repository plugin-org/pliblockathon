import { useState, useEffect } from "react"
import Card from "../../utils/card"
import Scaffold from "../../utils/scaffold"
import { links, testRecords, testTableHeaders } from "../config"
import Table from "../../utils/table"

export default function PatientDashboard(){
  const [currentTab, setCurrentTab] = useState("Current Applications")
  const [isOpen, setIsOpen] = useState(false);
  const [currentSessions, setCurrentSessions] = useState([]);
  const [previousSessions, setPreviousSessions] = useState([]);

    useEffect(()=>{
        let current = [];
        let previous = [];
        testRecords.forEach((record)=>{
            if(record.isCompleted){
                previous.push(record);
            }else{
                current.push(record);
            }
        })
        setCurrentSessions(current);
        setPreviousSessions(previous);
    }, [])

    const handleTabClick = (value) => {
        console.log(value)
        if (value != currentTab) setCurrentTab(value)
    }

    const handleEdit = (value) => {
        console.log(value)
    }

    return (
        <Scaffold links={links}>

            <Card title="Patient Records">
              <Table head={testTableHeaders} data={currentSessions} editable={false}/>
            </Card>
        </Scaffold>
    )
}
  
/*string adhaarNumber;
        string name;
        string dob;
        string phone;
        string patientAddress;*/