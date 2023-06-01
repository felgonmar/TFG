import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { RatingService } from '../rating.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  user: any;
  ratingsMap: { [teamId: number]: number | string } = {};
  userRatingMap:any = {};
  constructor(private teamsService: TeamsService, private ratingService:RatingService, private userService:UserService, public dialog: MatDialog) {
    this.user=this.userService.get_user()

}

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe((response: Object) => {
      if (response instanceof Array) {
        this.teams = response;
        this.getRatingsForTeams()
        if(this.user ){
          this.getUserRatingForTeams()
        }
   }
  
  });
   
  }


  getRatingsForTeams(): void {
    for (const team of this.teams) {
      this.getAllRating(team.id).then(rating => {
        this.ratingsMap[team.id] = rating;
      });
    }
  }

  getUserRatingForTeams(){
    for (const team of this.teams) {
      this.getUserRate(team.id).then(rating => {
        this.userRatingMap[team.id] = rating;
      });
    }
  }

  async getUserRate(id:number){
    try {
    console.log(this.user.id)
    const response = await this.ratingService.getUserRating('team',id.toString(),this.user.id.toString()).toPromise()
    console.log(response)
    return response
  } catch(error){
    console.log(error)
    return {'rating':'No rated yet',
          'comment': ''};
  }
  }

  async getAllRating(id: number) {
    try {
      const response = await this.ratingService.getRatings('team', id.toString()).toPromise();
      return response.total;
    } catch (error) {
      return 'No rated yet';
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
      this.ratingService.createRating('team',result.id.toString(),this.user.id.toString(),result.rating).subscribe(res=>{
        console.log(res)
      })
    });
}
}
