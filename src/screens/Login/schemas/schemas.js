import * as Yup from "yup";
const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required("Họ và tên không được bỏ trống"),
    username: Yup.string()
        .min(2, "Tên tài khoản quá ngắn.")
        .required("Tên đăng nhập không được bỏ trống"),
    password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự.")
        .required("Mật khẩu không được bỏ trống"),
    re_password: Yup.string()
        .min(6, ({ min }) => `Mật khẩu cần ít nhất ${min} kí tự`)
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Mật khẩu không được bỏ trống"),
    phone: Yup.string()
        .matches(phoneRegExp, "Số điện thoại không đúng định dạng")
        .required("Số điện thoại không được bỏ trống"),
});

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng nhập tên tài khoản"),
    password: Yup.string()
        .min(6, ({ min }) => `Mật khẩu cần ít nhất ${min} kí tự`)
        .required("Vui lòng nhập mật khẩu"),
});

export const ForgotPasswordSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(phoneRegExp, "Số điện thoại không đúng định dạng")
        .required("Vui lòng nhập số điện thoại"),
});

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, ({ min }) => `Mật khẩu cần ít nhất ${min} kí tự`)
        .required("Vui lòng nhập mật khẩu"),
    re_password: Yup.string()
        .min(6, ({ min }) => `Mật khẩu cần ít nhất ${min} kí tự`)
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
});
