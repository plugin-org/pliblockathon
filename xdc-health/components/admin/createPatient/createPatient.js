import Field from "../../utils/field";
import Scaffold from "../../utils/scaffold";
import { links } from "../config"
import Button from '../../utils/button';
import { useEffect, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { getContract, loadWeb3 } from "../../abi";



export default function AdminCreatePatient() {
    const { address, connectWallet } = useWeb3();

    useEffect(()=>{
        // connect to the wallet
        async function main(){
            await connectWallet("injected");
        }
        main();
    }, [])

    const [adhaar, setAdhaar] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [geoAddress, setGeoAddress] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await loadWeb3()
        const cont = await getContract()
        await cont.methods.createPatient(adhaar, name, dob, phone, geoAddress).send({from: address})
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
                    <Field label="Address" type="text" onChange={(e) => setGeoAddress(e.target.value)} />
                    <Button className="mt-5" onClick={handleSubmit}>Submit</Button>
                </form>
            </div>
        </Scaffold>
    )
}