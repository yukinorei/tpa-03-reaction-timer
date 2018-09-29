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
    for (let i = 1; i < 3; i += 1) {
      const randomRowIndex = getRandomInt(0, NUM_ROWS);
      const randomColIndex = getRandomInt(0, NUM_COLS);
      if (this.activeCellRow === null) {
        this.activeCellRow = randomRowIndex;
        this.activeCellCol = randomColIndex;
        this.view.activateCell(randomRowIndex, randomColIndex);
      }
      this.activeSecondCellRow = randomRowIndex;
      this.activeSecondCellCol = randomColIndex;
      this.view.activateCell(randomRowIndex, randomColIndex);
    }
  }

  handleActiveCellSelected() {
    if (this.activeCellRow) {
      this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
      this.calculateTime();
    }
    if (this.activeSecondCellRow) {
      this.view.deactivateCell(this.activeSecondCellRow, this.activeSecondCellCol);
      this.calculateTime();
    }
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    console.log(this.currentEndTime - this.currentStartTime);
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
