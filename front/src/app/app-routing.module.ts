import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CompteComponent } from './compte/compte.component';
import { AddlocationComponent } from './addlocation/addlocation.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'compte',
    component: CompteComponent
  },
  {
    path: 'addlocation',
    component: AddlocationComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
