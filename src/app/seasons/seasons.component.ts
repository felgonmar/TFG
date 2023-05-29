import { Component, OnInit } from '@angular/core';
import { SeasonsService } from '../seasons.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent {
  seasons =[]
  allData: any;
  west:any;
  east:any;
  constructor(private seasonsService: SeasonsService){}

  ngOnInit(){
    this.seasonsService.getAllSeasons().subscribe(res=>{
      console.log(res)
      this.seasons = res.seasonList
      this.getSeason(this.seasons[0])
    })
  }

  getSeasonEvent(event: Event) {
    const target = event.target as HTMLSelectElement;
    let season = target.value 
    this.getSeason(season)
  }
  getSeason(season:String){
    this.seasonsService.getSeason(season).subscribe(res=>{
      this.allData = res.Standings;
      console.log('all',res)
    })
    this.seasonsService.getConference(season).subscribe(res=>{
      this.east = res.East;
      this.west = res.West;
      console.log(res)
    })
  }

}
