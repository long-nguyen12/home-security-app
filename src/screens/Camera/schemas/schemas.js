import * as Yup from "yup";
const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const CameraSchema = Yup.object().shape({
  uuid: Yup.string().required("Mã thiết bị không được bỏ trống"),
  camera_name: Yup.string().required("Tên thiết bị không được bỏ trống"),
});
