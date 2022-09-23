import { useWeb3 } from "@3rdweb/hooks"
import Field from "../../utils/field";
import Scaffold from "../../utils/scaffold";
import { links } from "../config"
import Button from '../../utils/button';
import { getContract, loadWeb3 } from "../../abi";
import { useEffect, useState } from "react";


export default function AdminCreateDoctor() {
    const { address, connectWallet } = useWeb3();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");

    useEffect(()=>{
        // connect to the wallet
        async function main(){
            await connectWallet("injected");
        }
        main();
    }, [])
    
    async function handleSubmit(e) {
        e.preventDefault();
        await loadWeb3()
        const cont = await getContract()
        await cont.methods.createDoctor(id, name, title).send({from: address})
    }

    return (
        <Scaffold links={links} page="Create Doctor">
            <div className="p-6">
                <h1 className="mt-6 text-4xl">Create Doctor</h1>
                <form className="">
                    <Field label="Doctor's Address" type="text" onChange={(e) => setId(e.target.value)} />
                    <Field label="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    <Field label="Title" type="text" onChange={(e) => setTitle(e.target.value)} />
                    <Button className="mt-5" onClick={handleSubmit}>Submit</Button>
                </form>
            </div>
        </Scaffold>
    )
}