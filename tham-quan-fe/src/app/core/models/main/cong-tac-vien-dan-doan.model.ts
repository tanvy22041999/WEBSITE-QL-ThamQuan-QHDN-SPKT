import { CongTacVien } from "../users/cong-tac-vien.model";
import { Gps } from "./gps-checkin.model";

export class CongTacVienDanDoan {
  congTacVien: CongTacVien;
  ngayDangKy: Date;
  ngayDuyet: Date;
  fileCheckIn: string;
  fileCheckOut: string;
  thoiGianDenCongTy: Date;
  thoiGianRoiCongTy: Date;
  gpsCheckIn: Gps;
  gpsCheckOut: Gps;
  nguoiDangKy: string;
  trangThai: boolean;
}

export class CheckinCheckoutDto {
  file: string;
  kinhDo: string;
  viDo: string;
}


