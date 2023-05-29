import { Injectable } from '@angular/core';
import { baseUrl } from './config';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatings(type:string, id:string){
    let params = new HttpParams();
    if(type && id){
      params = params.append('type', type);
      params.append('id', id)
    }
    return this.http.get<any>(`${baseUrl}/ratings`, {params});
  }

  createRating(type: string, id: string, userId:String, rating:Number){
    let body:any = {}
    switch (type) {
      case 'game':
        body['game_id'] = id;
        break;
      case 'player':
        body['player_id'] = id
        break;
      case 'team':
        body['team_id']= id
        break;
      default:
        return new Error('Type has to be game, player or team')
    } 
    body['user_id'] = userId;
    body['rating'] = rating;
    return this.http.post(`${baseUrl}/createRating`, body);
  }
}
