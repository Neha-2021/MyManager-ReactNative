import { Button, CheckBox, Icon, Layout, List, ListItem } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet} from "react-native";

const TaskItems = ({item}, handleRemoveTask, handleToggleTaskStatus) => {
    console.log('Remove', handleRemoveTask);
    console.log('Toggle', handleToggleTaskStatus);

    return (
        <ListItem
            title={`${item.title}`}
            description={`${item.title}`}
            accessoryRight={
                <RenderAccessory
                    task={item}
                    onToggle={handleToggleTaskStatus}
                    onDelete={handleRemoveTask}
                />
            }
        />
    )
}

const RenderAccessory = ({ task, onToggle, onDelete}) => {
    const [checked, setChecked] = useState(task.completed);

    const DeleteIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );
        return (
            <Layout style={styles.container}>
                <Layout style={styles.layout} level="1">
                <CheckBox
                    checked={checked}
                    onChange={nextChecked => {
                        setChecked(nextChecked);
                        onToggle(task);
                    }}
                    />
                </Layout>
                <Layout style={styles.layout} level="1">
                <Button
                    size='tiny'
                    accessoryLeft={DeleteIcon}
                    onPress={() => onDelete(task)}
                />
                </Layout>
            </Layout>
        );
}

const styles = StyleSheet.create({

    input: {
        flex: 1,
        margin: 2,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    controlContainer: {
        borderRadius: 3,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    },

    button: {

    },

    container: {
        flex: .5,
        flexDirection: 'row',
    },

    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TaskItems;
