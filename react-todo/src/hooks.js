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

      const markAsDone = useCallback(async (id) => {
        try {
          const response = await fetch(`${URL}${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: true }),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          alert(error);
        }
      }, []);

      const markAsTodo = useCallback(async (id) => {
        try {
          const response = await fetch(`${URL}${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: false }),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          alert(error);
        }
      }, []);

    return {createTask, deleteTask, markAsDone, markAsTodo};
}

export const useTodos = () => {
    const { tasks, isLoading, error, setTasks } =useTasks();
    const { createTask, deleteTask, markAsDone, markAsTodo } = useTaskActions();
    const [visible, setVisible] = useState(false);
    
    const tasksToDisplay = tasks;
    
    const removeTask = useCallback(
    async (id) => {
        await deleteTask(id);
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
    },
    [deleteTask, setTasks]
    )

    const setAsDone = async (id) => {
        const updatedTask = await markAsDone(id);
        setTasks((tasks) =>
          tasks.map((task) => (task.id === id ? updatedTask : task))
        );
      };
    
      const setAsTodo = async (id) => {
        const updatedTask = await markAsTodo(id);
        setTasks((tasks) =>
          tasks.map((task) => (task.id === id ? updatedTask : task))
        );
      };

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
        setAsDone,
        setAsTodo,
    };


}