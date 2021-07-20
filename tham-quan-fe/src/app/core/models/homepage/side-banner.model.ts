import { SafeResourceUrl } from '@angular/platform-browser';

export class SideBanner {
  fileSideBanner: string;
  id: string;
  thuTu: number;
  tieuDe: string;
  lienKetNgoai: string;
  trangThai: boolean;
}

export class SideBannerView {
  [key: string]: SafeResourceUrl;
}
