export const API = {
  SETTINGS: "/api/setting",
  ABOUT_APP: "/api/page-contents/type/{0}",

  FILES: "/api/files/{0}",
  IMAGES: "/api/files/image/{0}",
  AVATAR: "/api/get-files/avatar/{0}",

  IMAGES_PHANHOI: "/api/get-files/image/{0}",
  FILES_PHANHOI: "/api/get-files/{0}",

  FAQS: "/api/citizen/faqs",
  FAQS_QUERY: "/api/citizen/faqs?page={0}&limit={1}",
  FAQS_ID: "/api/citizen/faqs/{0}",

  SERVICE: "/api/citizen/service",
  SERVICE_QUERY: "/api/service?page={0}",
  SERVICE_ID: "/api/service/{0}",

  STATUS: "/api/status-request",
  STATUS_QUERY: "/api/status-request?page={0}",
  STATUS_ID: "/api/status-request/{0}",

  COMMENTS: "/api/comments",
  COMMENTS_QUERY: "/api/comments?page={0}",
  COMMENTS_ID: "/api/comments/{0}",

  CITIZEN: "/api/citizen",
  CITIZEN_QUERY: "/api/citizen?page={0}",
  CITIZEN_ID: "/api/citizen/{0}",
  COUNT: "/api/citizen/count",
  DISTRICT: "/api/citizen/district",
  UNIT: "/api/citizen/unit",
  //SERVICE: "/api/citizen/service",
  //CATEGORY: "/api/citizen/service",

  CITIZEN_LOGIN: "/api/citizen/login",
  CITIZEN_LOGIN_GOOGLE: "/api/citizen/login-google",
  CITIZEN_LOGIN_FACEBOOK: "/api/citizen/login-facebook",
  CITIZEN_ME: "/api/citizen/me",
  USERS_ME: "/api/users/me",
  CITIZEN_INFO: "/api/citizen/info",
  USERS_INFO: "/api/users/info",
  CITIZEN_REGISTER: "/api/citizen/signup",
  CITIZEN_FORGOT_PASSWORD: "/api/citizen/forgot-password-mail",

  CITIZEN_NOTIFY:
    "/api/citizen-notify?page={0}&limit={1}&created_at[to_time]={2}",

  CITIZEN_REGISTER_DEVICE: "/api/citizen/register-device",
  CITIZEN_UNREGISTER_DEVICE: "/api/citizen/unregister-device",

  REQUEST: "/api/citizen/request",
  REQUEST_QUERY: "/api/citizen/request?page={0}&limit={1}{2}",
  //REQUEST_QUERY: "/api/citizen/request?page={0}&service_id={1}&unit_id={2}&district_id={3}&created_at[from]={4}&created_at[to]={5}",
  REQUEST_ID: "/api/citizen/request/{0}",

  REQUEST_ME: "/api/citizen/request-me",
  REQUEST_ME_QUERY: "/api/citizen/request-by-phone?page={0}&limit={1}{2}",
  //REQUEST_ME_QUERY: "/api/citizen/request-me?page={0}&service_id={1}&unit_id={2}&district_id={3}&created_at[from]={4}&created_at[to]={5}",
  REQUEST_ME_ID: "/api/citizen/request-by-phone/{0}",
  MY_REQUEST_ID: "/api/citizen/request-by-smartid?page={0}&limit={1}{2}",
  REQUEST_SEND_OTP: "/api/citizen-temp/sendotp",
  REQUEST_CONFIRM_OTP: "/api/citizen-temp/confirmotp",

  REPORT: "/api/report",
  REQUEST_BY_DISTRICT: "/citizen/request-by-district?{0}",
  REQUEST_BY_SERVICE: "/citizen/request-by-service?{0}",
  REQUEST_BY_ME: "/citizen/request-by-me?{0}{1}",

  RATING: "/api/citizen/citizen-rate",
  RATING_ID: "/api/citizen/citizen-rate/{0}",
  RATING_BY_REQUEST: "/api/citizen/request/{0}/citizen-rate",
  MY_RATING_BY_REQUEST: "/api/citizen/request/{0}/me-rating",

  COMMENT: "/api/citizen/citizen-comment",
  COMMENT_ID: "/api/citizen/citizen-comment/{0}",
  COMMENT_BY_REQUEST: "/api/citizen/request/{0}/citizen-comment",

  MY_FAVORYTE: "/api/citizen-favorited",
  MY_FAVORYTE_QUERY: "/api/citizen-favorited?page={0}&limit={1}{2}",
  MY_FAVORYTE_ID: "/api/citizen-favorited/{0}",

  LIST_MY_POINT_ID: "/api/citizen/{0}/citizen-point?page={1}&limit={2}",
  DANGKYYTE_BY_CITIZEN: "/api/citizen/{0}/dang-ky-y-te",

  GIFTS: "/api/citizen/{0}/gifts",
  MY_GIFTS: "/api/citizen/{0}/my-gifts?page={1}&limit={2}",
  REDEEM: "/api/citizen/{0}/redeems",

  HCC: "/api/hcc?page={0}&limit={1}{2}",
  HCC_DETAIL: "/api/hcc/{0}/detail",
  ELICTRIC: "/api/electric/{0}",
  ELICTRIC_DETAIL: "/api/electric/{0}/invoices/{1}",

  NCOVID: "/api/ncovid/all",
  NCOVID_VIETNAM: "/api/thong-tin-covid",
  NCOVID_THANHHOA: "/api/dich-benh/last",

  NCOVID_NGUOIKHAI: "/api/citizen/{0}/ncovid-nguoi-khai",

  NCOVID_DANHBA: "/api/ncovid-danhba",
  NCOVID_DANHBA_ID: "/api/ncovid-danhba/{0}",
  NCOVID_DANHBA_QUERY: "/api/ncovid-danhba?page={0}&limit={1}{2}",

  NCOVID_DANHMUCPHANANH: "/api/ncovid-danhmucphananh",
  NCOVID_DANHMUCPHANANH_ID: "/api/ncovid-danhmucphananh/{0}",
  NCOVID_DANHMUCPHANANH_QUERY:
    "/api/ncovid-danhmucphananh?page={0}&limit={1}{2}",

  NCOVID_PHANANH: "/api/ncovid-phananh",
  DANGKYVEQUE: "/api/dang-ky-ve-que",

  NCOVID_DANHMUCKHAIBAO: "/api/ncovid-danhmuckhaibao?chitiet=true",
  NCOVID_DANHMUCKHAIBAO_ID: "/api/ncovid-danhmuckhaibao/{0}",
  NCOVID_DANHMUCKHAIBAO_QUERY:
    "/api/ncovid-danhmuckhaibao?page={0}&limit={1}{2}",

  NCOVID_KHAIBAO_YTE: "/api/ncovid-khaibaoyte",

  NCOVID_TINTUC: "/api/ncovid-news",
  NCOVID_TINTUC_ID: "/api/ncovid-news/{0}",
  NCOVID_TINTUC_QUERY: "/api/ncovid-news?page={0}&limit={1}{2}",

  THONGTIN_DICHTE_QUERY: "/api/nguoi-cach-ly/dich-te?page={0}&limit={1}{2}",

  PROVINCE_QUERY: "/api/province?page={0}&limit={1}{2}",
  DISTRICT_QUERY: "/api/district?page={0}&limit={1}{2}",

  DISTRICT_BY_PROVINCE: "/api/province/{0}/district",
  DISTRICT_BY_ID: "/api/district/{0}",
  WARDS_BY_DISTRICT: "/api/district/{0}/wards",
  WARDS_BY_ID: "/api/wards/{0}",

  THONG_BAO: "/api/ncovid-tin-tuc",
  THONG_BAO_ID: "/api/ncovid-tin-tuc/{0}",
  THONG_BAO_QUERY: "/api/ncovid-tin-tuc?page={0}&limit={1}{2}",
  HOLIDAY_QUERY: "/api/holiday?page={0}&limit={1}{2}",

  NCOVID_FAQS: "/api/citizen/faqs",
  NCOVID_FAQS_ID: "/api/citizen/faqs/{0}",
  NCOVID_FAQS_QUERY: "/api/citizen/faqs?page={0}&limit={1}{2}",

  NCOVID_COSOYTE: "/api/ncovid-cosoyte",
  NCOVID_COSOYTE_ID: "/api/ncovid-cosoyte/{0}",
  NCOVID_COSOYTE_QUERY: "/api/ncovid-cosoyte?page={0}&limit={1}{2}",
  DIEM_PHAT_DICH_QUERY: "/api/diem-phat-dich/phan-loai-tinh-thanh",

  THOI_TIET: "/api/thoi-tiet",
  VAN_BAN: "/api/van-ban/{0}",
  GIOI_THIEU_QUERY: "/api/gioi-thieu",

  TIN_TUC: "/api/tin-tuc",
  TIN_TUC_ID: "/api/tin-tuc/{0}",
  TIN_TUC_QUERY: "/api/tin-tuc?page={0}&limit={1}{2}",

  CANH_BAO: "/api/canh-bao",
  CANH_BAO_ID: "/api/canh-bao/{0}",
  CANH_BAO_QUERY: "/api/canh-bao?page={0}&limit={1}{2}",

  HOI_DAP: "/api/hoi-dap",
  HOI_DAP_ID: "/api/hoi-dap/{0}",
  DELETE_HOI_DAP_ID: "/api/hoi-dap/cong-dan/{0}",
  HOI_DAP_QUERY: "/api/hoi-dap/cong-dan?page={0}&limit={1}{2}",

  HUONG_DAN: "/api/huong-dan",
  HUONG_DAN_ID: "/api/huong-dan/{0}",
  HUONG_DAN_QUERY: "/api/huong-dan?page={0}&limit={1}{2}",

  THONGTIN_SAILECH: "/api/thong-tin-sai-lech",
  THONGTIN_SAILECH_ID: "/api/thong-tin-sai-lech/{0}",
  THONGTIN_SAILECH_QUERY:
    "/api/thong-tin-sai-lech/cong-khai?page={0}&limit={1}{2}",

  XACMINH_THONGTIN: "/api/xac-minh-tin-tuc",
  XACMINH_THONGTIN_ID: "/api/xac-minh-tin-tuc/cong-dan/{0}",
  XACMINH_THONGTIN_QUERY:
    "/api/xac-minh-tin-tuc/cong-khai?page={0}&limit={1}{2}",
  XACMINH_THONGTIN_CUATOI: "/api/xac-minh-tin-tuc/cong-dan",
  XACMINH_THONGTIN_CUATOI_QUERY:
    "/api/xac-minh-tin-tuc/cong-dan?page={0}&limit={1}{2}",

  BOSUNG_THONGTIN_ID: "/api/xac-minh-tin-tuc/cong-dan/{0}",

  HOPTHU_CONGDAN: "/api/hop-thu",
  HOPTHU_CONGDAN_ID: "/api/hop-thu/{0}",
  HOPTHU_CONGDAN_QUERY: "/api/hop-thu?page={0}&limit={1}{2}",
  HOPTHU_USER_QUERY: "/api/hop-thu/me?page={0}&limit={1}{2}",

  DANGKYYTE: "/api/dang-ky-y-te",
  DANGKYYTE_ID: "/api/dang-ky-y-te/{0}",

  CHITIETCACHLY_ID: "/api/chi-tiet-cach-ly/{0}",
  CHITIETCACHLY: "/api/citizen/giai-doan-cach-ly",

  GIAIDOANCACHLY_ID: "/api/giai-doan-cach-ly/{0}",
  GIAIDOANCACHLY: "/api/citizen/giai-doan-cach-ly",

  DANHSACH_KHAIBAOYTE: "/api/giai-doan-cach-ly/{0}/khai-bao-y-te",
  THONGTINCACHLY: "/api/cach-ly-tai-nha/{0}/chi-tiet-cong-dan",

  TOADOCACHLY: "/api/giai-doan-cach-ly/{0}/toa-do-cachly",
  KHAIBAOYTE: "/api/citizen/khai-bao-y-te",
  KHAIBAOYTE_ID: "/api/citizen/khai-bao-y-te/{0}",

  USER_KHAIBAOYTE: "/api/khai-bao-y-te",
  USER_KHAIBAOYTE_ID: "/api/khai-bao-y-te/{0}",

  NGUOITHANCACHLY: "/api/citizen/nguoi-than-cach-ly",
  GIAIDOANNGUOITHAN: "/api/citizen/giai-doan-nguoi-than",

  CANHBAO_CACHLY: "/api/canh-bao-cach-ly",

  CA_NGHI_NHIEM: "/api/ca-nghi-nhiem",
  NGUOI_CACH_LY: "/api/citizen/nguoi-cach-ly",
  CACH_LY_TAI_NHA: "/api/citizen/cach-ly-tai-nha",

  USER_CACH_LY_TAI_NHA: "/api/cach-ly-tai-nha",
  USER_CACH_LY_TAI_NHA_ID: "/api/cach-ly-tai-nha/{0}",

  GIAIDOANCACHLY_QUERY: "/api/giai-doan-cach-ly?page={0}&limit={1}{2}",
  CA_NGHI_NHIEM_ID: "/api/ca-nghi-nhiem/{0}",

  CACH_LY_TAI_NHA_QUERY: "/api/cach-ly-tai-nha?page={0}&limit={1}{2}",

  CANGHINHIEM_CTCACHLY: "/api/ca-nghi-nhiem/{0}/chi-tiet-cach-ly",

  USER_DANGNHAP: "/api/users/login",
  USER_DANGKY: "/api/users/signup",

  USER_VERIFY_FORGOT_PASSWORD: "/api/citizen/xac-thuc-quen-mat-khau",
  USER_FORGET_PASSWORD: "/api/citizen/reset-password",
  USER_VERIFY_PHONE: "/api/citizen/dang-nhap-dien-thoai",
  USER_CHANGE_PASSWORD: "/api/citizen/change-password",
  USER_ADMIN_CHANGE_PASSWORD: "/api/users//change-password",

  HOIDAPCOVID: "/api/hoi-dap-covid",
  HOIDAPCOVID_ID: "/api/hoi-dap-covid/cong-dan/{0}",
  HOIDAPCOVID_QUERY: "/api/hoi-dap-covid/cong-khai?page={0}&limit={1}{2}",
  // HOIDAPCOVID_QUERY: '/api/hoi-dap-covid?page={0}&limit={1}{2}',
  HOIDAPCOVID_CUATOI: "/api/hoi-dap-covid/cong-dan",
  HOIDAPCOVID_CUATOI_QUERY: "/api/hoi-dap-covid/cong-dan?page={0}&limit={1}{2}",
  BOSUNG_HOIDAPCOVID_ID: "/api/hoi-dap-covid/cong-dan/{0}",

  CANBO_QUERY: "/api/users/canbo?page={0}&limit={1}{2}",

  CAMERA_LIST_API: "/api/camera/user/{0}",
  CAMERA_ADD_API: "/api/camera/user",

  UPLOAD_API: "/api/upload/file",
  POLYGON_API: "/api/polygon",
  DEVICE_TOKEN_API: "/api/user/devicetoken",

  NOTIFICATION_API: "/api/notification?skip={0}&limit={1}{2}",
  HISTORY_API: "/api/history?skip={0}&limit={1}{2}",
};
