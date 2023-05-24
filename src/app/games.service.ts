import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './config';
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private http: HttpClient) { }

  getGamesByDate(date:string){
    let params = new HttpParams();
    if(date){
      params = params.append('date', date);
    }
      return this.http.get<any>(`${baseUrl}/gamesByDate`, {params});
  }

  getGameDetail(gameId:string){
    return this.http.get<any>(`${baseUrl}/game/${gameId}/`)
  }
}
