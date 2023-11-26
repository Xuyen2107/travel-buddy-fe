import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useVacation from "../hooks/useVacation.js";
import { ScreenVacation, OpenModal, CreateVacationForm } from "../components";
import BoxColumn from "../styles/BoxColumn.jsx";
import { useEffect, useState } from "react";
import { PostAdd } from "@mui/icons-material";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CreatePost from "../components/CreatePost/index.jsx";

const HomePage = () => {
   const onReloadVacation = () => {
      setReload(true);
   };

   const { allVacationData, dataLike, setDataAllVacation, allVacationLoading, allVacationError, handleLikeVacation, fetchDataAllVacation } =
      useVacation();
   const [vacation, setVacation] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const [confirmOpenModal, setConfirmOpenModal] = useState(false);
   const [type, setType] = useState("");
   const handleOpen = () => {
      setOpenModal(true);
   };
   const handleConfirmOpen = () => setConfirmOpenModal(true);
   const handleConfirmClose = () => setConfirmOpenModal(false);
   const handleCloseAllModal = () => {
      setConfirmOpenModal(false);
      setOpenModal(false);
   };
   const [reload, setReload] = useState(null);

   useEffect(() => {
      fetchDataAllVacation();
   }, [reload]);

   useEffect(() => {
      if (dataLike) {
         setDataAllVacation((prevData) => prevData.map((item) => (item._id === dataLike?._id ? dataLike : item)));
      }
   }, [dataLike]);

   return (
      <Box>
         <Navbar />
         <Box sx={{ display: "flex" }}>
            <Sidebar />
            {allVacationLoading ? (
               <Box
                  sx={{
                     width: "100%",
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <CircularProgress />
               </Box>
            ) : allVacationError ? (
               <Typography variant="h6">Có lỗi xả ra</Typography>
            ) : (
               <Box>
                  <BoxColumn sx={{ gap: "20px", mt: "20px" }}>
                     <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <Button
                           onClick={() => {
                              handleOpen();
                              setType("createVacation");
                              setVacation(null);
                           }}
                           color="secondary"
                           sx={{ alignItems: "center" }}
                           variant="outlined"
                           endIcon={<HolidayVillageIcon />}
                        >
                           Tạo kì nghỉ
                        </Button>
                        <Button
                           onClick={() => {
                              handleOpen();
                              setType("createPost");
                           }}
                           color="secondary"
                           variant="outlined"
                           endIcon={<PostAdd />}
                        >
                           Tạo bài viết
                        </Button>
                     </Box>
                     {allVacationData?.map((item) => (
                        <ScreenVacation
                           handleLikeVacation={() => handleLikeVacation(item?._id)}
                           handleOpenModal={() => {
                              handleOpen();
                              setType("updateVacation");
                              setVacation(item);
                           }}
                           handleCreatePost={() => {
                              handleOpen();
                              setType("createPost");
                           }}
                           key={item?._id}
                           vacation={item}
                        />
                     ))}
                  </BoxColumn>
               </Box>
            )}

            <Box flex={1}></Box>
         </Box>
         <OpenModal
            type={type}
            dataVacation={vacation}
            openModal={openModal}
            confirmOpenModal={confirmOpenModal}
            handleConfirmClose={handleConfirmClose}
            handleConfirmOpen={handleConfirmOpen}
            handleCloseAllModal={handleCloseAllModal}
         >
            {type === "createVacation" || type === "updateVacation" ? (
               <CreateVacationForm
                  onProcessDone={() => {
                     handleCloseAllModal();
                     onReloadVacation();
                  }}
                  type={type}
                  vacation={vacation}
               />
            ) : (
               <CreatePost closeModal={handleCloseAllModal} type={type} />
            )}
         </OpenModal>
      </Box>
   );
};

export default HomePage;
