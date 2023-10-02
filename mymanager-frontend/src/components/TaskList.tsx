import React, { useEffect } from 'react';
import { Divider, List, ListItem, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import { createTask, deleteTask, loadTask, updateTask } from '../services/taskServices';
import TaskItems from '../components/TaskItems';
import { StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';

const TaskList = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);

    const handleFormSubmit = (task) => {
        console.log('Task to create', task);
        createTask(task).then((task) => onRefresh());
    };

    const handleRemoveTask = (task) => {
        console.log('Task to remove', task);
        deleteTask(task.id).then((task) => onRefresh());
    };

    const handleToggleTaskStatus = (task) => {
        console.log('Task to toggle', task);
        task.completed = !task.completed;
        updateTask(task).then((task) => onRefresh());
    };

    const refresh =async () => {
        await loadTask().then((tasks) => {
            setTasks(tasks);
            console.log('Tasks', tasks);
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refresh().then(() => setRefreshing(false));
        console.log('Refreshing state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <>
            <TopNavigation title= 'MyManager' alignment='center'/>
            <Divider />
            <TaskForm onFormSubmit={handleFormSubmit}/>
            <Divider />
            {refreshing ? (
                <Spinner/>
            ) : (
                <>
                    {tasks.length > 0 ? (
                        <List
                        data={tasks}
                        ItemSeparatorComponent={Divider}
                        renderItem= {(item)=> TaskItems(item, handleRemoveTask, handleToggleTaskStatus)}
                        />
                    ) : (
                    <Text>  No task found!   </Text>
                )}
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({

    // header: {
    //     flex: 2,
    //     marginTop: 5,
    //     color: 'blue',
    //     fontsize: '24px',
    //     fontWeight: 'bold'

    // },
    
    input: {
        flex: 1,
        margin: 2,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    controlContainer: {
        borderRadius: 3,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    },

})
export default TaskList;