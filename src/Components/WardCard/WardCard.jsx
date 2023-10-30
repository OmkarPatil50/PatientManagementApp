import { useDispatch } from "react-redux";
import "./WardCard.css";
import { useNavigate } from "react-router-dom";
import { deleteWard } from "../../Slices/wardSlice";

export const WardCard = ({ ward }) => {
  const { _id, wardNumber, capacity } = ward;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteWard = (id) => {
    dispatch(deleteWard(id));
  };
  return (
    <li key={_id} className="ward-card less-height-card">
      <header className="ward-card-header">
        <h3 className="ward-title">{wardNumber}</h3>
        <p className="ward-date">
          <i className="fa-solid fa-bed"></i> {capacity}
        </p>
      </header>

      <section className="ward-card-details-section"></section>
      <section className="btn-section-card">
        <button
          className="btn-secondary"
          onClick={() => {
            navigate(`/wards/${_id}`);
          }}
        >
          See Details
        </button>
        <button className="btn-secondary" onClick={() => handleDeleteWard(_id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </section>
    </li>
  );
};
