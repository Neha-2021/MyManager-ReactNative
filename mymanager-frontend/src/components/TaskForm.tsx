import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

const TaskForm = ({ onFormSubmit }) => {
    const [value, setValue] = React.useState("");
    const handleSubmit = () => {
        onFormSubmit ({
            title: value,
            completed: false,
        });
        setValue("");
    }

    return (
        <Layout style={styles.rowContainer} level="1">
            <Input
                style={styles.input}
                status='basic'
                placeholder='Add your task'
                onChangeText={nextValue => setValue(nextValue)}
            />

            <View style={styles.controlContainer}>
                <Button size='tiny' onPress={handleSubmit}>
                    SUBMIT
                </Button>
            </View>
        </Layout>
    );
};

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

})

export default TaskForm;