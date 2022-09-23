const links = [
    {
        name: "Dashboard",
        image: "/assets/dashboard.png",
        link: "/doctor"
    },
    {
        name: "Profile",
        image: "/assets/profile.png",
        link: "/doctor/profile"
    },
]

const dashboardTabs = [
    "Current Applications",
    "Previous Applications"
]

const testTableHeaders = [
    "Patient Name",
    "Date",
    "Time",
    "Appointment Type",
    "Likey Diagnosis",
    "Update"
]

const testRecords = [
    {
        patientName: "John Doe",
        date: "12/12/2021",
        time: "12:00 PM",
        appointmentType: "General Visit",
        likelyDiagnosis: "Covid-19",
        isCompleted: false
    },
    {
        patientName: "Jane Doe",
        date: "12/12/2021",
        time: "12:00 PM",
        appointmentType: "Routine Visit",
        likelyDiagnosis: "Cold",
        isCompleted: false
    },{
        patientName: "Manish Doe",
        date: "12/12/2021",
        time: "12:00 PM",
        appointmentType: "Routine Visit",
        likelyDiagnosis: "Cough",
        isCompleted: true
    },{
        patientName: "Harish Bhai",
        date: "12/12/2021",
        time: "12:00 PM",
        appointmentType: "Vaccination",
        likelyDiagnosis: "Covid-19",
        isCompleted: true
    },
]

const doctorDetails = {
    Aadhar: "123456789012",
    Name: "John Doe",
    DOB: "12/02/2021",
    Phone: "1234567890",
  }

export { links, dashboardTabs, testRecords, testTableHeaders, doctorDetails }