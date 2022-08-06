import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParkingSlot from "../components/ParkingSlot";
import Parking from "../Parking";
import {
  FIXED_CHARGE,
  FULL_DAY_CHARGE,
  L_HOURLY_CHARGE,
  M_HOURLY_CHARGE,
  S_HOURLY_CHARGE,
} from "../utils/constants";
import { getVehicleValue } from "../utils/common";
import "./styles/ParkingLot.css";

const ParkingLot = () => {
  const { carSize, noOfHours, entrance } = useSelector((state) => state.car);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({});
  const [hasParked, setHasParked] = useState(false);
  const [hasUnparked, setHasUnparked] = useState(false);
  const [totalCharge, setTotalCharge] = useState(false);
  const [message, setMessage] = useState("");

  const parking = new Parking();
  const navigate = useNavigate();

  useEffect(() => {
    setParkingSlots(parking.PARKING_SLOT);
  }, []);

  const handlePark = () => {
    let updatedParkSlot = parking.park(parkingSlots, carSize, "A");

    let slot = {
      row: updatedParkSlot.row,
      col: updatedParkSlot.col,
    };

    //Check if there is available slot
    if (updatedParkSlot) {
      //Toggle the hasParked state
      setHasParked(true);
      //Set the slot where car is parked
      setCurrentSlot(slot);
      //Update the slots
      handleUpdateSlots(updatedParkSlot);
    } else {
      setMessage("No parking slot available.");
      setHasUnparked(true);
    }
  };

  const handleUnpark = () => {
    setHasParked(false);
    setHasUnparked(true);

    let resetSlot = parking.unpark(
      parkingSlots,
      currentSlot.row,
      currentSlot.col
    );

    //Update the parking slots state
    handleUpdateSlots(resetSlot);

    //Check the total charges
    handleComputeCharges();
  };

  const handleComputeCharges = () => {
    let remainingHours = noOfHours;
    let size = getVehicleValue(carSize);
    let charges = 0;
    let hourlyCharge = 0;

    //Set the hourly charge for each car size
    if (0 === size) {
      hourlyCharge = S_HOURLY_CHARGE;
    } else if (1 === size) {
      hourlyCharge = M_HOURLY_CHARGE;
    } else if (2 === size) {
      hourlyCharge = L_HOURLY_CHARGE;
    }

    // Check if no of hours exceed or equal to 24
    if (remainingHours >= 24) {
      remainingHours -= 24;
      //Add the full day and fixed charge
      charges += remainingHours * hourlyCharge + FULL_DAY_CHARGE + FIXED_CHARGE;
      setTotalCharge(charges);
      return;
    }

    // First 3 hours has a flat rate of 40
    charges += FIXED_CHARGE;
    remainingHours -= 3;

    //Computation for exceeding hourly rate
    if (remainingHours > 0) {
      charges += remainingHours * hourlyCharge;
    }

    setTotalCharge(charges);
  };

  const handleUpdateSlots = (updatedSlot) => {
    //Update slot from the parkingSlots state
    setParkingSlots((prevState) =>
      prevState.map((row, index) => {
        if (index === updatedSlot.row) {
          return row.map((col, index) => {
            if (index === updatedSlot.col) {
              return updatedSlot;
            } else {
              return col;
            }
          });
        } else {
          return row;
        }
      })
    );
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="parking-lot">
        <div className="car-details">
          <h2>Parking Details</h2>
          <p>
            Car Size: <strong>{carSize.toUpperCase()}</strong>
          </p>
          <p>
            Hours of Parking: <strong>{noOfHours}</strong>
          </p>
          <p>
            Entrance: <strong>{entrance}</strong>
          </p>
          <div className="car-functions">
            {!hasParked && !hasUnparked && (
              <button onClick={handlePark}>Park Car</button>
            )}
            {hasParked && !hasUnparked && (
              <button onClick={handleUnpark}>Unpark Car</button>
            )}
          </div>
          {message && (
            <span className="message">
              <strong>{message}</strong>
            </span>
          )}
          {hasUnparked && (
            <div>
              <h2>Parking Details</h2>
              <p>
                Total Parking Charge: ₱<strong>{totalCharge}</strong>
              </p>
              <div className="car-functions">
                <button onClick={handleRedirect}>Park another car</button>
              </div>
            </div>
          )}
        </div>

        <div className="parking-details">
          <h3>Parking Lot</h3>
          <div className="legend">
            <div className="legend-container">
              <span className="legend-occupied"></span> <h5>Occupied</h5>
            </div>
            <div className="legend-container">
              <span className="legend-vacant"></span> <h5>Vacant</h5>
            </div>
            <div className="legend-container">
              <span className="legend-entrance"></span> <h5>Entrance</h5>
            </div>
          </div>

          <section className="main">
            {parkingSlots &&
              parkingSlots.map((row, index) => (
                <div key={row + index}>
                  <ParkingSlot slot={row} />
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ParkingLot;
