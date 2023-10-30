import "./styles.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./Components/Loader/Loader";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Navbar } from "./Pages/Navbar/Navbar";
import { Wards } from "./Pages/Wards/Wards";
import { Patients } from "./Pages/Patients/Patients";
import { NewPatientForm } from "./Components/Forms/NewPatientForm";
import { NewWardForm } from "./Components/Forms/NewWardForm";
import { WardDetails } from "./Pages/WardDetails/WardDetails";
import { PatientDetails } from "./Pages/PatientDetails/PatientDetails";

export default function App() {
  const patientsState = useSelector((state) => state.patients);
  const wardState = useSelector((state) => state.wards);
  return (
    <div className="App">
      {patientsState.status === "loading" || wardState.status === "loading" ? (
        <Loader />
      ) : (
        ""
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/add-patient" element={<NewPatientForm />} />
        <Route path="/add-ward" element={<NewWardForm />} />
        <Route path="/wards/:wardId" element={<WardDetails />} />
        <Route path="/patients/:patientId" element={<PatientDetails />} />
        <Route path="/wards/edit/:wardId" element={<NewWardForm />} />
        <Route path="/patients/edit/:patientId" element={<NewPatientForm />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />
    </div>
  );
}
