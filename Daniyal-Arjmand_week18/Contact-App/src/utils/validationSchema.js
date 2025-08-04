import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  Name: yup.string()
    .trim()
    .min(2, "نام باید حداقل ۲ حرف باشد!")
    .required("وارد کردن نام الزامی است."),

  LastName: yup.string()
    .trim()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد!")
    .required("وارد کردن نام خانوادگی الزامی است."),

  Email: yup.string()
    .required("وارد کردن ایمیل الزامی است.")
    .email("ایمیل وارد شده معتبر نیست."),

  Phone: yup.string()
    .required("وارد کردن شماره تلفن الزامی است.")
    .matches(/^0\d{10}$/, "شماره تلفن باید با 0 شروع شود و ۱۱ رقمی باشد."),

  Category: yup.string()
    .required("انتخاب دسته بندی الزامی است."),

  Gender: yup.string()
    .required("انتخاب جنسیت الزامی است."),
});
