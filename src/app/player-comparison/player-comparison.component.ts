
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players.service'; 
import { TeamsService } from '../teams.service';
import { Chart } from 'chart.js';

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
  chart: any;
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
          console.log('Comparison',res)
          this.updateChart()
        })
        
      }
    }
  }
  
  objectKeys(obj:any) {
    return Object.keys(obj);
  }
  createChart() {
    let canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('No se pudo obtener el canvas');
    }
    let ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto del canvas');
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      }
    });
  }

  updateChart() {
    // actualizar los labels y datos de la gráfica
    this.chart.data.labels = ['PPG', 'APG', 'RPB'];

    this.chart.data.datasets[0].label = this.player1['CommonPlayerInfo'][0]['DISPLAY_FIRST_LAST'];
    this.chart.data.datasets[0].data = [
      this.player1['PlayerHeadlineStats'][0]['PTS'],
      this.player1['PlayerHeadlineStats'][0]['AST'],
      this.player1['PlayerHeadlineStats'][0]['REB']
    ];

    this.chart.data.datasets[1].label = this.player2['CommonPlayerInfo'][0]['DISPLAY_FIRST_LAST'];
    this.chart.data.datasets[1].data = [
      this.player2['PlayerHeadlineStats'][0]['PTS'],
      this.player2['PlayerHeadlineStats'][0]['AST'],
      this.player2['PlayerHeadlineStats'][0]['REB']
    ];

    // renderizar la gráfica nuevamente
    this.chart.update();
  }

  
}
