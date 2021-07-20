import { CauHoiKhaoSatDoanhNghiep } from '../categories/cau-hoi-khao-sat-doanh-nghiep';
import { CauHoiKhaoSatSinhVien } from '../categories/cau-hoi-khao-sat-sinh-vien';

export class ThongKe {
  name: string;
  value: number;
}

export class ThongKeMulti {
  name: string;
  series: ValueMulti[];
}

export class ValueMulti {
  name: string;
  value: number;
}

export class KetQuaKhaoSatDoanhNghiepLoaiCauHoiNhapLieu{
  cauHoi: CauHoiKhaoSatDoanhNghiep;
  cauTraLoi: string[];
}
export class KetQuaKhaoSatDoanhNghiepLoaiCauHoiLuaChon{
  cauHoi: CauHoiKhaoSatDoanhNghiep;
  soLuotTraLoi: SoLuotTraLoi[];
}
export class KetQuaKhaoSatDoanhNghiepLoaiCauHoiSapXep{
  cauHoi: CauHoiKhaoSatDoanhNghiep;
  cauTraLoi: CauTraLoi[];
}
export class KetQuaKhaoSatSinhVienLoaiCauHoiNhapLieu{
  cauHoi: CauHoiKhaoSatSinhVien;
  cauTraLoi: string[];
}
export class KetQuaKhaoSatSinhVienLoaiCauHoiLuaChon{
  cauHoi: CauHoiKhaoSatSinhVien;
  soLuotTraLoi: SoLuotTraLoi[];
}
export class KetQuaKhaoSatSinhVienLoaiCauHoiSapXep{
  cauHoi: CauHoiKhaoSatSinhVien;
  cauTraLoi: CauTraLoi[];
}
export class KetQuaKhaoSatCongTacVienloaiCauHoiNhapLieu{
  cauHoi: CauHoiKhaoSatSinhVien;
  cauTraLoi: string[];
}
export class KetQuaKhaoSatCongTacVienLoaiCauHoiLuaChon{
  cauHoi: CauHoiKhaoSatSinhVien;
  soLuotTraLoi: SoLuotTraLoi[];
}
export class KetQuaKhaoSatCongTacVienLoaiCauHoiSapXep{
  cauHoi: CauHoiKhaoSatSinhVien;
  cauTraLoi: CauTraLoi[];
}
export class SoLuotTraLoi{
  cauTraLoi: string;
  soLuotTraLoi: number;
  tiLe: number;
}
export class CauTraLoi{
  dapAn: string;
  thuTuUuTiens: ThuTuUuTien[];
}
export class ThuTuUuTien{
  thuTuUuTien: number;
  soLuotChon: number;
}
