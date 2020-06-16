import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CompteComponent } from './compte/compte.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { EditanimalComponent } from './editanimal/editanimal.component';
import { EditprofilComponent } from './editprofil/editprofil.component';
import { PetsittersComponent } from './petsitters/petsitters.component';
import { ContactComponent } from './contact/contact.component';


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
    path: 'petsitters',
    component: PetsittersComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'editAnimal',
    component: EditanimalComponent
  },
  {
    path: 'editProfil',
    component: EditprofilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
