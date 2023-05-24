import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent {
  boxScore:any;
  playByPlay:any;
  gameId?: string;
  constructor(private gameService: GamesService, 
    private route: ActivatedRoute){}

  ngOnInit(): void {
      console.log(this.route.snapshot.paramMap)
      this.gameId = String(this.route.snapshot.paramMap.get('gameId'));
      this.gameService.getGameDetail(this.gameId).subscribe(response => {
        this.boxScore = response['box_score']
        this.playByPlay = response['play_by_play']
        console.log(this.boxScore)
      });
    }


}
