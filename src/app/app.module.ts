import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerComparisonComponent } from './player-comparison/player-comparison.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LocalStorageService } from './local-storage.service';
import { SeasonsComponent } from './seasons/seasons.component';
import { PlayerComponent } from './player/player.component';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    GamesDetailComponent,
    SeasonsComponent,
    PlayerComponent,
    RatingDialogComponent
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
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
