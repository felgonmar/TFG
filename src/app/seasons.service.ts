import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  constructor(private http: HttpClient) { }

  getAllSeasons(){
    return this.http.get<any>(`${baseUrl}/allSeasons`);
  }

  getSeason(seasonId:any){
    let params = new HttpParams();
    if (seasonId) {
      params = params.append('season_id', seasonId);
    }
    return this.http.get<any>(`${baseUrl}/standings`, {params});
  }

  getConference(seasonId:any){
    let params = new HttpParams();
    if (seasonId) {
      params = params.append('season_id', seasonId);
    }
    return this.http.get<any>(`${baseUrl}/conferenceStandings`, {params});
  }
}
