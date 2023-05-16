import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class TeamsService {
  API_URL = 'http://localhost:8000';  

  constructor(private http: HttpClient) { }

  getTeams() {
    return this.http.get(`${this.API_URL}/teams/`);
  }

  getTeamPlayers(teamId: number): Observable<TeamPlayersResponse> {
    return this.http.get<TeamPlayersResponse>(`${this.API_URL}/teams/${teamId}/players/`);
  }
}

export interface TeamPlayersResponse {
  players: any[];
  headers: string[];
  players_dict: any[];
}