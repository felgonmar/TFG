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
      params = params.append('id', id)
      console.log(params)
      return this.http.get<any>(`${baseUrl}/ratings`, {params});
    }
    else{
       throw new Error('No se proporcionaron los parámetros "type" e "id".');
    }   
  }

  createRating(type: string, id: string, userId:String, rating:Number, comment?: string){
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
        throw new Error('Type has to be game, player or team')
    } 
    body['user_id'] = userId;
    body['rating'] = rating;
    if(comment){
      body['comment']= comment
    }
    return this.http.post(`${baseUrl}/createRating`, body);
  }

  getUserRating(type:string, id:string, user_id:string){
    let params = new HttpParams();
    if(type && id){
      params = params.append('type', type);
      params = params.append('id', id);
      params = params.append('user_id', user_id)
    }
    return this.http.get<any>(`${baseUrl}/userRate`, {params});
  }
}
