export class BreadCrumb {
  heading: string;
  listBreadcrumb: Array<{ title: string; link: string }>;
  constructor(initObj: {
    heading: string;
    listBreadcrumb: Array<{ title: string; link: string }>;
  }) {
    this.heading = initObj.heading;
    this.listBreadcrumb = initObj.listBreadcrumb;
  }
}
