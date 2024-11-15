import { Check } from "@mui/icons-material";
import { Card, Box, Button, Typography } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { RemoveDone } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const TodoCard = styled(Card)( {color: "#29524A", width: "500px", height:"100px", backgroundColor:"#EFEAE6", marginBlock:"2%", marginLeft:"2%", position:"relative", padding:"10px"});

export const TodoItem = ({task, removeTask, setAsDone, setAsTodo}) => (
    <TodoCard>
        <Button
        onClick={() => removeTask(task.id)}
        size="small"
        sx = {{top:"0", right:"0" }}
      >
        🗑️
      </Button>
      {!task.done ? (
        <Button onClick ={()=> setAsDone(task.id)}>
        <DoneOutlineIcon sx = {{color:"#94A187"}} />
        </Button>
      ) : ( <Button onClick = {() => setAsTodo(task.id)}>
        <RemoveDone sx = {{color:"#94A187"}}/>
        </Button>
      )}
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