import classNames from "classnames/bind";
import styles from "../styles/profile.module.css";
import React from "react";
import { Modal, Paper } from "@mui/material";

const Profile = () => {
   const cx = classNames.bind(styles);
   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   return (
      <div className={cx("profile")}>
         <div className={cx("container")}>
            <div className={cx("profile-top")}>
               <div className={cx("profile-background")}>
                  <img
                     width="100%"
                     height="100%"
                     className={cx("background-img")}
                     src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                     alt=""
                  />
               </div>
               <div className={cx("profile-cover")}>
                  <div className={cx("profile-avatar")}>
                     <div style={{ width: "180px", height: "180px", position: "relative" }}>
                        <img
                           height="180px"
                           width="180px"
                           className={cx("avatar-img")}
                           src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                           alt=""
                        />
                     </div>
                     <span className={cx("profile-name")} style={{ fontSize: "50px" }}>
                        Pham Hoang Xuyen
                     </span>
                  </div>

                  <div className={cx("profile-setting")}>
                     <button onClick={handleOpen} className={cx("setting-click")}>
                        Chỉnh sửa thông tin cá nhân
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <div
               style={{
                  position: "absolute",
                  fontSize: "30px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "80%", // Xác định kích thước tối đa
                  height: "80vh", // Xác định kích thước cao tối đa
                  overflowY: "auto", // Bật tính năng cuộn
                  border: "1px solid #000", // Thêm viền
               }}
            >
               <div style={{ paddingRight: "100px" }}>
                  <Paper></Paper>
               </div>
            </div>
         </Modal>
      </div>
   );
};

export default Profile;
