import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {

   }

   getPlayerCommonInfo(playerId:String){
    return this.http.get(`${this.baseUrl}/playerCommonInfo/${playerId}/`);
   }

   getPlayerStats(playerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/playerStats/${playerId}/`);
  }

  getPlayerComparison(playerId: string, vsPlayerId: string, seasonId?: string) {
    let params = new HttpParams();
    if (seasonId) {
      params = params.append('seasonId', seasonId);
    }

    return this.http.get(`${this.baseUrl}/playerCompare/${playerId}/${vsPlayerId}`, { params });
  }
}
