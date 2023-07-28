export interface ILocation {
    id: number;
    region: string;
    city: string;
    secteur: string;
    longitude: number;
    latitude: number;
  };
  export interface ILocationList extends ILocation {
      dateCreated: any
  };