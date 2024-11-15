import { useCallback, useEffect, useState, useMemo } from "react";

const URL = "http://localhost:5000/tasks/"

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setTasks(data.filter(({ title }) => Boolean(title)));
        } catch (error){
            setError(error);
        } finally {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, isLoading, error, setTasks};  
};

export const useTaskActions = () => {

    const createTask = useCallback(async (title) => {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title}),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error("bad request, unique title ?");
        }
        return data;
    }, []);

    const deleteTask = useCallback(async (id) => {
        try {
          await fetch(`${URL}${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          alert(err);
        }
      }, []);

    return {createTask, deleteTask};
}

export const useTodos = () => {
    const { tasks, isLoading, error, setTasks } =useTasks();
    const { createTask, deleteTask } = useTaskActions();
    const [visible, setVisible] = useState(false);
    
    const tasksToDisplay = tasks;
    
    const removeTask = useCallback(
    async (id) => {
        await deleteTask(id);
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
    },
    [deleteTask, setTasks]
    )

    const creationCallback = (newTask) => setTasks([newTask, ...tasks]);

    return {
        isLoading,
        error,
        tasksToDisplay,
        createTask,
        removeTask,
        visible,
        setVisible,
        creationCallback,
    };


}