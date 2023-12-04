import * as Yup from "yup";

const postValidation = (method) => {
   let validatePost;

   const isPublicSchema = Yup.number().required("Vui lòng chọn trạng thái");
   const vacationSchema = Yup.string().required("Vui lòng chọn kì nghỉ");
   const milestoneSchema = Yup.string().required("Vui lòng chọn cột mốc hành trình");
   const contentSchema = Yup.string().required("Vui lòng điền nội dung bài viết");
   const imageSchema = Yup.array().test("nonEmpty", "Vui lòng chọn ít nhất một ảnh", (value) => value && value.length > 0);

   if (method === "create") {
      return (validatePost = Yup.object().shape({
         isPublic: isPublicSchema,
         vacation: vacationSchema,
         milestone: milestoneSchema,
         content: contentSchema,
         images: imageSchema,
      }));
   }
   if (method === "update") {
      return (validatePost = Yup.object().shape({
         isPublic: isPublicSchema,
         vacation: vacationSchema,
         milestone: milestoneSchema,
         content: contentSchema,
         images: imageSchema,
      }));
   }

   return validatePost;
};

export default postValidation;
