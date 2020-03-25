export class Animal {
  constructor(
      public id?: number,
      public nom?: string,
      public type_animal?: string,
      public race?: string,
      public description?: string,
      public date_de_naissance?: Date,
      public photo_url?: string,
      public logement_id?: number,
      public utilisateur_id?: number
  ) {}
}
