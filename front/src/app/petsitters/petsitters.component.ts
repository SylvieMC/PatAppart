import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { Utilisateur } from '../model/model.utilisateur';

@Component({
  selector: 'app-petsitters',
  templateUrl: './petsitters.component.html',
  styleUrls: ['./petsitters.component.scss']
})
export class PetsittersComponent implements OnInit {
  utilisateurs: Array<Utilisateur> = [];
  panelOpenState = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getAllUtilisateurs();
  }
  private getAllUtilisateurs(): void {
    forkJoin(
      this.dataService.getAllUtilisateurs()
    ).subscribe(response => {
         this.utilisateurs = response[0].body as Array<Utilisateur>;
       console.table(this.utilisateurs);
    })
}
}
