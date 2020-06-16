import { Component, OnInit } from '@angular/core';
import { Logement } from '../model/model.logement';
import { DataService } from '../services/data.service';
import { forkJoin } from 'rxjs';
import { Utilisateur } from '../model/model.utilisateur';
import { LogementView } from '../model/view/model.logementView';
import { Animal } from '../model/model.animal';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  logements: Array<Logement> = [];
  utilisateurs: Array<Utilisateur> = [];
  animals: Array<Animal> = [];
  logementViews: Array<LogementView> = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getAllLogements();
  }

  private getAllLogements(): void {
      forkJoin(
        this.dataService.getAllLogements(),
        this.dataService.getAllUtilisateurs(),
        this.dataService.getAllAnimals()
      ).subscribe(response => {
           this.logements = response[0].body as Array<Logement>;
           this.utilisateurs = response[1].body as Array<Utilisateur>;
           this.animals = response[2].body as Array<Animal>;
         console.table(this.logements);
          this.logementViews = this.mapToLogementsView(this.logements, this.utilisateurs, this.animals);
      })
  }


  private mapToLogementsView(logements: Array<Logement>, utilisateurs: Array<Utilisateur>, animals: Array<Animal>): Array<LogementView> {
     const logementsView = [];

     logements.forEach(logement => {
        const utilisateur = this.findUtilisateur(utilisateurs, logement.utilisateur_id);

        const typeAnimal = utilisateur ? this.findTypeAnimal(logement.id, utilisateur.id) : '';
        if (!utilisateur) {
          console.log('L\'utilisateur n\'existe pas');
        }

        const logementView = {
          id: logement.id,
          adresse: logement.adresse,
          code_postal: logement.code_postal,
          departement: logement.departement,
          description: logement.description,
          date_debut: logement.date_debut,
          date_fin: logement.date_fin,
          photo_url: logement.photo_url,
          userName: utilisateur && utilisateur.login ? utilisateur.login : '',
          typeAnimal: typeAnimal ? typeAnimal : ''
        };
          logementsView.push(logementView);
      });

      return logementsView;
  }

  private findUtilisateur(utilisateurs: Array<Utilisateur>, utilisateurId: number): Utilisateur {
    return utilisateurs.find(utilisateur => utilisateur.id === utilisateurId);
  }

  private findTypeAnimal(logementId: number, utilisateurId): string {
    const animal = this.animals.find(animal => animal.logement_id === logementId && animal.utilisateur_id === utilisateurId);
    return animal ? animal.type_animal : null;
  }


}
