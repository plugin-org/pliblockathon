import { useEffect, useState } from "react";
import Field from "../../utils/field";
import Modal from "../../utils/modal";
import Scaffold from "../../utils/scaffold";
import Table from "../../utils/table";
import Tabs from "../../utils/tabs";
import { upload } from "../../utils/upload";
import { dashboardTabs, links, testRecords, testTableHeaders } from "../config"

export default function DoctorDashboard() {
    let today = new Date();
    const [currentTab, setCurrentTab] = useState("Current Applications")
    const [isOpen, setIsOpen] = useState(false);

    const [currentSessions, setCurrentSessions] = useState([]);
    const [previousSessions, setPreviousSessions] = useState([]);

    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");
    const [scansReport, setScansReport] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        let current = [];
        let previous = [];
        testRecords.forEach((record) => {
            if (record.isCompleted) {
                previous.push(record);
            } else {
                current.push(record);
            }
        })
        setCurrentSessions(current);
        setPreviousSessions(previous);
    }, [])

    useEffect(() => {
        // TODO: fetch the details from the backend once the current record is changed
    }, []) // TODO: add current record as a dependency

    const handleTabClick = (value) => {
        console.log(value)
        if (value != currentTab) setCurrentTab(value)
    }

    const handleEdit = (value) => {
        console.log(value)
        // TODO: change some state variable to set the current record
    }

    const scanUploadHandler = (e) => {
        console.log(e.target.files)
        upload(e.target.files)
        setScansReport(e.target.files);
    }


    return (
        <Scaffold links={links} page="Dashboard">
            <div className="">
                <h1 className="mt-6 text-4xl">Welcome, Doctor</h1>
                <h3>Today is {today.toDateString()} </h3>
            </div>
            <div className="py-3">
                <Tabs onClick={handleTabClick} tabs={dashboardTabs} current={currentTab} />
            </div>
            <div>
                {currentTab == "Current Applications" ? (
                    <Table head={testTableHeaders} data={currentSessions} onClick={handleEdit} editable />
                ) : (
                    <Table head={testTableHeaders} data={previousSessions} onClick={handleEdit} editable />
                )}
            </div>
            <Modal isOpen={isOpen} onCancel={() => setIsOpen(prev => !prev)} onSubmit={() => setIsOpen(prev => !prev)} >
                <Field label="Symptoms" type="text" onChange={(e) => setSymptoms(e.target.value)} />
                <Field label="Likely Diagnosis" type="text" onChange={(e) => setDiagnosis(e.target.value)} />
                <Field label="Medicines" type="tel" onChange={(e) => setPrescription(e.target.value)} />
                <Field label="Scans Report" type="file" onChange={scanUploadHandler} multiple/>
            </Modal>
        </Scaffold>
    )
}