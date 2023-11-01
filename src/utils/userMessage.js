export const userMessages = {
   password: {
      require: "Mật khẩu không được để trống",
      min: "Mật khẩu tối thiểu 6 kí tự",
      max: "Mật khẩu tối đa 10 kí tự",
      matches: "Mật khẩu gồm chữ in hoa, chữ thường, số và không chứa khoảng trống",
      passwordMismatch: "Mật khẩu nhập lại chưa đúng",
      passwordErr: "Mật khẩu nhập chưa đúng",
   },

   loginInfo: {
      require: "Vui lòng nhập thông tin đăng nhập của bạn",
      notRegistered: "Tài khoản chưa được đăng kí",
   },

   fullName: {
      require: "Vui lòng nhập tên của bạn",
   },

   userName: {
      require: "Username không được để trống",
      min: "Username tối thiếu 6 kí tự",
      max: "Username tối đa 20 kí tự",
      noSpaces: "Username không chứa khoảng trống",
      exists: "Username đã tồn tại",
   },

   email: {
      require: "Email không được để trống",
      invalid: "Email không hợp lệ",
      exists: "Email đã tồn tại",
      notExists: "Email chưa tồn tại trong hệ thống",
   },

   phoneNumber: {
      require: "Số điện thoại không được để trống",
      invalid: "Số điện thoại không hợp lệ",
      exists: "Số điện thoại đã tồn tại",
   },

   avatar: {
      require: "Bạn chưa chọn ảnh",
   },

   age: {
      require: "Tuổi không được để trống",
   },

   dateOfBirth: {
      require: "Ngày sinh không được để trống",
   },

   gender: {
      require: "Giới tính không được để trống",
   },

   describe: {
      require: "Mô tả không được để trống",
   },

   otp: {
      require: "Otp không được để trống",
      notSent: "Bạn chưa gửi OTP",
      wrongOtp: "OTP không đúng",
      notEntered: "Bạn chưa nhập OTP",
   },

   successfully: "Thành công",

   notFound: "Không tìm thấy",
};
