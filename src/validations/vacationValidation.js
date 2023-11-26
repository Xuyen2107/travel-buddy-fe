import * as Yup from "yup";

const vacationValidation = (method) => {
   let validateVacation;

   const titleSchema = Yup.string().required("Vui lòng nhập tiêu đề");
   const avatarVacationSchema = Yup.string().required("Vui lòng chọn ảnh");
   const descriptionSchema = Yup.string().required("Vui lòng nhập mô tả");
   const isPublicSchema = Yup.number().required("Vui lòng chọn trạng thái").oneOf([1, 2, 3], "Trạng thái không hợp lệ");
   const startDaySchema = Yup.string().required("Vui lòng chọn ngày bắt đầu");
   const endDaySchema = Yup.string().required("Vui lòng chọn ngày kết thúc");
   const milestonesSchema = Yup.array().of(
      Yup.object().shape({
         time: Yup.string().required("Vui lòng chọn thời gian mốc"),
         description: Yup.string().required("Vui lòng nhập mô tả mốc"),
      }),
   );

   if (method === "create") {
      return (validateVacation = Yup.object().shape({
         title: titleSchema,
         avatarVacation: avatarVacationSchema,
         description: descriptionSchema,
         isPublic: isPublicSchema,
         startDay: startDaySchema,
         endDay: endDaySchema,
         milestones: milestonesSchema,
      }));
   }

   return validateVacation;
};

export default vacationValidation;
