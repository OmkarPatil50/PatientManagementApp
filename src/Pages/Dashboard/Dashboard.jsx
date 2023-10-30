import { Helmet } from "react-helmet";
import { ReactComponent as Image } from "../../Data/hero.svg";
import { Link } from "react-router-dom";
import "../pages.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../Slices/patientSlice";
import { fetchWards } from "../../Slices/wardSlice";

export const Dashboard = () => {
  const { wards } = useSelector((state) => state.wards);
  const { patients } = useSelector((state) => state.patients);

  const dispatch = useDispatch();

  const calculateTotalPatientsAdmitted = (patients) => {
    return patients.reduce((acc, curr) => {
      return (
        acc +
        parseFloat(
          curr.volunteersRequired.reduce(
            (total, currentRequirement) =>
              total + currentRequirement.requirement,
            0
          )
        )
      );
    }, 0);
  };

  const calculateOccupancyRate = (patients, wards) => {
    const totalCapacity = wards.reduce((acc, curr) => acc + curr.capacity, 0);
    return (parseFloat(patients.length) / parseFloat(totalCapacity)) * 100;
  };

  const getTopPerformingWard = (patients, wards) => {
    const result = wards.reduce((acc, curr) => {
      const totalFilled = patients.reduce((total, currPatient) => {
        return currPatient.ward._id === curr._id ? total + 1 : total;
      }, 0);
      const previousTotalFilled = patients.reduce((total, currPatient) => {
        return currPatient.ward._id === acc._id ? total + 1 : total;
      }, 0);
      return totalFilled / curr.capacity > previousTotalFilled / acc.capacity
        ? (acc = curr)
        : acc;
    }, wards[0]);
    return result;
  };

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);
  return (
    <div className="main-page">
      <Helmet>
        <title>Hospitalize | Dashboard</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Dashboard</h1>
      </header>
      <div className="sub-page">
        <section className="dashboard-section">
          <Image className="hero-img" />
        </section>
        <section className="dashboard-data dashboard-section">
          <p>
            {" "}
            Total Patients Admitted:
            <span> {patients.length} </span>{" "}
          </p>
          <p>
            Occupancy Rate:
            <span> {calculateOccupancyRate(patients, wards)} %</span>
          </p>
          <p>
            <span>Top Performing ward: </span>
            {getTopPerformingWard(patients, wards)
              ? getTopPerformingWard(patients, wards).wardNumber
              : "-"}
            {getTopPerformingWard(patients, wards) ? (
              <Link
                to={`/wards/${getTopPerformingWard(patients, wards)?._id}`}
                className="link dashboard-top-ward-details-link"
              >
                View Details
              </Link>
            ) : (
              ""
            )}
          </p>
        </section>
      </div>
    </div>
  );
};
