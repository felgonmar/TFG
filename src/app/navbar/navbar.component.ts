import { Component,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayersService } from '../players.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;
  searchForm: FormGroup;
  searchResults: any[] = [];
  showResults: boolean = false;


  constructor(private userService: UserService,private formBuilder: FormBuilder, private playerService: PlayersService) {    
    this.searchForm = this.formBuilder.group({
    search: ''
  }); }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });

  }

  logout(){
    this.userService.logout()
  }

  onSubmit() {
    this.player_search(this.searchForm.value.search);
    
  }

  player_search(query: string) {
    if(query.length < 3){
      this.searchResults= [{'full_name':'Sigue escribiendo para tener más resultados', 'id':null}];
    }else{
      this.playerService.findPlayer(query).subscribe(res=>
        {console.log(res)
          this.searchResults= res.players;
          this.showResults = true;
        }
      )
    }
  }
  closeResults() {
    // Cerrar los resultados cuando haces clic en el botón
    this.showResults = false;
  }

}
