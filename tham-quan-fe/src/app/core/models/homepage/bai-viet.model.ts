export class BaiViet {
  id: string;
  loaiBaiViet: string;
  fileAnhBia: string;
  createdDate: Date;
  tieuDe: string;
  noiDung: string;
  thuTu: number;
  trangThai: boolean;

  constructor() {
    this.id = '';
  }
}

export class ListBaiVietHomePage {
  [key: string]: BaiViet[];
}
