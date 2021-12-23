import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() cell;

  constructor(public gameService: GameService) {}

  ngOnInit() {}

  changePlayer() {
    this.gameService.isGameStart = true;
    console.log(this.gameService.isGameStart);

    if (this.gameService.isGameStart && this.cell.state === null) {
      this.cell.state = this.gameService.activePlayer;
      this.gameService.changePlayer(this.cell);
    }
  }
}
