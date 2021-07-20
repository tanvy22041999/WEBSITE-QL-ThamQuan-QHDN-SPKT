import { SafeResourceUrl } from '@angular/platform-browser';
import { DotThamQuan } from 'src/app/core/models/categories/dot-tham-quan.model';
import { DiaDiem } from '../categories/dia-diem.model';
import { DoanhNghiep } from '../categories/doanh-nghiep.model';
import { PhuongTien } from '../categories/phuong-tien.model';
import { GiangVien } from '../users/giang-vien.model';
import { CongTacVienDanDoan } from './cong-tac-vien-dan-doan.model';
import { SinhVienThamQuan } from './sinh-vien-tham-quan.model';

export class ChuyenThamQuan {
  congTacViens: CongTacVienDanDoan[];
  danhSachSinhViens: SinhVienThamQuan[];
  diaDiemKhoiHanh: DiaDiem;
  doanhNghiep: DoanhNghiep;
  dotThamQuan: DotThamQuan;
  duongDan: string;

  fileXacNhanDuyetTuBanGiamHieu: string;
  fileScanGiayXacNhanDoanhNghiep: string;
  fileScanKeHoach: string;
  giangVienDangKy: GiangVien;
  id: string;
  kinhPhi: number; //Tổng kinh phí chuyến thăm quan, bao gồm cả thuê xe ngoài nếu có
  noiDungThamQuan: string;
  phuCapCongTacVien: number; //Admin điều chỉnh khi cần thiết, mặc định lấy từ cấu hình hệ thống
  phuongTien: PhuongTien[];
  tenChuyenThamQuan: string;
  thoiGianBatDauThamQuan: Date;
  //Thời gian thăm quan được tạo sau khi liên hệ với công ty, nếu giảng viên đã liên hệ trước thì cho chọn thời gian

  //Thời gian cộng tác viên checkin khi đến công ty
  thoiGianDuKien: Date;
  //Thời gian giảng viên đăng ký tham quan dự kiến, tối thiểu trước thời gian cài đặt trong hệ thống
  thoiGianKetThucThamQuan: Date;
  //Thời gian kết thúc chuyến thăm quan (dự kiến)
  thoiGianKhoiHanh: Date;
  //Thời gian cộng tác viên checkout khi rời công ty
  thuTu: number; //Số thứ tự của chuyến thăm quan, tự tăng theo đợt
  thueXeNgoaiTruong: boolean;
  trangThai: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chuyenThamQuan: any; // ???
  thucHienKhaoSat: boolean;
  lyDoKhongDuyet: string;
}

export class FilterChuyenThamQuan {

  trangThai: string[];
  chuyenMoi: boolean;
  congTacVien: string;
  doanhNghiep: string;
  dotThamQuan: string;
  giangVien: string;
  hocKy: string;
  namHoc: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;

  constructor() {
    this.congTacVien = null;
    this.trangThai = [];
    this.doanhNghiep = null;
    this.dotThamQuan = null;
    this.giangVien = null;
    this.hocKy = null;
    this.namHoc = null;
    this.thoiGianBatDau = null;
    this.thoiGianKetThuc = null;
  }

}

export class SaoLuuChuyenThamQuan {
  id: string;
  chuyenThamQuan: ChuyenThamQuan[];
  xacNhanCuaDoanhNghiep: string;
  anhChuyenThamQuan: [];
  trangThai: boolean;
}


export class RequestChuyenThamQuan {
  dotThamQuan: DotThamQuan;
  chuyenThamQuans: string[];
}

export class LuuTruHoSo {
  duongDan: string;
  fileKeHoach: string;
  fileXacNhan: string;
}

export class FileView {
  [key: string]: SafeResourceUrl;
}
