import Scaffold from "../../utils/scaffold";
import { links } from "../config"

export default function AdminDashboard() {
    let today = new Date();

    return (
        <Scaffold links={links} page="Dashboard">
            <div className="">
                <h1 className="mt-6 text-4xl">Welcome, Admin</h1>
                <h3>Today is {today.toDateString()} </h3>
            </div>
        </Scaffold>
    )
}