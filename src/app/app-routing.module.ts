import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayerComparisonComponent } from './player-comparison/player-comparison.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { RegisterComponent } from './register/register.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { PlayerComponent } from './player/player.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:teamId/players', component: TeamPlayersComponent },
  { path: 'player-comparison', component: PlayerComparisonComponent },
  { path: 'games', component: GamesComponent },
  {path: 'game/:gameId', component: GamesDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: 'player/:playerId', component: PlayerComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
