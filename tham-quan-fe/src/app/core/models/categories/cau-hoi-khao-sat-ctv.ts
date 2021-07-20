import { KetQuaKhaoSat } from './cau-hoi-khao-sat-doanh-nghiep';

export class CauHoiKhaoSatCTV {
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


export class KetQuaKhaoSatCTVDto {
  chuyenThamQuan: string;
  ketQuaKhaoSats: KetQuaKhaoSat[];
}

// export class SubmitDataCauTraLoiDto {
//   chuyenThamQuan: string;
//   cauTraLois: SubmitKetQuaKhaoSatDoanhNghiepDto[];
// }
