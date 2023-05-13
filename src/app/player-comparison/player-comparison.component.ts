
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
  playerStats: any[][] = [[], []];
  teams: any;
  selectedTeamId: string[] = ['', ''];
  players: any[][] = [[], []];
  selectedPlayerId: string[] = ['', ''];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private teamService: TeamsService
  ) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(res =>{
      console.log(res)
      this.teams = res;
    })
    // const player1Id = this.route.snapshot.paramMap.get('player1Id');
    // const player2Id = this.route.snapshot.paramMap.get('player2Id');
    // if (player1Id !== null && player2Id !== null) {
    //   this.playerService.getPlayerStats(player1Id).subscribe(stats => {
    //     this.player1Stats = stats;
    //   });

    //   this.playerService.getPlayerStats(player2Id).subscribe(stats => {
    //     this.player2Stats = stats;
    //   });
    // }
  }

 
  onTeamChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    if(target.value){
      this.selectedTeamId[index] = target.value;
  
      this.teamService.getTeamPlayers(parseInt(this.selectedTeamId[index])).subscribe(players => {
        this.players[index] = players.players;
        console.log(this.players)
      });
    }
  }
  

  onPlayerChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    if(target.value){
      this.selectedPlayerId[index] = target.value;
  
      this.playerService.getPlayerStats(this.selectedPlayerId[index]).subscribe(stats => {
        this.playerStats[index] = stats;
        console.log(this.playerStats)
      });
    }
  }
  
  comparePlayers(){

  }
}
