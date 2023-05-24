import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerComparisonComponent } from './player-comparison/player-comparison.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewsComponent } from './news/news.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GamesDetailComponent } from './games-detail/games-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamPlayersComponent,
    NavbarComponent,
    PlayerComparisonComponent,
    NewsComponent,
    GamesComponent,
    LoginComponent,
    RegisterComponent,
    GamesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    MatTableModule, 
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
