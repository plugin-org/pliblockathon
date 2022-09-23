import {useWeb3} from "@3rdweb/hooks"
import { useEffect, useState } from "react"
import Field from "../utils/field"
import Modal from "../utils/modal"

function Card(props){
    return (
        <div className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg bg-white">
        <p className="font-medium text-gray-500 uppercase">
          {props.type}
        </p>
        <img src={props.image} className="h-40 w-40 mx-auto"/>
        <button onClick={props.onClick} className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-80">
          Continue
        </button>
      </div>
    )
}

export default function LandingPage(){
    const { address, connectWallet, } = useWeb3();
    const [patientModal, setPatientModal] = useState(false)
    const [adhaar, setAdhaar] = useState("")

    useEffect(()=>{
      // TODO: fetch the data from the smart contract and redirect to the correct page
    }, [address])

    const handleConnect = async () => {
        await connectWallet("injected")
    }

    const handleSubmitPatient = async () => {
      // TODO: check if it is a valid patient
      // TODO: register it in the cookie
    }

    return (
      <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
        <div className="container px-6 py-8 mx-auto">
          <img src="/assets/xdc-health-icon.svg" className="h-20 w-20 mx-auto"/>
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">
            XDC Health
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6">
            A decentralized health record management system
          </p>
          <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3 select-none">
              <Card type="Hospital" image="/assets/admin.png" onClick={handleConnect}/>
              <Card type="Patient" image="/assets/patient.png" onClick={()=>setPatientModal(true)}/>
              <Card type="Doctor" image="/assets/doctor.png" onClick={handleConnect}/>
          </div>
        </div>
        <Modal isOpen={patientModal} onSubmit={handleSubmitPatient} onCancel={()=>setPatientModal(false)}>
          <Field label="Adhaar Number" type="text" onChange={(e) => setAdhaar(e.target.value)} />
        </Modal>
      </div>
    )
}