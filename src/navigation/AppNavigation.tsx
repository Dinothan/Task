import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {RootStackParamList} from '../types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../store/slices/authSlice';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import AddTaskScreen from '../screens/AddTask';
import CategoryScreen from '../screens/Category';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const isAuthenticatedUser = useAppSelector(
    state => state.auth.isAuthenticated,
  );
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    dispatch(logout());
  }, [dispatch]);

  const logoutButton = useMemo(
    () => (
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} />
      </TouchableOpacity>
    ),
    [handleLogout],
  );

  const HomeTabScreen = useCallback(
    ({navigation}: any) => (
      <Tab.Navigator
        screenOptions={{
          headerRight: () => logoutButton,
          unmountOnBlur: true,
        }}>
        <Tab.Screen
          name="Task List"
          options={{
            headerLeft: () => null,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Add Task"
          options={{
            headerLeft: () => null,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            ),
          }}
          component={AddTaskScreen}
        />
        <Tab.Screen
          name="Category"
          options={{
            title: 'Category',
            headerLeft: () => null,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
          component={CategoryScreen}
        />
      </Tab.Navigator>
    ),
    [logoutButton],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      {isAuthenticatedUser && (
        <Stack.Screen
          name="Home"
          component={HomeTabScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
  },
});

export default AppNavigation;
