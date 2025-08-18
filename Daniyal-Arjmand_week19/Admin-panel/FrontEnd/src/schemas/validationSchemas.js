import * as yup from "yup";

const usernameValidation = yup
  .string()
  .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
  .max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد")
  .matches(/^[^\d@]+$/, "نام کاربری نمی‌تواند شامل عدد یا ایمیل باشد")
  .required("نام کاربری الزامی است");

const passwordValidation = yup
  .string()
  .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
  .max(30, "رمز عبور نمی‌تواند بیشتر از ۳۰ کاراکتر باشد")
  .matches(
    /^(?=.*[a-zA-Z])(?=.*\d)/,
    "رمز عبور باید شامل حروف انگلیسی و اعداد باشد"
  )
  .required("رمز عبور الزامی است");

export const loginSchema = yup.object().shape({
  username: usernameValidation,
  password: passwordValidation,
});

export const registerSchema = yup.object().shape({
  username: usernameValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "رمزهای عبور باید با هم مطابقت داشته باشند"
    )
    .required("تکرار رمز عبور الزامی است"),
});

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("نام کالا الزامی است")
    .matches(/^[^\d]+$/, "نام کالا نمی‌تواند شامل عدد باشد"),
  stock: yup
    .number()
    .typeError("موجودی باید به صورت عدد وارد شود")
    .min(0, "موجودی نمی‌تواند منفی باشد")
    .required("موجودی الزامی است"),
  price: yup
    .string()
    .required("قیمت الزامی است")
    .matches(/^[0-9,]+$/, "قیمت فقط می‌تواند شامل عدد و کاما باشد"),
});
