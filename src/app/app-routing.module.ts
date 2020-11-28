import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DietsComponent} from './pages/diets/diets.component';
import {NutricionistsComponent} from './pages/nutricionists/nutricionists.component';
import {NutricionistComponent} from './pages/nutricionist/nutricionist.component';

const routes: Routes = [
  { path: '', component: HomeComponent},

  { path: 'nutricionists', component: NutricionistsComponent },
  { path: 'nutricionists/new', component: NutricionistComponent },
  { path: 'nutricionists/:id', component: NutricionistComponent },

  { path: 'diets', component: DietsComponent },

  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
