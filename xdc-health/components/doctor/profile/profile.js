import Scaffold from "../../utils/scaffold"
import Card from "../../utils/card"
import { doctorDetails, links } from "../config"

function Field(props) {
    return (
        <div>
            <p className="font-medium">{props.name}</p>
            <p className="text-gray-500 mb-2">{props.value}</p>
        </div>
    )
}

export default function DoctorProfile() {
    return (
        <Scaffold links={links} page="Profile">
            <Card title="Personal Info">
                <div className="flex p-10">
                    <img className="h-60 w-60 rounded-full" alt="image" src="https://fakeface.rest/face/view?gender=male" />
                    <div className="flex flex-col justify-center min-h-full w-full px-20">
                        {
                            // loop through the object
                            Object.keys(doctorDetails).map((key) => {
                                return <Field name={key} value={doctorDetails[key]} />
                            })
                        }
                    </div>
                </div>
            </Card>
        </Scaffold>
    )
}