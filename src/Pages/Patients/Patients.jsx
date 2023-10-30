import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../pages.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatients } from "../../Slices/patientSlice";
import { PatientCard } from "../../Components/PatientCard/PatientCard";

export const Patients = () => {
  const { patients } = useSelector((state) => state.patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div className="main-page">
      <Helmet>
        <title>Hospitalize | Patients</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Patients</h1>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/add-patient");
          }}
        >
          Add New Patient
        </button>
      </header>
      <div className="flex-wrap-page">
        <ul className="card-list">
          {patients.map((patient) => {
            return <PatientCard patient={patient} key={patient._id} />;
          })}
        </ul>
      </div>
    </div>
  );
};
