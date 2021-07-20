/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';

export const UrlConstant = {
  API: {
    // File
    FILE: environment.serverUrl + 'rest/file',

    // Main
    LOGIN_ADMIN: environment.serverUrl + 'rest/login/admin',
    LOGIN_LECTURER: environment.serverUrl + 'rest/login/giang-vien',
    LOGIN_STUDENT: environment.serverUrl + 'rest/login/sinh-vien',
    LOGIN_GUIDE: environment.serverUrl + 'rest/login/cong-tac-vien',
    LOGIN_BUSINESS: environment.serverUrl + 'rest/login/doanh-nghiep',

    CHUYEN_THAM_QUAN: environment.serverUrl + 'rest/chuyen-tham-quan',
    // Catalog
    ACADEMIC_RANKS: environment.serverUrl + 'rest/hoc-ham',
    DEGREE_RANKS: environment.serverUrl + 'rest/hoc-vi',
    RESEARCH_DOMAINS: environment.serverUrl + 'rest/linh-vuc',
    FACULTIES: environment.serverUrl + 'rest/khoa',
    MAJORS: environment.serverUrl + 'rest/nganh',
    LOCATIONS: environment.serverUrl + 'rest/dia-diem',
    TOUR_TIMES: environment.serverUrl + 'rest/dot-tham-quan',
    BUSINESS: environment.serverUrl + 'rest/doanh-nghiep',
    VEHICLE: environment.serverUrl + 'rest/phuong-tien',
    DOCUMENTS: environment.serverUrl + 'rest/van-ban-bieu-mau',

    //Users
    STUDENTS: environment.serverUrl + 'rest/sinh-vien',
    //Setting
    COMMON_SETTINGS: environment.serverUrl + 'rest/cau-hinh-he-thong',
    TOURS: environment.serverUrl + 'rest/chuyen-tham-quan',

    // Users
    MANAGEMENT_COLLABORATOR: environment.serverUrl + 'rest/cong-tac-vien',
    MANAGEMENT_EXPERT: environment.serverUrl + 'rest/tai-khoan',
    MANAGEMENT_LECTURERS: environment.serverUrl + 'rest/giang-vien',
    ACCOUNTS: environment.serverUrl + 'rest/tai-khoan',

    FILE_MANUALS: environment.serverUrl + 'rest/file-huong-dan',


    //Survey
    SURVEY_STUDENT: environment.serverUrl + 'rest/cau-hoi-khao-sat-sinh-vien',
    SURVEY_BUSINESS: environment.serverUrl + 'rest/cau-hoi-khao-sat-doanh-nghiep',
    SURVEY_GUIDE: environment.serverUrl + 'rest/cau-hoi-khao-sat-cong-tac-vien',
    RESULT_SURVEY_BUSINESS: environment.serverUrl + 'rest/ket-qua-khao-sat-doanh-nghiep',
    RESULT_SURVEY_GUIDE: environment.serverUrl + 'rest/ket-qua-khao-sat-cong-tac-vien',
    RESULT_SURVEY_STUDENT: environment.serverUrl + 'rest/ket-qua-khao-sat-sinh-vien',

    // Homepage
    POSTS: environment.serverUrl + 'rest/bai-viet',
    BANNER: environment.serverUrl + 'rest/banner',
    SIDE_BANNER: environment.serverUrl + 'rest/side-banner',

    STATISTICS: environment.serverUrl + 'rest/thong-ke',
  },

  ROUTE: {
    LOGIN: '/login',
    MAIN: {
      HOME: '/',
      WORK_STUDENT: '/work-student',
      WORK_BUSINESS: '/work-business',
      WORK_LECTURE: '/work-lecture',
      WORK_GUIDE: '/work-guide',
    },
    MANAGEMENT: {
      DASHBOARD: '/management/dashboard',

      CATEGORIES: '/management/categories',
      ACADEMIC_RANKS: '/management/categories/academic-ranks',
      DEGREE_RANKS: '/management/categories/degree-ranks',
      RESEARCH_DOMAINS: '/management/categories/research-domains',
      FACULTIES: '/management/categories/faculties',
      MAJORS: '/management/categories/majors',
      LOCATIONS: '/management/categories/locations',
      TOUR_TIMES: '/management/categories/tour-times',
      DOCUMENTS: '/management/categories/documents',

      BUSINESS: '/management/categories/business',
      VEHICLE: '/management/categories/vehicle',
      SURVEY_STUDENT: '/management/categories/student-survey-questions',
      SURVEY_BUSINESS: '/management/categories/business-survey-questions',
      SURVEY_GUIDE: '/management/categories/guide-survey-questions',

      CAU_HINH: '/management/settings',
      COMMON_SETTINGS: '/management/settings/common',
      DANG_KY_CHUYEN_THAM_QUAN: '/register/guide',

      USERS: '/management/users',
      MANAGEMENT_USERS: '/management/users',
      MANAGEMENT_STUDENTS: '/management/users/students',
      MANAGEMENT_COLLABORATOR: '/management/users/guides',
      MANAGEMENT_EXPERT: '/management/users/experts',
      MANAGEMENT_LECTURES: '/management/users/lecturers',

      TOURS: '/management/tours',
      MANAGE_TOURS: '/management/tours/manage',
      TOURS_TIMELINE: '/management/tours/timeline',
      // admin-tour -> tour
      BACKUP_TOURS: '/management/tours/archived',

      FILE_MANUALS: '/management/settings/manuals',

      HOMEPAGE: '/management/homepage',
      BANNER: '/management/homepage/banner',
      SIDE_BANNER: '/management/homepage/side-banner',
      POSTS: '/management/homepage/posts',

      STATISTICS: '/management/statistics'
    },
  }
};
