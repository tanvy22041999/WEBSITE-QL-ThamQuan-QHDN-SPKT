export class Paginate<T> {
  totalPage?: number;
  totalItem?: number;
  limit: number;
  currentPage: number;
  data?: T[] = [];

  constructor() {
    this.currentPage = 1;
    this.totalPage = 1;
    this.totalItem = 0;
    this.limit = 10;
  }
}
