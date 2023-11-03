import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import "../styles/VacationDetail.css";
import Destination1 from "../assets/images/assets/Destination1.png";
import Destination2 from "../assets/images/assets/Destination2.png";
import Destination3 from "../assets/images/assets/Destination3.png";
import Destination4 from "../assets/images/assets/Destination4.png";
import Destination5 from "../assets/images/assets/Destination5.png";
import Destination6 from "../assets/images/assets/Destination6.png";
import info1 from "../assets/images/assets/info1.png";
import info2 from "../assets/images/assets/info2.png";
import info3 from "../assets/images/assets/info3.png";

const VacationDetail = () => {
    const { title } = useParams();

    const data = [
        {
        avatarAlbum: Destination1,
          title: "Singapore",
          vacation: "Singapore, officialy thr Republic of Singapore, is a",
          cost: "38,800",
          duration: "Approx 2 night trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg","https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg","https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg","https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg","https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]
        },
        {
            avatarAlbum: Destination2,
          title: "Thailand",
          vacation: "Thailand is a Southeast Asia country. It's known for",
          cost: "54,200",
          duration: "Approx 2 night trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]
          
        },
        {
            avatarAlbum: Destination3,
          title: "Paris",
          vacation: "Paris, France's capital, is a major European city and a",
          cost: "45,500",
          duration: "Approx 2 night trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]

        },
        {
            avatarAlbum: Destination4,
          title: "New Zealand",
          vacation: "New Zealand is an island country in the",
          cost: "24,100",
          duration: "Approx 1 night trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]

        },
        {
            avatarAlbum: Destination5,
          title: "Bora Bora",
          vacation: "Bora Bora is a small South Pacific island northwest of",
          cost: "95,400",
          duration: "Approx 2 night 2 day trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]

        },
        {
            avatarAlbum: Destination6,
          title: "London",
          vacation: "London, the capital of England and the United",
          cost: "38,800",
          duration: "Approx 3 night 2 day trip",
          images: ["https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/k7iwvmrp1rafuews79ia.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/ahxstciq8wmq5ehnvvoy.jpg", "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698660633/Travel_Buddy/xeilgavx2zburp4kznkl.jpg"]
        },
      ];

      const vacation = data.find((item) => item.title === title);

      return (
        <Container maxWidth="sm">
          <section id="recommendation" className="recommendation">
            <div className="title">
              <h1>About {title}</h1>
                <div className="CategoryBar">

                </div>
          </div>
          </section>
          <Box >
            <img src={vacation.avatarAlbum} alt="image" />
          </Box>
          <h3>{vacation.title}</h3>
          <p>{vacation.vacation}</p>
    
          <Box className="price">
            <div className="icon-img">
              <img src={info1} alt="image" />
              <img src={info2} alt="image" />
              <img src={info3} alt="image" />
            </div>
    
            <p>${vacation.cost}</p>
            
          </Box>
    
          <Box className="details">
            <p>1500 kms</p>
            <p>{vacation.duration}</p>
          </Box>

          <Box className='buy'>
              <Button variant="contained" color="success">Buy</Button>
          </Box>
          <Card variant="outlined">
          <Fab  size="small" color="primary" aria-label="add" >
            <AddIcon  />
          </Fab>
          <Box sx={{ flexGrow: 1, margin: 2 }} >
          <ImageList
               variant="masonry" cols={3} gap={8}
                    >
            {vacation.images && vacation.images.map((image, index) => (
              
               <ImageListItem key={index} alt="image" >
                <img key={index} src={`${image}?w=248&fit=crop&auto=format`} alt="image" loading="lazy"/>
               </ImageListItem>
            ))}
            </ImageList>
          </Box>
          </Card>
        </Container>
      );
      
        
};

export default VacationDetail;