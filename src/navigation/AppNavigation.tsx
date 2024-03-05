import React, {useEffect, useState} from 'react';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
// import ProfileScreen from '../screens/Profile';
// import CardScreen from '../screens/Card';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {RootStackParamList} from '../types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTaskScreen from '../screens/AddTask';
import {TouchableOpacity} from 'react-native';
import {logout} from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../screens/Signup';
import CategoryScreen from '../screens/Category';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const isAuthenticatedUser = useAppSelector(
    state => state.auth.isAuthenticated,
  );

  const dispatch = useAppDispatch();

  const HomeTabScreen = ({route, navigation}: any) => {
    const handleLogout = async () => {
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.navigate('Login');
    };

    return (
      <Tab.Navigator
        screenOptions={{
          headerRight: () => (
            // logout
            <TouchableOpacity style={{marginRight: 10}} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} />
            </TouchableOpacity>
          ),
          unmountOnBlur: true,
        }}>
        <>
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
              //   title: route.params?.params?.task?.id ? 'Edit Task' : 'Add Task',
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
        </>
      </Tab.Navigator>
    );
  };

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
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
export default AppNavigation;
