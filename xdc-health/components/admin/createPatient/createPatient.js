import Field from "../../utils/field";
import Scaffold from "../../utils/scaffold";
import { links } from "../config"
import Button from '../../utils/button';
import { useEffect, useState } from "react";



export default function AdminCreatePatient() {
    let today = new Date();

    const [adhaar, setAdhaar] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(adhaar, name, dob, phone, address);
    }

    return (
        <Scaffold links={links} page="Create Patient">
            <div className="p-6">
                <h1 className="mt-6 text-4xl">Create Patient</h1>
                <form className="">
                    <Field label="Adhaar Number" type="text" onChange={(e) => setAdhaar(e.target.value)} />
                    <Field label="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    <Field label="Date of Birth" type="date" onChange={(e) => setDob(e.target.value)} />
                    <Field label="Phone Number" type="tel" onChange={(e) => setPhone(e.target.value)} />
                    <Field label="Address" type="text" onChange={(e) => setAddress(e.target.value)} />
                    <Button className="mt-5" onClick={handleSubmit}>Submit</Button>
                </form>
            </div>
        </Scaffold>
    )
}