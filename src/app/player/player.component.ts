import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { RatingService } from '../rating.service';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerId?:any;
  commonInfo:any;
  stats:any;
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private ratingService:RatingService,
    private playersService: PlayersService){}
    
  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    if(this.playerId){
      this.getCommonStats()
      this.getPlayerStats()
    }
  }

  getCommonStats(){
    this.playersService.getPlayerCommonInfo(this.playerId).subscribe(res=>{
      this.commonInfo = res.CommonPlayerInfo[0];
    })
  }

  getPlayerStats(){
    this.playersService.getPlayerStats(this.playerId).subscribe(res=>{
      console.log(res)
      this.stats = res;
    })
  }

}
