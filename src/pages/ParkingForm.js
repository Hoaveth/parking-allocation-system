import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/carSlice";
import { useNavigate } from "react-router-dom";
import { CAR_SIZES, MALL_ENTRANCE } from "../utils/constants";
import "./styles/ParkingForm.css";

const ParkingForm = () => {
  const [carSize, setCarSize] = useState("");
  const [hours, setHours] = useState("");
  const [entrance, setEntrance] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalHours = Math.round(hours);

    const payload = {
      carSize,
      hours: totalHours,
      entrance,
    };

    dispatch(register(payload));
    navigate("/parking_lot");
  };

  return (
    <div className="form">
      <h2>Car Registration</h2>
      <form onSubmit={handleSubmit}>
        <label for="carsize">Car Size</label>
        <select
          value={carSize}
          name="carsize"
          onChange={(e) => setCarSize(e.target.value)}
        >
          <option value="" selected="selected" hidden="hidden">
            Choose Car Size
          </option>
          {CAR_SIZES &&
            CAR_SIZES.map((item) => <option value={item}>{item}</option>)}
        </select>

        <label for="hours">Hours</label>
        <input
          name="hours"
          type="number"
          placeholder="Enter no of hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          step="any"
          min={1}
        />

        <label for="entrance">Entrance</label>
        <select
          value={entrance}
          name="entrance"
          onChange={(e) => setEntrance(e.target.value)}
        >
          <option value="" selected="selected" hidden="hidden">
            Choose Entrance
          </option>
          {MALL_ENTRANCE &&
            MALL_ENTRANCE.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
        </select>
        <button type="submit">Submit Details</button>
      </form>
    </div>
  );
};

export default ParkingForm;
