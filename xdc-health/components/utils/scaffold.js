
import Sidebar from "./sidebar";

export default function Scaffold(props) {
    return (
        <div className="flex">
            <Sidebar links={props.links} page={props.page} />
            <div className="flex-grow h-screen bg-gray-100 p-6">
                { props.children }
            </div>
        </div>
    )
}