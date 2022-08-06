import { PARKING_LOT_SIZES } from "./utils/constants";
import { getVehicleValue } from "./utils/common";

class Parking {
  PARKING_SLOT = [];

  constructor() {
    this.MAX_COLS = 5;
    this.MAX_ROWS = 5;

    // Initializing the parking slots
    this.PARKING_SLOT = new Array(this.MAX_ROWS)
      .fill(null)
      .map(() => new Array(this.MAX_COLS).fill(null));

    // Entrance slot
    this.ENTRANCE = [
      { name: "A", row: 0, col: 2 },
      { name: "B", row: 2, col: 0 },
      { name: "C", row: 4, col: 2 },
    ];

    // Initialize our parking spaces with random data
    this.initializeParkingSpaces();
  }

  //initialize the parking lot
  initializeParkingSpaces() {
    for (let row = 0; row < this.MAX_ROWS; row++) {
      for (let col = 0; col < this.MAX_COLS; col++) {
        if (!this.isPathway(row, col)) {
          this.PARKING_SLOT[row][col] = {
            isOccupied: false,
            slotSize: this.getRandomLotSize(),
            row,
            col,
          };
        } else if (this.isEntrance(row, col)) {
          //set the entrance slots
          this.PARKING_SLOT[row][col] = {
            isEntrance: true,
            entrance: this.ENTRANCE.find((o) => o.row === row && o.col === col)
              .name,
          };
        }
      }
    }
  }

  //check if the row/column is a pathway/gateway
  isPathway(row, col) {
    if (
      col === 0 ||
      row === 0 ||
      row === this.MAX_ROWS - 1 ||
      col === this.MAX_COLS - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  //check if the row/column is an entrance
  isEntrance(row, col) {
    if (
      (this.ENTRANCE[0].row === row && this.ENTRANCE[0].col === col) ||
      (this.ENTRANCE[1].row === row && this.ENTRANCE[1].col === col) ||
      (this.ENTRANCE[2].row === row && this.ENTRANCE[2].col === col)
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Randomize the assignment of lot size
  getRandomLotSize() {
    const min = 0;
    const max = 2;
    const lot_sizes = PARKING_LOT_SIZES;
    const size = Math.round(Math.random() * (max - min));
    const desc = lot_sizes[size];
    return {
      value: size,
      desc: desc,
    };
  }

  park(parkingSlots, carSize, ent) {
    let entrance = this.ENTRANCE.find((o) => o.name === ent.toUpperCase());
    let size = getVehicleValue(carSize);

    //Value checking
    let newRow = -1;
    let newCol = -1;
    let distance = 9999;

    // Search for the  parking space
    for (let row = 0; row < this.MAX_ROWS; row++) {
      for (let col = 0; col < this.MAX_COLS; col++) {
        if (!this.isPathway(row, col)) {
          let slot = parkingSlots[row][col];

          //Unfinished - still not working
          let computedDistance =
            Math.abs(entrance.row - slot.row) +
            Math.abs(entrance.col - slot.col);

          if (size <= slot.slotSize.value && !slot.isOccupied) {
            if (distance > computedDistance) {
              distance = computedDistance;
              newRow = row;
              newCol = col;
            }
          }
        }
      }
    }

    //Check if there is an available slot
    if (newRow === -1) {
      return false;
    } else {
      Object.assign(parkingSlots[newRow][newCol], {
        isOccupied: true,
        vehicleSize: {
          value: parseInt(size),
          desc: carSize,
        },
        slotSize: parkingSlots[newRow][newCol].slotSize,
        row: newRow,
        col: newCol,
      });

      return parkingSlots[newRow][newCol];
    }
  }

  unpark(parkingSlots, row, col) {
    let parking_slot = parkingSlots[row][col];

    Object.assign(parkingSlots[row][col], {
      isOccupied: false,
      vehicleSize: null,
      slotSize: parking_slot.slotSize,
      row,
      col,
    });

    return parkingSlots[row][col];
  }
}

export default Parking;
