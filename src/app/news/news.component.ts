import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  news: any;
  constructor(public newsSvc:NewsService){

  }
  
  ngOnInit(): void {
    this.newsSvc.getNews().subscribe(res =>{
      console.log(res);
      this.news = res;
    })
  }
}
