import { LinhVuc } from 'src/app/core/models/categories/linh-vuc.model';
export class DoanhNghiep {
  id: string;
  email: string;
  hoTen: string;
  gioiTinh: boolean;
  dienThoai: string;
  congTy: string;
  diaChi: string;
  diaChiEn: string;
  maSoThue: string;
  linhVucs: LinhVuc[];
  roles: string[];
  trangThai: boolean;
}
