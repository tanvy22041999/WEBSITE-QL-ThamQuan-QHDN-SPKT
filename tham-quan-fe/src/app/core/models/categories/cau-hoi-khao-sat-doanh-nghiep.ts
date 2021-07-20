
export class CauHoiKhaoSatDoanhNghiep {
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


export class KetQuaKhaoSatDoanhNghiepDto {
  chuyenThamQuan: string;
  ketQuaKhaoSats: KetQuaKhaoSat[];
}

export class KetQuaKhaoSat {
  cauHoiKhaoSat: string;
  cauTraLoi: string[];
}
// export class SubmitDataCauTraLoiDto {
//   chuyenThamQuan: string;
//   cauTraLois: SubmitKetQuaKhaoSatDoanhNghiepDto[];
// }
