import * as React from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  Text,
  SectionListData,
  FlatList,
} from 'react-native';
import {List} from 'react-native-paper';
import {Task, TaskListProps} from '../types/task';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonIcon from './ButtonIcon';
import firestore from '@react-native-firebase/firestore';

const TaskListComponent = ({
  TaskList,
  navigation,
  setNewTaskList,
}: TaskListProps) => {
  const handleNavigateToAddTask = (task: Task) => {
    // navigation.navigate('Add Task', {
    //   id,
    // });
    navigation.navigate('Home', {
      screen: 'Add Task',
      params: {task},
    });
  };

  const handleDeleteTask = (id: string) => {
    firestore()
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        setNewTaskList();
        console.log('Document successfully deleted!');
      })
      .catch((error: any) => {
        console.error('Error deleting document: ', error);
      });
  };

  return (
    <FlatList
      data={TaskList}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
        <List.Accordion
          title={item.title}
          left={props => <List.Icon {...props} icon="folder" />}>
          <View style={styles.row}>
            <View style={styles.item}>
              <List.Item title={`Description: ${item.description}`} />
              <List.Item title={`Due Date: ${item.dueDate}`} />
            </View>

            <ButtonIcon
              handleonPress={() => handleNavigateToAddTask(item)}
              icon={'playlist-edit'}
            />
            <ButtonIcon
              handleonPress={() => handleDeleteTask(item.id.toString())}
              icon={'delete'}
            />
          </View>
        </List.Accordion>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: -25,
    // marginHorizontal: 16,
    // marginBottom: 8,
  },
  item: {
    flex: 1,
  },
});

export default TaskListComponent;
