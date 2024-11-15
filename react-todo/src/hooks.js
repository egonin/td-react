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
    return {createTask};
}

export const useTodos = () => {
    const { tasks, isLoading, error, setTasks } =useTasks();
    const { createTask } = useTaskActions();
    const [visible, setVisible] = useState(false);
    const [quickFilter, setQuickFilter] = useState(false);
    
    const tasksToDisplay = useMemo(() => {
        if (!quickFilter) {
          return tasks;
        } else {
          return tasks.filter(({ done }) => !done);
        }
      }, [tasks, quickFilter]);
    
    const creationCallback = (newTask) => setTasks([newTask, ...tasks]);

    return {
        isLoading,
        error,
        quickFilter,
        setQuickFilter,
        tasksToDisplay,
        createTask,
        visible,
        setVisible,
        creationCallback,
    };


}