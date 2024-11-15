import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box"
import { Check } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

const TodoCard = styled(Card)( {color: "#29524A", width: "500px", height:"100px", backgroundColor:"#EFEAE6", marginBlock:"2%", marginLeft:"2%"});

export const TodoItem = ({task}) => (
    <TodoCard>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography variant={"h5"} fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            {task.title}
        </Typography>
        {!task.done ? <Typography fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            En cours
        </Typography>: <Typography fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            Faite !
        </Typography>}
        <Typography>
            {task.date}
        </Typography>
        <Typography>
            {task.expectedTime}
        </Typography>
        </Box>
    </TodoCard>
)