import { faker } from '@faker-js/faker';
import { MarkedItem } from './CustomMap';

// implements ist optional, hilft bei besseren Fehleranzeigen und Code besser zu verstehen für andere
export class Company implements MarkedItem {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'green';

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return this.companyName + ': ' + this.catchPhrase;
  }
}
