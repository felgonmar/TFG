import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe((response: Object) => {
      if (response instanceof Array) {
        this.teams = response;
      } else {
        console.error('Response is not an array:', response);
      }
    });
  }
}
