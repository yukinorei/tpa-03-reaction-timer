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
    const randomRowIndex = getRandomInt(0, NUM_ROWS);
    const randomColIndex = getRandomInt(0, NUM_COLS);
    if (this.activeCellRow === null) {
      this.activeCellRow = randomRowIndex;
      this.activeCellCol = randomColIndex;
      this.view.activateCell(randomRowIndex, randomColIndex);
    }
    if (this.activeSecondCellRow === null) {
      this.activeSecondCellRow = randomRowIndex;
      this.activeSecondCellCol = randomColIndex;
      this.view.activateCell(randomRowIndex, randomColIndex);
    }
  }

  handleActiveCellSelected() {
    this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
    this.calculateTime();
  }

  handleActiveSecondCellSelected() {
    this.view.deactivateCell(this.activeSecondCellRow, this.activeSecondCellCol);
    this.calculateTime();
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    console.log(this.currentEndTime - this.currentStartTime);
  }

  init() {
    this.view = new ReactionTimerGridView();
    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerActiveCellSelectedCallback(this.handleActiveSecondCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));

    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
