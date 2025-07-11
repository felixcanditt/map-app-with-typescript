export interface MarkedItem {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  // private verhindert, dass in index.ts googleMap aufgerufen werden kann
  // zb um zu vermeiden dass andere Methoden von google.maps.Map aufgerufen werden als gewünscht
  // googleMap kann nur innerhalb der class CustomMap aufgerufen werden
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  // Version 1: 2 einzelne Funktionen
  // Nachteil: doppelter Code für gleiche Funktion

  // addUserMarker(user: User): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: user.location.lat,
  //       lng: user.location.lng,
  //     },
  //   });
  // }

  // addCompanyMarker(company: Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng,
  //     },
  //   });
  // }

  // Version 2: refactoring von Udemy, eine Funktion mit User | Company
  // Nachteil: bei weiteren markedItem zb CarLot, Park etc, wird der Code sehr lang
  //
  // addMarker(markedItem: User | Company): void {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: markedItem.location.lat,
  //       lng: markedItem.location.lng,
  //     },
  //   });
  // }

  // Version 3: eine Funktion mit Interface
  // jedes markedItem, das dem Interface MarkedItem entspricht, kann benutzt werden
  // ich bin selbst auf die Lösung gekommen und sie ist auch die vorgeschlagene Lösung von Udemy <3

  addMarker(markedItem: MarkedItem): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: markedItem.location.lat,
        lng: markedItem.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: markedItem.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
