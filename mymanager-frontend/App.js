import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import TaskList from './src/components/TaskList';

const HomeScreen = () => (
    <Layout style = {{ flex : 1 }}>
        <SafeAreaView>
            <TaskList></TaskList>
        </SafeAreaView>
    </Layout>
);

export default () => {
  return (
    <>
        <IconRegistry icons = { EvaIconsPack }/>
        <ApplicationProvider {...eva} theme = { eva.light }>
            <HomeScreen />
        </ApplicationProvider>
    </>
  );
}


