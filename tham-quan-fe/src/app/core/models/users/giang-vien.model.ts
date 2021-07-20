import { HocHam } from '../categories/hoc-ham.model';
import { HocVi } from '../categories/hoc-vi.model';
import { Khoa } from '../categories/khoa.model';
import { Nganh } from '../categories/nganh.model';
import { LinhVuc } from '../categories/linh-vuc.model';

export class GiangVien {
  chucDanhKhoaHoc: string;
  email: string;
  dienThoai: string;
  gioiTinh: boolean;
  //Nữ : 1; Nam: 0
  hoTen: string;
  hocHam: HocHam;
  hocVi: HocVi;
  id: string;
  khoa: Khoa;
  linhVucs: LinhVuc[];
  maGiangVien: string;
  nganh: Nganh;
  roles: string[];
  thinhGiang: boolean;
  trangThai: boolean;
}

export class FilterGiangVien {
  khoa: string;
  linhVuc: string;
  nganh: string;
  search: string;
  constructor() {
    this.khoa = '';
    this.linhVuc = '';
    this.nganh = '';
    this.search = '';
  }
}
