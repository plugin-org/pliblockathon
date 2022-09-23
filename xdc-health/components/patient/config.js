const links = [
  {
      name: "Dashboard",
      image: "/assets/dashboard.png",
      link: "/patient"
  },
  {
    name: "Records",
    image: "/assets/document.png",
    link: "/patient/records"
  }
]

const testTableHeaders = [
  "Date",
  "Time",
  "Appointment Type",
  "Likey Diagnosis",
]

const testRecords = [
  {
      date: "12/12/2021",
      time: "12:00 PM",
      appointmentType: "General Visit",
      likelyDiagnosis: "Covid-19",
      isCompleted: false
  },
  {
      date: "12/12/2021",
      time: "12:00 PM",
      appointmentType: "Routine Visit",
      likelyDiagnosis: "Cold",
      isCompleted: false
  },{
      date: "12/12/2021",
      time: "12:00 PM",
      appointmentType: "Routine Visit",
      likelyDiagnosis: "Cough",
      isCompleted: true
  },{
      date: "12/12/2021",
      time: "12:00 PM",
      appointmentType: "Vaccination",
      likelyDiagnosis: "Covid-19",
      isCompleted: true
  },
]

const patientDetails = {
    Aadhar: "123456789012",
    Name: "John Doe",
    DOB: "12/02/2021",
    Phone: "1234567890",
  }

export { links, patientDetails, testTableHeaders, testRecords }