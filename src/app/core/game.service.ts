import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public board = [];
  boardSize: number = 9;
  activePlayer: string = 'X';
  count = 0;
  isGameStart: boolean = false;
  isGameEnd: boolean = false;
  winner: boolean = false;

  constructor() {
    this.startNewGame();
  }

  //
  startNewGame() {
    this.activePlayer = 'X';
    this.count = 0;
    this.isGameStart = false;
    this.isGameEnd = false;
    this.winner = false;
    this.board = this.createBoard();
    console.log(this.board);
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    }
    return board;
  }

  //getBoard
  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [...board];
  }

  //change player
  changePlayer(cellClicked: any) {
    this.updateBoard(cellClicked);
    if (!this.isGameEnd)
      this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
    this.count++;
    this.isGameEnd = this.isGameEnd ? true : false;
  }

  //update board
  updateBoard(cellClicked) {
    this.board[cellClicked.id].state = cellClicked.state;
    if (this.isWinner) {
      this.winner = true;
      this.isGameStart = false;
      this.isGameEnd = true;
    }
  }

  //get game end
  get gameEnd(): boolean {
    return this.count > 8 || this.winner ? true : false;
  }
  //get game winner

  get isWinner(): boolean {
    return this.checkDiag() ||
      this.checkrows(this.board, 'row') ||
      this.checkrows(this.board, 'col')
      ? true
      : false;
  }

  // check rows
  checkrows(board, mode): boolean {
    const row = mode === 'row' ? true : false;
    const dist = row ? 1 : 3;
    const inc = row ? 3 : 1;
    const numTimes = row ? 7 : 3;
    for (let i = 0; i < numTimes; i += inc) {
      // row
      /* 
        0 1 2 
        3 4 5 
        6 7 8 
        */
      // col
      /*
        0 3 6
        1 4 7
        2 5 8
        */
      let firstCell = board[i].state;
      let secondCell = board[i + dist].state;
      let thirdCell = board[i + dist * 2].state;
      if (firstCell && secondCell && thirdCell) {
        if (firstCell === secondCell && secondCell === thirdCell) return true;
      }
    }
    return false;
  }

  //cheack diag
  checkDiag() {
    const timesRun = 2;
    const midCell = this.board[4].state;
    for (let i = 0; i <= timesRun; i += 2) {
      let topCorner = this.board[i].state;
      let bottomCorner = this.board[8 - i].state;
      console.log(i);
      console.log('top', this.board[i], topCorner);
      console.log('midCell', this.board[4], midCell);
      console.log('bottom', this.board[8 - i], bottomCorner);
      if (midCell && topCorner && bottomCorner) {
        if (midCell === topCorner && topCorner === bottomCorner) return true;
      }
    }

    return false;
  }
}
