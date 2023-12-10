import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ScreenVacation, OpenModal, CreateVacationForm } from "../components";
import BoxColumn from "../styles/BoxColumn.jsx";
import { useEffect, useState } from "react";
import { PostAdd } from "@mui/icons-material";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CreatePost from "../components/FormPost/index.jsx";
import useFetchData from "../hooks/useFetchData.js";
import { useDispatch, useSelector } from "react-redux";
import vacationAPI from "../apis/vacationAPI.js";
import { likeFinish, removeFinish } from "../redux/vacationSlice.js";
import { formatDate } from "../services/formatDate.js";

const HomePage = () => {
   //================================================================
   const [type, setType] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const [milestoneId, setMilestoneId] = useState("");
   const [vacationData, setVacationData] = useState(null);
   const [confirmOpenModal, setConfirmOpenModal] = useState(false);
   //================================================================
   const dispatch = useDispatch();
   const { vacation, handleLike, handleRemove } = useSelector((state) => state.vacation);
   const {
      data: allVacationData,
      loading: allVacationLoading,
      error: allVacationError,
      setData: setDataAllVacation,
      fetchData: fetchDataAllVacation,
   } = useFetchData(vacationAPI.getAll);
   //================================================================
   useEffect(() => {
      if (vacation && handleLike && allVacationData) {
         setDataAllVacation((prevData) => prevData.map((item) => (item._id === vacation?._id ? vacation : item)));
         dispatch(likeFinish());
      }
   }, [handleLike]);

   useEffect(() => {
      if (vacation && handleRemove && allVacationData) {
         setDataAllVacation((prevData) => prevData.filter((item) => item._id !== vacation));
         dispatch(removeFinish());
      }
   }, [handleRemove]);

   const handleOpen = () => setOpenModal(true);
   const handleConfirmOpen = () => setConfirmOpenModal(true);
   const handleConfirmClose = () => setConfirmOpenModal(false);
   const handleCloseAllModal = () => {
      setConfirmOpenModal(false);
      setOpenModal(false);
   };

   return (
      <Box>
         <Navbar />
         <Box sx={{ display: "flex", gap: "20px" }}>
            <Box sx={{ display: { xs: "none", md: "block" }, position: "sticky", top: 64, height: "100%" }}>
               <Sidebar />
            </Box>
            {allVacationLoading ? (
               <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
                  <CircularProgress />
               </Box>
            ) : allVacationError ? (
               <Typography variant="h6">Có lỗi xả ra</Typography>
            ) : (
               <Box>
                  <BoxColumn sx={{ gap: "20px", mt: "20px", alignItems: "center" }}>
                     <BoxColumn
                        sx={{
                           gap: "20px",
                           bgcolor: "background.paper",
                           borderRadius: "20px",
                           width: "100%",
                           alignItems: "center",
                           p: "10px",
                        }}
                     >
                        <Typography>Hãy chia sẻ hành trình thú vị của bạn!</Typography>
                        <Box sx={{ display: "flex", gap: "20px" }}>
                           <Button
                              onClick={() => {
                                 handleOpen();
                                 setType("createVacation");
                                 setVacationData(null);
                              }}
                              color="secondary"
                              sx={{ alignItems: "center", textTransform: "none" }}
                              variant="outlined"
                              endIcon={<HolidayVillageIcon />}
                           >
                              Tạo kì nghỉ
                           </Button>
                           <Button
                              onClick={() => {
                                 handleOpen();
                                 setType("createPost");
                                 setVacationData(null);
                                 setMilestoneId("");
                              }}
                              sx={{ alignItems: "center", textTransform: "none" }}
                              color="secondary"
                              variant="outlined"
                              endIcon={<PostAdd />}
                           >
                              Tạo bài viết
                           </Button>
                        </Box>
                     </BoxColumn>
                     {allVacationData?.map((item) => (
                        <Box key={item?._id} sx={{ width: { xs: "90%", md: "600px" } }}>
                           <ScreenVacation
                              vacation={item}
                              handleUpdateVacation={() => {
                                 handleOpen();
                                 setType("updateVacation");
                                 setVacationData(item);
                              }}
                              handleCreatePost={(item1) => {
                                 handleOpen();
                                 setType("createPost");
                                 setVacationData(item);
                                 setMilestoneId(item1);
                              }}
                           />
                        </Box>
                     ))}
                  </BoxColumn>
               </Box>
            )}
         </Box>
         <OpenModal
            type={type}
            openModal={openModal}
            confirmOpenModal={confirmOpenModal}
            handleConfirmClose={handleConfirmClose}
            handleConfirmOpen={handleConfirmOpen}
            handleCloseAllModal={handleCloseAllModal}
         >
            {type === "createVacation" || type === "updateVacation" ? (
               <CreateVacationForm
                  onProcessDone={async () => {
                     handleCloseAllModal();
                     await fetchDataAllVacation();
                  }}
                  type={type}
                  vacation={vacationData}
               />
            ) : (
               <CreatePost type={type} vacation={vacationData} milestoneId={milestoneId} onProcessDone={handleCloseAllModal} />
            )}
         </OpenModal>
      </Box>
   );
};

export default HomePage;
