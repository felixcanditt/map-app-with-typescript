import { faker } from '@faker-js/faker';
import { MarkedItem } from './CustomMap';

// implements ist optional, hilft bei besseren Fehleranzeigen und Code besser zu verstehen für andere
export class User implements MarkedItem {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'red';

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return this.name;
  }
}
