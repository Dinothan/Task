import React, {useCallback} from 'react';
import {useAppDispatch} from '../hooks/hooks';
import Form from '../components/Form';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginSuccess} from '../store/slices/authSlice';

const SignupScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  // Function to handle signup button press
  const onSignupPressed = useCallback(
    (
      username: string,
      password: string,
      setErrorMessage: (arg0: string) => void,
    ) => {
      // Validation
      if (!username.trim() && !password.trim()) {
        setErrorMessage('Please enter username and password');
        return;
      }
      if (!username.trim()) {
        setErrorMessage('Please enter username');
        return;
      }
      if (!password.trim()) {
        setErrorMessage('Please enter password');
        return;
      }

      // Attempt signup
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(async (userCredential: {user: {getIdToken: () => any}}) => {
          const userToken = await userCredential.user.getIdToken();

          // Store token in AsyncStorage
          await AsyncStorage.setItem('@security_Key', userToken);

          // Dispatch login success action
          const userId = firebase?.auth()?.currentUser?.uid;
          dispatch(loginSuccess(userId));
        })
        .then(() => navigation.navigate('Home'))
        .catch((error: {code: string}) => {
          // Handle authentication errors
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            setErrorMessage('That email address is invalid!');
          }
          console.error(error);
        });
    },
    [dispatch, navigation],
  );

  return (
    <Form
      onLoginPressed={onSignupPressed}
      buttonLabel="Signup"
      navText="Already have an account?"
      navButtonLabel="Login"
      navigation={navigation}
    />
  );
};
export default SignupScreen;
