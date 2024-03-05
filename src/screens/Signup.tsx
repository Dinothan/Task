import {useAppDispatch} from '../hooks/hooks';
import Form from '../components/Form';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginSuccess} from '../store/slices/authSlice';

const SignupScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const onSignupPressed = (
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

    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(async (userCredential: {user: {getIdToken: () => any}}) => {
        const userToken = await userCredential.user.getIdToken();
        console.log('userToken: ', userToken);
        console.log('userCredential: ', userCredential);

        await AsyncStorage.setItem('@security_Key', userToken);
        const userId = firebase?.auth()?.currentUser?.uid;
        dispatch(loginSuccess(userId));
      })
      .then(() => navigation.navigate('Home'))
      .catch((error: {code: string}) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
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
