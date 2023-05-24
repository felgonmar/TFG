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
    return this.http.get(`${baseUrl}/teams/`);
  }

  getTeamPlayers(teamId: number): Observable<TeamPlayersResponse> {
    return this.http.get<TeamPlayersResponse>(`${baseUrl}/teams/${teamId}/players/`);
  }
}

export interface TeamPlayersResponse {
  players: any[];
  headers: string[];
  players_dict: any[];
}