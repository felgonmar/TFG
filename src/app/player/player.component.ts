import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { RatingService } from '../rating.service';
import { PlayersService } from '../players.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerId?:any;
  commonInfo:any;
  stats:any;
  currentSeason: any;
  user:any;
  userRating:any= {'rating':'No rated yet', 'comment':''}
  totalRating:any
  advancedData:any;
  loaded = false;
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private ratingService:RatingService,
    private playersService: PlayersService, 
    public dialog: MatDialog){
      this.user=this.userService.get_user()
    }
    
  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    if(this.playerId){
      this.getCommonStats()
      this.getPlayerStats()
      this.getAllRating()
      if(this.user){
        this.getUserRate()
      }
    }
  }

  ngOnChanges(changes: SimpleChange){
    console.log(changes)
  }

  getCommonStats(){
    this.playersService.getPlayerCommonInfo(this.playerId).subscribe(res=>{
      console.log(res)
      this.commonInfo = res.CommonPlayerInfo[0];
    })
  }

  getPlayerStats(){
    this.playersService.getPlayerStats(this.playerId).subscribe(res=>{
      console.log(res)
      this.stats = res;
      this.currentSeason = this.stats.SeasonTotalsRegularSeason[this.stats.SeasonTotalsRegularSeason.length-1]
    })
  }

  async getAllRating() {
    try {
      const response = await this.ratingService.getRatings('player', this.playerId).toPromise();
      this.totalRating= response.total;
    } catch (error) {
       console.log('No rated yet');
    }
  }
  async getUserRate(){
    try {
    console.log(this.user.id)
    const response = await this.ratingService.getUserRating('player',this.playerId,this.user.id.toString()).toPromise()
    console.log(response)
    this.userRating= response
  } catch(error){
    console.log(error)
    console.log('no rated yet')
  }
  }
  openDialog(type: string, id: number): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '250px',
      data: {type: type, id: id},
      hasBackdrop: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.ratingService.createRating('player',result.id.toString(),this.user.id.toString(),result.rating, result.comment).subscribe(res=>{
        console.log(res)
      })
    });
}

async getAdvancedData(){
  this.loaded=true;
  try{
    const res = await this.playersService.getAdvancedStats(this.playerId).toPromise()
    console.log(res)
    this.advancedData = res
  }catch(error){
    console.log(error)
    this.loaded=false
    alert('Something went wrong')
  }
}
}
