import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "../details.css";
import { deleteWard } from "../../Slices/wardSlice";

export const WardDetails = () => {
  const { wardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wards } = useSelector((state) => state.wards);

  const [ward, setWard] = useState({
    wardNumber: "",
    capacity: 0,
    specializations: []
  });

  const handleDelete = (id) => {
    dispatch(deleteWard(id));
    navigate("/wards");
  };

  useEffect(() => {
    const getWard = wards.find(({ _id }) => _id === wardId);
    setWard(getWard);
  }, [wardId, wards, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1 className="page-heading">Ward's Details</h1>
        </header>
        <section className="details-box">
          <h4>
            Ward Number: <span>{ward.wardNumber}</span>
          </h4>
          <h4>
            Capacity: <span>{ward.capacity}</span>
          </h4>
          <h4 className="requirement-list-heading">Specializations: </h4>
          <ul className="requirement-list">
            {ward.specializations.map((item) => {
              return <li className="requirement-list-item">{item}</li>;
            })}
          </ul>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/wards/edit/${ward._id}`, {
                state: ward
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              handleDelete(ward._id);
            }}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
