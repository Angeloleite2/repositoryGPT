export type City = { name: string; country: string; lat: number; lng: number };

export const cities: City[] = [
  // Argentina
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  { name: "Ramallo", country: "Argentina", lat: -33.4833, lng: -60.0 },
  { name: "San Nicolás", country: "Argentina", lat: -33.335, lng: -60.211 },
  { name: "Villa Constitución", country: "Argentina", lat: -33.227, lng: -60.328 },
  { name: "Ibicuy", country: "Argentina", lat: -33.736, lng: -59.169 },
  { name: "Concepción del Uruguay", country: "Argentina", lat: -32.484, lng: -58.232 },
  { name: "Puerto Gral. San Martín", country: "Argentina", lat: -32.717, lng: -60.733 },
  { name: "Lima", country: "Argentina", lat: -34.0397, lng: -59.198 },
  { name: "Rosario", country: "Argentina", lat: -32.9442, lng: -60.6505 },
  // Brasil
  { name: "Campo Grande", country: "Brasil", lat: -20.4486, lng: -54.6295 },
  { name: "Porto Murtinho", country: "Brasil", lat: -21.7, lng: -57.8833 },
  // Paraguay
  { name: "Asunción", country: "Paraguay", lat: -25.2637, lng: -57.5759 },
  { name: "Villeta", country: "Paraguay", lat: -25.5097, lng: -57.5544 },
  // Uruguay
  { name: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645 },
  { name: "Nueva Palmira", country: "Uruguay", lat: -33.8717, lng: -58.4117 },
  { name: "Punta del Arenal", country: "Uruguay", lat: -33.1, lng: -58.35 },
  // España
  { name: "Madrid", country: "España", lat: 40.4168, lng: -3.7038 },
  { name: "Cádiz", country: "España", lat: 36.5298, lng: -6.2924 },
  { name: "Motril", country: "España", lat: 36.7459, lng: -3.5184 },
  // Netherlands
  { name: "Rotterdam", country: "Netherlands", lat: 51.9244, lng: 4.4777 },
];
