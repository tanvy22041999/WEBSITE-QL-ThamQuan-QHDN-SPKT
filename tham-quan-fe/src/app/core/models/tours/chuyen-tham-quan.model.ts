import { DiaDiem } from './../categories/dia-diem.model';
import { CongTacVien } from './../users/cong-tac-vien.model';
import { PhuongTien } from './../categories/phuong-tien.model';
import { DoanhNghiep } from 'src/app/core/models/categories/doanh-nghiep.model';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { SinhVien } from '../users/sinh-vien.model';
import { GiangVien } from '../users/giang-vien.model';
export class ChuyenThamQuan {
  id: string;
  tenChuyenThamQuan: string;
  thoiGianKhoiHanh: Date;
  diaDiemKhoiHanh: DiaDiem;
  noiDungThamQuan: string;
  phuongTien: PhuongTien[];
  dotThamQuan: DotThamQuan;
  doanhNghiep: DoanhNghiep;
  thoiGianBatDauThamQuan: Date;
  thoiGianKetThucThamQuan: Date;
  danhSachSinhViens: SinhVien[];
  congTacViens: CongTacVien[];
  phuCapCongTacVien: number;
  kinhPhi: number;
  thueXeNgoaiTruong: boolean;
  giangVienDangKy: GiangVien;
  trangThai: string;
  duyet?: boolean;
  lyDoKhongDuyet?: string;
  duongDan: string;
  fileKeHoach: string;
  fileXacNhan: string;
}


export class FilterChuyenThamQuan {

  congTacVien: string;
  trangThai: string[];
  doanhNghiep: string;
  dotThamQuan: string;
  giangVien: string;
  hocKy: string;
  namHoc: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;

  constructor() {
    this.congTacVien = '';
    this.trangThai = [];
    this.doanhNghiep = '';
    this.dotThamQuan = '';
    this.giangVien = null;
    this.hocKy = '';
    this.namHoc = '';
    this.thoiGianBatDau = null;
    this.thoiGianKetThuc = null;
  }

}

