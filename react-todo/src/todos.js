import { TaskCreationModal } from "./todoModal";
import { useTodos } from "./hooks";
import { TodoItem } from "./todoItem";
import { Add, FilterAlt } from "@mui/icons-material";
import { GoogleFonts } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PlayfairDisplay  } from '@mui/material';
import { Grid2, Button, ButtonGroup, MenuList, MenuItem, Box, Typography } from "@mui/material";

export const Todos = () => {
    const {
        isLoading,
        error,
        quickFilter,
        setQuickFilter,
        tasksToDisplay,
        createTask,
        visible,
        setVisible,
        creationCallback,
    } = useTodos();

    if (isLoading) {
        return <p>The todo list is loading...</p>;
    }

    if (error) {
        return <p>There is an error : {error.message}</p>
    }

    return (
      //   <>
      //   <ButtonGroup
      //   variant="contained"
      //   aria-label="outlined primary button group"
      //   sx={{ marginBottom: "1rem" }}
      // >
      //   <Button startIcon={<Add />} onClick={() => setVisible(true)}>
      //     Créer
      //   </Button>
      //   <TaskCreationModal
      //     visible={visible}
      //     setVisible={setVisible}
      //     createTask={createTask}
      //     creationCallback={creationCallback}
      //   />
      //   <Button
      //     startIcon={<FilterAlt />}
      //     onClick={() => setQuickFilter(!quickFilter)}
      //   >
      //     {quickFilter ? "Tout afficher" : "A faire"}
      //   </Button>
      // </ButtonGroup>
      //   {
      //       tasksToDisplay.map((task) => 
      //           <TodoItem task = { task }></TodoItem>
      //       )
      //   }
      //   </>
      <><Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
      <AutoAwesomeIcon sx = {{ color:"#29524A" }}/>
      <Typography color="#29524A" variant="h4" fontFamily={"Playfair Display , sherif"}>Votre todo list</Typography>
      <AutoAwesomeIcon sx = {{ color:"#29524A" }}/>
      </Box>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
      <Box sx={{ width: 50, maxWidth: '30%', marginBottom: "1rem" }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <MenuList>
        <MenuItem>
        <Add onClick={() => setVisible(true)} sx = {{color:"#94A187"}}/>
        <TaskCreationModal
          visible={visible}
          setVisible={setVisible}
          createTask={createTask}
          creationCallback={creationCallback}
        />
        </MenuItem>
        <MenuItem>
        <FilterAlt></FilterAlt>
        </MenuItem>
      </MenuList>
      </Box>
      <Box width={"90%"}>
      <Grid2 container spacing={1} justifyContent="space-between">
      {
            tasksToDisplay.map((task) => 
              <Grid2 item key={task.id} xs={12} sm={6} md={4}>
                <TodoItem task = { task }></TodoItem>
                </Grid2>
            )
        }
      </Grid2>
      </Box>
      </Box>
      </>
    )
}