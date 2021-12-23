import { Component } from '@angular/core';
import { GameService } from './core/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe Angular';

  constructor(public gameService: GameService) {}

  resetGame() {
    this.gameService.startNewGame();
  }
}
