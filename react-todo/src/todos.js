import { TaskCreationModal } from "./todoModal";
import { useTodos } from "./hooks";
import { TodoItem } from "./todoItem";
import { Add, FilterAlt } from "@mui/icons-material";
import { GoogleFonts } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PlayfairDisplay  } from '@mui/material';
import { Grid2, Button, ButtonGroup, MenuList, MenuItem, Box, Typography } from "@mui/material";
import {Menu} from "./Menu";

export const Todos = () => {
    const {
        isLoading,
        error,
        tasksToDisplay,
        createTask,
        removeTask,
        visible,
        setVisible,
        creationCallback,
    } = useTodos();
    
    // const tasksToDisplay = [];

    if (tasksToDisplay.length == 0 && !isLoading) {
      return <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} height={"100vh"} left={"0"}>
        <Menu visible = {visible} setVisible={setVisible} createTask={createTask} creationCallback={creationCallback}/>
        <Box display ={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Typography color="#29524A" variant="h1" fontFamily={"Playfair Display , sherif"}>Crée ta première tâche</Typography>
        </Box>
        </Box>
    }

    if (isLoading) {
        return (<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Typography color="#29524A" variant="h4" fontFamily={"Playfair Display , sherif"}>
          La todo list est en train de charger...</Typography>
        </Box>)
    }

    if (error) {
        return (<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
        <Typography color="#29524A" variant="h4" fontFamily={"Playfair Display , sherif"}>Il y a une erreur : {error.message}</Typography>
        </Box>)
    }

    return (
      <><Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
      <AutoAwesomeIcon sx = {{ color:"#29524A" }}/>
      <Typography color="#29524A" variant="h4" fontFamily={"Playfair Display , sherif"}>Votre todo list</Typography>
      <AutoAwesomeIcon sx = {{ color:"#29524A" }}/>
      </Box>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
      <Box sx={{ width: 50, maxWidth: '30%', marginBottom: "1rem", left:"0" }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Menu visible = {visible} setVisible={setVisible} createTask={createTask} creationCallback={creationCallback}/>
      </Box>
      <Box width={"90%"}>
      <Grid2 container spacing={1} justifyContent="space-between">
      {
            tasksToDisplay.map((task) => 
              <Grid2 item key={task.id} xs={12} sm={6} md={4}>
                <TodoItem task = { task } removeTask={removeTask}></TodoItem>
                </Grid2>
            )
        }
      </Grid2>
      </Box>
      </Box>
      </>
    )
}