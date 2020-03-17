import { Component, OnInit } from '@angular/core';
import { Logement } from '../model/model.logement';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  logements: Array<Logement> = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getAllLogements();
  }

  private getAllLogements(): void {
     this.dataService.getAllLogements()
         .subscribe(logementsResponse => {
             this.logements = logementsResponse.body as Array<Logement>;
         }, error => {
           console.log(error);
         })
  }


}
