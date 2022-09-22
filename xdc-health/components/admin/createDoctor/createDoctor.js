import Field from "../../utils/field";
import Scaffold from "../../utils/scaffold";
import { links } from "../config"
import Button from '../../utils/button';

export default function AdminCreateDoctor() {
    let today = new Date();

    return (
        <Scaffold links={links} page="Create Doctor">
            <div className="p-6">
                <h1 className="mt-6 text-4xl">Create Doctor</h1>
                <form className="">
                    <Field label="Doctor's Address" type="text"/>
                    <Field label="Name" type="text" />
                    <Field label="Title" type="date" />
                    <Button className="mt-5">Submit</Button>
                </form>
            </div>
        </Scaffold>
    )
}