import Card from "../../utils/card"
import Scaffold from "../../utils/scaffold"
import { links, patientDetails } from "../config"

function Field(props){
    return (
        <div>
            <p className="font-medium">{props.name}</p>
            <p className="text-gray-500 mb-2">{props.value}</p>
        </div>
    )
}

export default function PatientRecords(){
    // console.log(patientDetails.keys())
    return (
        <Scaffold links={links}>

            <Card title="Personal Info">
                <div className="flex p-10">
                    <img className="h-60 w-60 rounded-full" alt="image" src="https://fakeface.rest/face/view?gender=male"/>
                    <div className="flex flex-col justify-center min-h-full w-full px-20">
                        {
                            // loop through the object
                            Object.keys(patientDetails).map((key)=>{
                                return <Field name={key} value={patientDetails[key]}/>
                            })
                        }
                    </div>
                </div>
            </Card>
        </Scaffold>
    )
}

/*string adhaarNumber;
        string name;
        string dob;
        string phone;
        string patientAddress;*/