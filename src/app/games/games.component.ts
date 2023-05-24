import { Component } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  games: any[] = [];  // Este array guardará los juegos que se obtienen del servicio

  constructor(private gameService: GamesService) { }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const date = target.value;
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    this.gameService.getGamesByDate(formattedDate).subscribe(res => {
      this.games = res.LeagueGameFinderResults;
    });
  }
  
}
