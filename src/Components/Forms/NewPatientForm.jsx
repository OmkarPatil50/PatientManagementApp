import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./forms.css";
import {
  addPatient,
  fetchPatients,
  updatePatient
} from "../../Slices/patientSlice";
import { fetchWards } from "../../Slices/wardSlice";

export const NewPatientForm = () => {
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfAdmission: "",
    medicalHistory: [],
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
  const [inputs, setInputs] = useState({
    disease: "",
    treatment: "",
    ageAtTimeOfDisease: 0
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  const { wards } = useSelector((state) => state.wards);

  const getDateInFormat = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
    if (location.state) {
      setIsEditForm(true);
      setNewPatient({
        ...location.state,
        dateOfAdmission: getDateInFormat(location.state.dateOfAdmission)
      });
    }
  }, []);

  const fillTestCred = () => {
    setNewPatient({
      name: "Test Patient",
      age: 18,
      gender: "Male",
      dateOfAdmission: "2023-10-25",
      medicalHistory: [
        {
          disease: "Test disease",
          treatment: "Test treatment",
          ageAtTimeOfDisease: 16
        }
      ],
      contact: {
        phoneNumber: 1023456789,
        address: "This is my test address"
      },
      ward: {
        _id: "653f94004d4fbc8d59f20990",
        wardNumber: "GN001",
        capacity: 50,
        specializations: ["general", "opd"]
      }
    });
    setInputs({ disease: "", treatment: "", ageAtTimeOfDisease: 0 });
  };

  const handlePatientFormSubmit = () => {
    if (isEditForm) {
      dispatch(updatePatient({ _id: location.state._id, newPatient }));
    } else {
      dispatch(addPatient(newPatient));
    }
    setIsEditForm(false);
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      dateOfAdmission: "",
      medicalHistory: [],
      contact: {
        phoneNumber: 0,
        address: ""
      },
      ward: ""
    });
    setInputs({ disease: "", treatment: "", ageAtTimeOfDisease: 0 });
    navigate("/patients");
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">{`${
        location.state ? "Update" : "Add New"
      } Patient`}</h1>
      {!isEditForm ? (
        <button className="btn-primary" onClick={fillTestCred}>
          Fill Test Credentials
        </button>
      ) : (
        ""
      )}

      <div className="form">
        <fieldset>
          <legend>Name</legend>
          <label htmlFor="name">
            <input
              className="form-input"
              required
              type="text"
              placeholder="Test Patient Name"
              value={newPatient.name}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  name: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Age</legend>
          <label htmlFor="age">
            <input
              className="form-input"
              required
              type="number"
              placeholder="23"
              value={newPatient.age === 0 ? "" : newPatient.age}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  age: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Gender</legend>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newPatient.gender === "Male"}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  gender: "Male"
                }));
              }}
            />{" "}
            Male
          </label>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newPatient.gender === "Female"}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  gender: "Female"
                }));
              }}
            />{" "}
            Female
          </label>{" "}
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newPatient.gender === "Other"}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  gender: "Other"
                }));
              }}
            />{" "}
            Other
          </label>
        </fieldset>

        <fieldset>
          <legend>Date Of Admission</legend>
          <label htmlFor="date">
            <input
              className="form-input"
              required
              type="date"
              value={newPatient.dateOfAdmission}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  dateOfAdmission: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset className="flex-column-fieldset">
          <legend>Medical History</legend>
          <section className="form-inputs-main">
            <label htmlFor="disease">
              <input
                className="form-input multiple-input"
                required
                type="text"
                placeholder="Disease"
                value={inputs.disease}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    disease: event.target.value
                  }));
                }}
              />
            </label>
            <label htmlFor="treatment">
              <input
                className="form-input multiple-input"
                required
                type="text"
                placeholder="Treatment"
                value={inputs.treatment}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    treatment: event.target.value
                  }));
                }}
              />
            </label>
            <label htmlFor="ageAtTimeOfDisease">
              <input
                className="form-input multiple-input"
                required
                type="number"
                placeholder="Age At Time Of Disease"
                value={inputs.ageAtTimeOfDisease}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    ageAtTimeOfDisease: event.target.value
                  }));
                }}
              />
            </label>
            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (
                  inputs.disease &&
                  inputs.treatment &&
                  inputs.ageAtTimeOfDisease > 0
                ) {
                  setNewPatient(() => ({
                    ...newPatient,
                    medicalHistory: [...newPatient.medicalHistory, inputs]
                  }));
                  setInputs({
                    disease: "",
                    treatment: "",
                    ageAtTimeOfDisease: 0
                  });
                }
              }}
            >
              +
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newPatient.medicalHistory.map((item, index) => {
              const indexToDelete = index;
              return (
                <li key={index} className="form-input-tag">
                  <section>
                    <p>Disease: {item.disease}</p>
                    <p>Treatment: {item.treatment}</p>
                    <p>Age (at time of disease): {item.ageAtTimeOfDisease}</p>
                  </section>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewPatient(() => ({
                        ...newPatient,
                        medicalHistory: newPatient.medicalHistory.filter(
                          (item, index) => index !== indexToDelete
                        )
                      }));
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend>Phone Number</legend>
          <label htmlFor="phoneNumber">
            <input
              className="form-input"
              required
              type="number"
              placeholder="9893565787"
              value={
                newPatient.phoneNumber === 0
                  ? ""
                  : newPatient.contact.phoneNumber
              }
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  contact: {
                    ...newPatient.contact,
                    phoneNumber: event.target.value
                  }
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <label htmlFor="address">
            <input
              className="form-input"
              type="text"
              placeholder="New York , USA"
              value={newPatient.address === 0 ? "" : newPatient.contact.address}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  contact: {
                    ...newPatient.contact,
                    address: event.target.value
                  }
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Select Ward</legend>
          <label htmlFor="ward">
            <select
              className="form-input mb-10"
              required
              name="ward-name"
              placeholder="GN001"
              value={newPatient.ward._id}
              onChange={(event) => {
                setNewPatient(() => ({
                  ...newPatient,
                  ward: event.target.value
                }));
              }}
            >
              <option value="all">Select Ward</option>
              {wards.map(({ _id, wardNumber }) => {
                return <option value={_id}>{wardNumber}</option>;
              })}
            </select>
          </label>
        </fieldset>
      </div>
      <section className="btn-section-form">
        <button
          className="btn-primary"
          onClick={() => {
            if (
              newPatient.name.length &&
              newPatient.age > 0 &&
              newPatient.gender.length &&
              newPatient.dateOfAdmission.length &&
              newPatient.contact.phoneNumber > 0 &&
              newPatient.contact.address.length &&
              newPatient.ward
            ) {
              handlePatientFormSubmit();
            }
          }}
        >
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewPatient({
              name: "",
              age: "",
              gender: "",
              dateOfAdmission: "",
              medicalHistory: [
                {
                  disease: "",
                  treatment: "",
                  ageAtTimeOfDisease: 0
                }
              ],
              contact: {
                phoneNumber: 0,
                address: ""
              },
              ward: ""
            });
            setInputs({
              disease: "",
              treatment: "",
              ageAtTimeOfDisease: 0
            });
            setIsEditForm(false);
            navigate("/patients");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
