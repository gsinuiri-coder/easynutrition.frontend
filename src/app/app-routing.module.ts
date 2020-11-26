import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressComponent } from './pages/progress/progress.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent} from './pages/profile/profile.component';
import { DietsComponent} from './pages/diets/diets.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'diets', component: DietsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
