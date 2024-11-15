import { TaskCreationModal } from "./todoModal";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { useTodos } from "./hooks";
import { TodoItem } from "./todoItem";
import { Add, FilterAlt } from "@mui/icons-material";

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
        <>
        <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ marginBottom: "1rem" }}
      >
        <Button startIcon={<Add />} onClick={() => setVisible(true)}>
          Créer
        </Button>
        <TaskCreationModal
          visible={visible}
          setVisible={setVisible}
          createTask={createTask}
          creationCallback={creationCallback}
        />
        <Button
          startIcon={<FilterAlt />}
          onClick={() => setQuickFilter(!quickFilter)}
        >
          {quickFilter ? "Tout afficher" : "A faire"}
        </Button>
      </ButtonGroup>
        {
            tasksToDisplay.map((task) => 
                <TodoItem task = { task }></TodoItem>
            )
        }
        </>
    )
}