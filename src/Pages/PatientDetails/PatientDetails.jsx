import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "../details.css";
import { deletePatient } from "../../Slices/patientSlice";

export const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patients);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfAdmission: "",
    medicalHistory: [
      {
        disease: "",
        treatment: "",
        ageAtTimeOfDisease: ""
      }
    ],
    contact: {
      phoneNumber: 0,
      address: ""
    },
    ward: {
      wardNumber: "",
      capacity: 0,
      specializations: []
    }
  });

  const getDate = (date) => {
    return new Date(getDate).toLocaleString();
  };

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
    navigate("/patients");
  };

  useEffect(() => {
    const getPatient = patients.find(({ _id }) => _id === patientId);

    setPatient(getPatient);
  }, [patientId, patients, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1 className="page-heading">Patient's Details</h1>
        </header>
        <section className="details-box">
          <h4>
            Name: <span>{patient.name}</span>
          </h4>
          <h4>
            Age: <span>{patient.age}</span>
          </h4>
          <h4>
            Gender: <span>{patient.gender}</span>
          </h4>
          <h4>
            Date of Admission: <span>{getDate(patient.dateOfAdmission)}</span>
          </h4>
          <h4>
            Phone No: <span>{patient.contact.phoneNumber}</span>
          </h4>
          <h4>
            Address: <span>{patient.contact.address}</span>
          </h4>
          <h4 className="requirement-list-heading"> Medical History: </h4>
          <ul className="requirement-list">
            {patient.medicalHistory.map((historyItem, index) => {
              const { disease, treatment, ageAtTimeOfDisease } = historyItem;
              return (
                <li key={index} className="requirement-list-item">
                  <p>{disease}</p>
                  <p>
                    Treatment taken: <span>{treatment}</span>
                  </p>
                  <p>
                    Age (at time of disease):{" "}
                    <span>{ageAtTimeOfDisease} Years</span>
                  </p>
                </li>
              );
            })}
          </ul>
          <h4>
            Ward No: <span>{patient.ward.wardNumber}</span>
          </h4>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/patients/edit/${patient._id}`, {
                state: patient
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              handleDelete(patient._id);
            }}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
