
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players.service'; 
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-player-comparison',
  templateUrl: './player-comparison.component.html',
  styleUrls: ['./player-comparison.component.css']
})
export class PlayerComparisonComponent implements OnInit {
  playerStats = [{}, {}];
  player1Stats:any;
  player2Stats:any;
  playersTeam1: any = [];
  playersTeam2: any = [];
  teams: any;
  selectedTeamId: string[] = ['', ''];
  players = [[], []];
  player1:any;
  player2:any;
  selectedPlayerId: string[] = ['', ''];
  playerComparison={}

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private teamService: TeamsService
  ) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(res =>{
      
      this.teams = res;
    })
  }

 
  onTeamChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    if(target.value){
      this.selectedTeamId[index] = target.value;
  
      this.teamService.getTeamPlayers(parseInt(this.selectedTeamId[index])).subscribe(players => {
        if(index == 0){this.playersTeam1 = players.players_dict}else{this.playersTeam2 = players.players_dict}
        
        
      });
    }
  }
  

  onPlayerChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    if(target.value){
      this.selectedPlayerId[index] = target.value;
      this.playerService.getPlayerCommonInfo(this.selectedPlayerId[index]).subscribe(res =>{
        if(index == 0){
          this.player1 = res;
          console.log(res)
        }else{
          this.player2=res;
          console.log(res)
        }
      })
      this.playerService.getPlayerStats(this.selectedPlayerId[index]).subscribe(stats => {
        if(index == 0){
          this.player1Stats = stats
        }else{
          this.player2Stats = stats
        }
      });

      if(this.player1Stats && this.player2Stats){
        this.playerService.getPlayerComparison(this.selectedPlayerId[0],this.selectedPlayerId[1]).subscribe(res =>{
          this.playerComparison = res;
          console.log(res)
        })
      }
    }
  }
  
  objectKeys(obj:any) {
    return Object.keys(obj);
  }
  
}
