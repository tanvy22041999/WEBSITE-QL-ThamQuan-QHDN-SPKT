import { SinhVien } from './../users/sinh-vien.model';
export class SinhVienThamQuan {
  sinhVien: SinhVien;
  soPhutDiTre: number;
  //Số phút sinh viên đi trễ, điểm danh sau thời gian bắt đầu tham quan
  thoiGianDiemDanh: Date;
  trangThai: boolean;
  //Sinh viên tham dự hay vắng mặt
}
