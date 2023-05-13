import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayerComparisonComponent } from './player-comparison/player-comparison.component';
const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:teamId/players', component: TeamPlayersComponent },
  { path: 'player-comparison', component: PlayerComparisonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
