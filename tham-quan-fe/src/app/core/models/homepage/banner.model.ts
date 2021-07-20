import { SafeResourceUrl } from '@angular/platform-browser';

export class Banner {
  fileBanner: string;
  id: string;
  thuTu: number;
  tieuDe: string;
  lienKetNgoai: string;
  trangThai: boolean;
}

export class BannerView {
  [key: string]: SafeResourceUrl;
}
