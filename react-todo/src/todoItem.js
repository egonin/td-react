import { Check } from "@mui/icons-material";
import { Card, Box, Button, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

const TodoCard = styled(Card)( {color: "#29524A", width: "500px", height:"100px", backgroundColor:"#EFEAE6", marginBlock:"2%", marginLeft:"2%", position:"relative", padding:"10px"});

export const TodoItem = ({task, removeTask}) => (
    <TodoCard>
        <Button
        onClick={() => removeTask(task.id)}
        size="small"
        sx = {{top:"0", right:"0" }}
      >
        🗑️
      </Button>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography variant={"h5"} fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            {task.title}
        </Typography>
        {!task.done ? <Typography fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            En cours
        </Typography>: <Typography fontFamily={"Helvetica Neue"} marginTop={"2%"}>
            Faite !
        </Typography>}
        </Box>
    </TodoCard>
)