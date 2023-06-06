import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { RatingService } from '../rating.service';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent {
  boxScore:any;
  playByPlay:any;
  gameId?: any;
  userRating:any= {'rating':'No rated yet', 'comment':''}
  totalRating:any
  user:any;
  constructor(private gameService: GamesService, 
    private route: ActivatedRoute, public dialog: MatDialog,    
    private userService:UserService,
    private ratingService:RatingService,){
      this.user=this.userService.get_user()
    }

  ngOnInit(): void {
      console.log(this.route.snapshot.paramMap)
      this.gameId = String(this.route.snapshot.paramMap.get('gameId'));
      this.gameService.getGameDetail(this.gameId).subscribe(response => {
        this.boxScore = response['box_score']
        this.playByPlay = response['play_by_play']
        console.log(this.boxScore)
        console.log(this.playByPlay)
      });
    }

    async getAllRating() {
      try {
        const response = await this.ratingService.getRatings('game', this.gameId).toPromise();
        this.totalRating= response.total;
      } catch (error) {
         console.log('No rated yet');
      }
    }
    async getUserRate(){
      try {
      console.log(this.user.id)
      const response = await this.ratingService.getUserRating('game',this.gameId,this.user.id.toString()).toPromise()
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
        this.ratingService.createRating('game',result.id.toString(),this.user.id.toString(),result.rating, result.comment).subscribe(res=>{
          console.log(res)
        })
      });
  }


}
