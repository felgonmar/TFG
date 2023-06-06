import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) {

   }

   getPlayerCommonInfo(playerId:String){
    return this.http.get<any>(`${baseUrl}/playerCommonInfo/${playerId}/`);
   }

   getPlayerStats(playerId: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/playerStats/${playerId}/`);
  }

  getPlayerComparison(playerId: string, vsPlayerId: string, seasonId?: string) {
    let params = new HttpParams();
    if (seasonId) {
      params = params.append('seasonId', seasonId);
    }

    return this.http.get<any>(`${baseUrl}/playerCompare/${playerId}/${vsPlayerId}`, { params });
  }

  findPlayer(name:String){
    return this.http.get<any>(`${baseUrl}//playerFinder/${name}`);
  }

  getAdvancedStats(playerId:String){
    return this.http.get<any>(`${baseUrl}/playerAdvancedStats/${playerId}`);
   }
}
