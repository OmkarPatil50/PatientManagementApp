import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePatient } from "../../Slices/patientSlice";

export const PatientCard = ({ patient }) => {
  const {
    _id,
    name,
    age,
    gender,
    dateOfAdmission,
    medicalHistory: [{ disease, treatment, ageAtTimeOfDisease }],
    contact: { phoneNumber, address },
    ward: { wardNumber, capacity, specializations }
  } = patient;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeletePatient = (id) => {
    dispatch(deletePatient(id));
  };

  return (
    <li key={_id} className="ward-card">
      <header className="ward-card-header">
        <h3 className="ward-title">{name}</h3>
        <p className="ward-date">
          <i className="fa-solid fa-phone"></i> {phoneNumber}
        </p>
      </header>
      <section className="ward-card-details-section">
        <p className="ward-details">
          <i className="fa-solid fa-house"></i> {wardNumber}
        </p>
      </section>
      <section className="btn-section-card">
        <button
          className="btn-secondary"
          onClick={() => navigate(`/patients/${_id}`)}
        >
          See Details
        </button>
        <button
          className="btn-secondary"
          onClick={() => handleDeletePatient(_id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </section>
    </li>
  );
};
