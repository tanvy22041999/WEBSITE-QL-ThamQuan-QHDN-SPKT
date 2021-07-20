import { Nganh } from 'src/app/core/models/categories/nganh.model';
export class SinhVien {
  id: string;
  maSV: string;
  hoTen: string;
  email: string;
  lop: string;
  cmnd: string;
  gioiTinh: boolean;
  dienThoai: string;
  nganh: Nganh;
  ngaySinh: Date;
  password: string;
  trangThai: boolean;
}


export class FilterSinhVien {
  email: string;
  hoTen: string;
  nganh: string;
  maSV: string;
  khoa: string;
  constructor() {
    this.email = '';
    this.hoTen = '';
    this.nganh = '';
    this.maSV = '';
    this.khoa = '';
  }
}
