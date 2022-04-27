import {useCallback} from 'react';

import Section from '../UI/Section'
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
    
    const createTask = useCallback((taskData) => {
        console.log(taskData);
        const generatedId = taskData.name;
        const createdTask = {
            id: generatedId,
            text: "taskText",
        };
        props.onAddTask(createdTask);
    }, [props]);

    const { isLoading, error, sendRequest: sendTaskRequest} = useHttp(createTask);
    
    const enterTaskHandler = async (taskText) => {
        sendTaskRequest({
            url : "https://react-http-eda55-default-rtdb.firebaseio.com/tasks.json",
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: { text: taskText},
        });
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            { error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;