/* eslint-disable @typescript-eslint/naming-convention */
export class SystemConstant {
  public static CURRENT_INFO = 'CURRENT_INFO';
  public static CURRENT_INFO_GOOGLE = 'CURRENT_INFO_GOOGLE';

  public static CkEditorCfg = {
    toolbar: {
      items: [
        'heading',
        '|',
        'alignment',
        'bold',
        'italic',
        'underline',
        'link',
        'bulletedList',
        'numberedList',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        '|',
        'outdent',
        'indent',
        '|',
        'imageInsert',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'subscript',
        'superscript',
        'strikethrough'
      ]
    },
    language: 'vi',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    licenseKey: '',
  };

  public static ACTION = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW: 'view',
  };

  public static ROLE = {
    ADMIN: 'ROLE_ADMIN',
    LECTURER: 'ROLE_GIANG_VIEN',
    STUDENT: 'ROLE_SINH_VIEN',
    GUIDE: 'ROLE_CONG_TAC_VIEN',
    BUSINESS: 'ROLE_DOANH_NGHIEP',
  };

  public static TRANG_THAI_CHUYEN_THAM_QUAN = {
    GIANG_VIEN_CHUA_CO_CONG_TY: 'GIANG_VIEN_CHUA_CO_CONG_TY', // Giảng viên đăng ký chuyến nhưng chưa có công ty để thăm quan
    GIANG_VIEN_DA_CHON_CONG_TY: 'GIANG_VIEN_DA_CHON_CONG_TY', // Giảng viên đã chọn công ty nhưng chưa liên hệ
    GIANG_VIEN_DA_LIEN_HE_CONG_TY: 'GIANG_VIEN_DA_LIEN_HE_CONG_TY', // Giảng viên đã liên hệ trước với công ty
    DA_LIEN_HE_CONG_TY: 'DA_LIEN_HE_CONG_TY', // Admin đã liên hệ công ty
    DANG_XU_LY: 'DANG_XU_LY', //
    // DA_DUYET: 'DA_DUYET', // Admin xác nhận thông tin chuyến thăm quan với cty
    // CHO_DUYET: 'CHO_DUYET', // Chờ Ban Giám Hiệu duyệt cho phép đi
    SAN_SANG: 'SAN_SANG', // Đầy đủ thông tin + Ban Giám Hiệu đã duyệt
    HUY: 'HUY', // Chuyến thăm quan bị hủy
    HOAN_TAT: 'HOAN_TAT', // Kết thúc chuyến tham quan
  };

  public static TRANG_THAI_CHUYEN_THAM_QUAN_TITLE = [
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_CHUA_CO_CONG_TY,
      title: { en: 'No Company', vi: 'Chưa có Công ty' }
    },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_CHON_CONG_TY,
      title: { en: 'Have Company', vi: 'Đã có Công ty' }
    },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.GIANG_VIEN_DA_LIEN_HE_CONG_TY,
      title: { en: 'Contacted Company', vi: 'Đã liên hệ Công ty' }
    },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DANG_XU_LY,
      title: { en: 'Processing', vi: 'Đang xử lý' }
    },
    // { id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.DA_DUYET,
    //   title: { en: 'Approved', vi: 'Đã duyệt' } },
    // { id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.CHO_DUYET,
    //   title: { en: 'Wait for approve', vi: 'Chờ duyệt' } },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.SAN_SANG,
      title: { en: 'Ready', vi: 'Sẵn sàng' }
    },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HOAN_TAT,
      title: { en: 'Done', vi: 'Hoàn tất' }
    },
    {
      id: SystemConstant.TRANG_THAI_CHUYEN_THAM_QUAN.HUY,
      title: { en: 'Cancelled', vi: 'Đã huỷ' }
    },
  ];

  public static HOME_POST_STATUS = {
    NEW: 'BAI_VIET_MOI',
    THONG_BAO: 'THONG_BAO',
  };

  public static LIST_POST_TYPE = {
    THONG_BAO: 'THONG_BAO',
    CONG_TY: 'CONG_TY,'
    // CAC_HOAT_DONG_NOI_BAT: 'CAC_HOAT_DONG_NOI_BAT',
    // HOC_BONG: 'HOC_BONG',
    // THONG_TIN_TONG_HOP: 'THONG_TIN_TONG_HOP',
    // TUYEN_DUNG_THUC_TAP: 'TUYEN_DUNG_THUC_TAP',
    // VIDEO: 'VIDEO',
  };

  public static LIST_POST_TYPE_TITLE = {
    en: [
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_BAO,
        title: 'Announcements'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.CONG_TY,
        title: 'Business',
      },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.HOC_BONG,
      //   title: 'Scholarship'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP,
      //   title: 'General news'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP,
      //   title: 'Recruitment & Internship'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.VIDEO,
      //   title: 'Videos'
      // },
    ],
    vi: [
      {
        id: SystemConstant.LIST_POST_TYPE.THONG_BAO,
        title: 'Thông báo'
      },
      {
        id: SystemConstant.LIST_POST_TYPE.CONG_TY,
        title: 'Giới thiệu công ty'
      },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.HOC_BONG,
      //   title: 'Học bổng'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP,
      //   title: 'Thông tin tổng hợp'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP,
      //   title: 'Tuyển dụng & Thực tập'
      // },
      // {
      //   id: SystemConstant.LIST_POST_TYPE.VIDEO,
      //   title: 'Video'
      // },
    ],
    langData: {
      // using for fast get, improving perfomnace
      en: {
        [SystemConstant.LIST_POST_TYPE.THONG_BAO]: 'Announcements',
        [SystemConstant.LIST_POST_TYPE.CONG_TY]: 'Business',
        // [SystemConstant.LIST_POST_TYPE.HOC_BONG]: 'Scholarship',
        // [SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP]: 'General news',
        // [SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP]: 'Recruitment & Internship',
        // [SystemConstant.LIST_POST_TYPE.VIDEO]: 'Videos',
      },
      vi: {
        [SystemConstant.LIST_POST_TYPE.THONG_BAO]: 'Thông báo',
        [SystemConstant.LIST_POST_TYPE.CONG_TY]: 'Giới thiệu công ty',
        // [SystemConstant.LIST_POST_TYPE.HOC_BONG]: 'Học bổng',
        // [SystemConstant.LIST_POST_TYPE.THONG_TIN_TONG_HOP]: 'Thông tin tổng hợp',
        // [SystemConstant.LIST_POST_TYPE.TUYEN_DUNG_THUC_TAP]: 'Tuyển dụng & Thực tập',
        // [SystemConstant.LIST_POST_TYPE.VIDEO]: 'Video',
      }
    }
  };

}
