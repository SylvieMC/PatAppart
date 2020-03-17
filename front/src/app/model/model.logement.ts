export class Logement {
  constructor(
      public id?: number,
      public adresse?: string,
      public code_postal?: string,
      public departement?: string,
      public description?: string,
      public date_debut?: Date,
      public date_fin?: Date,
      public photo_url?: string,
  ) {}
}
