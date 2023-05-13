import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {

   }


   getPlayerStats(playerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/player_stats/${playerId}`);
  }
}
