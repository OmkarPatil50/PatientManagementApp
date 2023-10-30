import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./forms.css";
import { addWard, fetchWards, updateWard } from "../../Slices/wardSlice";

export const NewWardForm = () => {
  const [newWard, setNewWard] = useState({
    wardNumber: "",
    capacity: 0,
    specializations: []
  });
  const [inputs, setInputs] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  useEffect(() => {
    dispatch(fetchWards());
    if (location.state) {
      setIsEditForm(true);
      setNewWard(location.state);
    }
  }, []);

  const fillTestCred = () => {
    setNewWard({
      wardNumber: "GN002",
      capacity: 100,
      specializations: ["Pediatrics", "Surgery"]
    });
    setInputs("");
  };

  const handleEventFormSubmit = () => {
    if (isEditForm) {
      dispatch(updateWard({ _id: location.state._id, newWard }));
    } else {
      dispatch(addWard(newWard));
    }
    setIsEditForm(false);
    setNewWard({
      wardNumber: "",
      capacity: 0,
      specializations: []
    });
    setInputs("");
    navigate("/wards");
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">{`${
        location.state ? "Update" : "Add New"
      } Ward`}</h1>
      {!isEditForm ? (
        <button className="btn-primary" onClick={fillTestCred}>
          Fill Test Credentials
        </button>
      ) : (
        ""
      )}

      <div className="form">
        <fieldset className="flex-column-fieldset">
          <legend>Name</legend>
          <label htmlFor="wardNumber">
            <input
              className="form-input"
              required
              type="text"
              placeholder="GN003"
              value={newWard.wardNumber}
              onChange={(event) => {
                setNewWard(() => ({
                  ...newWard,
                  wardNumber: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Capacity</legend>
          <label htmlFor="capacity">
            <input
              className="form-input"
              required
              type="number"
              placeholder="50"
              value={newWard.capacity === 0 ? "" : newWard.capacity}
              onChange={(event) => {
                setNewWard(() => ({
                  ...newWard,
                  capacity: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset className="flex-column-fieldset">
          <legend>Specializations</legend>
          <section className="form-inputs-main">
            <label htmlFor="specializations">
              <input
                className="form-input multiple-input"
                required
                type="text"
                placeholder="specializations"
                value={inputs}
                onChange={(event) => {
                  setInputs(event.target.value);
                }}
              />
            </label>

            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (inputs.length) {
                  setNewWard(() => ({
                    ...newWard,
                    specializations: [...newWard.specializations, inputs]
                  }));
                  setInputs("");
                }
              }}
            >
              +
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newWard.specializations.map((item, index) => {
              const indexToDelete = index;

              return (
                <li key={index} className="form-input-tag">
                  <p>{item}</p>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewWard(() => ({
                        ...newWard,
                        specializations: newWard.specializations.filter(
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
      </div>
      <section className="btn-section-form">
        <button
          className="btn-primary"
          onClick={() => {
            if (
              newWard.wardNumber.length &&
              newWard.capacity > 0 &&
              newWard.specializations.length
            ) {
              handleEventFormSubmit();
            }
          }}
        >
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewWard({
              wardNumber: "",
              capacity: 0,
              specializations: []
            });
            setInputs("");
            setIsEditForm(false);
            navigate("/wards");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
