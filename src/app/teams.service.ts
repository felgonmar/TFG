import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './config';
@Injectable({
  providedIn: 'root'
})


export class TeamsService {
 

  constructor(private http: HttpClient) { }

  getTeams() {
    return this.http.get<any>(`${baseUrl}/teams/`);
  }

  getTeamPlayers(teamId: number){
    return this.http.get<any>(`${baseUrl}/teams/${teamId}/players/`);
  }

  getHistoricalLeaders(teamId:number){
    return this.http.get<any>(`${baseUrl}/historicalLeaders/${teamId}/`);
  }
}
