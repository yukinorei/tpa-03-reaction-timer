import { NUM_ROWS, NUM_COLS } from '../constants.js';
import { getRandomInt } from '../utils/math-utils.js';
import ReactionTimerGridView from './ReactionTimerGridView.js';

class ReactionTimerGame {
  constructor() {
    this.view = null;
    this.activeCellRow = null;
    this.activeCellCol = null;
    this.activeSecondCellRow = null;
    this.activeSecondCellCol = null;
    this.currentStartTime = null;
    this.currentEndTime = null;
    this.countUp = 0;
  }

  handleRoundStart() {
    const delay = getRandomInt(500, 3000);
    setTimeout(this.startCycle.bind(this), delay);
  }

  startCycle() {
    this.currentStartTime = new Date().getTime(); // milliseconds
    this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
    this.view.deactivateCell(this.activeSecondCellRow, this.activeSecondCellCol);
    this.triggerRandomCell();
  }

  triggerRandomCell() {
    this.activeCellRow = getRandomInt(0, NUM_ROWS);
    this.activeCellCol = getRandomInt(0, NUM_COLS);
    this.view.activateCell(this.activeCellRow, this.activeCellCol);
    this.activeSecondCellRow = getRandomInt(0, NUM_ROWS);
    this.activeSecondCellCol = getRandomInt(0, NUM_COLS);
    this.view.activateCell(this.activeSecondCellRow, this.activeSecondCellCol);
  }

  handleActiveCellSelected(row, col) {
    this.view.deactivateCell(row, col);
    this.countUp += 1;
    this.calculateTime();
  }


  calculateTime() {
    this.currentEndTime = new Date().getTime();
    const partition = '---';
    const count = `${this.countUp}st reaction`;
    const currentTime = this.currentEndTime - this.currentStartTime;
    console.log(this.countUp === 2 ? `${count} ${currentTime}\n${partition}` : `${count} ${currentTime}`);
    if (this.countUp === 2) {
      this.countUp = 0;
    }
    // console.log(countUp);
    // if (countUp % 2 !== 0) {
    //   console.log(`${countUp}st reaction ${this.currentEndTime - this.currentStartTime}`);
    //   countUp += 1;
    // } else {
    //   console.log(`${countUp}st reaction ${this.currentEndTime - this.currentStartTime}`);
    //   countUp += 1;
    // }
  }

  init() {
    this.view = new ReactionTimerGridView();
    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));

    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
