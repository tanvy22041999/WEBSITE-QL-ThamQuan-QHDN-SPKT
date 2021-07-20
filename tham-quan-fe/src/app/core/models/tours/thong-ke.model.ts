/* eslint-disable @typescript-eslint/ban-types */
import { DoanhNghiep } from '../categories/doanh-nghiep.model';
import { Khoa } from '../categories/khoa.model';
import { CongTacVien } from '../users/cong-tac-vien.model';
import { GiangVien } from '../users/giang-vien.model';

export class ThongKe{
  tenDN: DoanhNghiep[];
  diaChi: DoanhNghiep[];
  ngayThamQuan: Date;
  giangVien: GiangVien;
  khoa: Khoa;
  soLuongSV: Number;
  soLuongGV: Number;
  congTacVien: CongTacVien;
  time: string;
}
