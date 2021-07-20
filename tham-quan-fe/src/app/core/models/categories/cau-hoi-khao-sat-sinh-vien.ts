
import { KetQuaKhaoSat } from "./cau-hoi-khao-sat-doanh-nghiep";

export class CauHoiKhaoSatSinhVien {
  id?: string;
  cauHoi: string;
  loaiCauHoi: string;
  luaChonToiDa: number;
  danhSachLuaChon: string[];
  thuTu: number;
  trangThai: boolean;
  cauHoiBatBuoc: boolean;
  cauTraLoi?: string[]; // FE only
  cauTraLoiMulti?: { [key: string]: boolean }; // FE only
  cauTraLoiSingle?: string; // FE only
}


export class KetQuaKhaoSatSinhVienDto {
  chuyenThamQuan: string;
  ketQuaKhaoSats: KetQuaKhaoSat[];
}
