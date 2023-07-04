export interface Event {
  id: string;
  date: string;
  descId: string;
  descEn: string;
  name: string;
  openingId: string;
  openingEn: string;
  foto: string[];
}

export interface UpcomingEvent {
  event: Event;
  itemCount: number;
  fotoItem: string[];
}

export interface Barang {
  id: string;
  lot: string;
  namaBarang: string;
  foto: string[];
  tahunPembuatan: number;
  asalDaerah: string;
  descId: string;
  descEn: string;
  priceRange: [number, number];
  size: [number, number];
  tipe: string;
  eventID: string;
  dyeType: string;
  hargaAwal: number;
  urlThumbnail: string[];
  isAvailable: boolean;
}

export interface BarangEvent {
  [key: string]: {
    event: Event;
    barang: Barang[];
  };
}
