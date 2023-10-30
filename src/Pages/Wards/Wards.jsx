import { useDispatch, useSelector } from "react-redux";
import "../pages.css";
import { Helmet } from "react-helmet";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchWards } from "../../Slices/wardSlice";
import { WardCard } from "../../Components/WardCard/WardCard";

export const Wards = () => {
  const navigate = useNavigate();

  const { wards } = useSelector((state) => state.wards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);

  return (
    <div className="main-page">
      <Helmet>
        <title>Hospitalize | Wards</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Wards</h1>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/add-ward");
          }}
        >
          Add New Ward
        </button>
      </header>
      <div className="flex-wrap-page">
        <ul className="card-list">
          {wards.map((ward) => {
            return <WardCard ward={ward} key={ward?._id} />;
          })}
        </ul>
      </div>
    </div>
  );
};
