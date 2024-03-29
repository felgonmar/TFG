import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  teamId?: number;
  players: any[] = [];
  coaches: any[] = []
  historicalLeaders:any;
  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap)
    this.teamId = Number(this.route.snapshot.paramMap.get('teamId'));
    this.teamsService.getTeamPlayers(this.teamId).subscribe(response => {
      this.players = response.CommonTeamRoster;
      console.log(this.players)
      this.coaches = response.Coaches;
    });
    this.teamsService.getHistoricalLeaders(this.teamId).subscribe(res=>{
      this.historicalLeaders = res.CareerLeadersByTeam[0];
    })
  }
}
