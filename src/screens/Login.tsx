import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Layout';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {useAppDispatch} from '../hooks/hooks';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
// import {login} from '../store/thunk/authThunk';
import ErrorComponent from '../components/Error';
import {loginSuccess} from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import Form from '../components/Form';
// import {auth} from '../firebase/firebaseConfig';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type LoginScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  const onLoginPressed = (
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
      .signInWithEmailAndPassword(username, password)
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

    // Dispatch login action
    // dispatch(login({username, password}))
    //   .unwrap()
    //   .then(() => navigation.navigate('Home'))
    //   .catch((error: any) => {
    //     console.error(error);
    //     setErrorMessage('Login failed. Please try again.');
    //   });
  };

  return (
    <Form
      onLoginPressed={onLoginPressed}
      buttonLabel="Login"
      navText="Don’t have an account?"
      navButtonLabel="Signup"
      navigation={navigation}
    />
    // <Background>
    //   <Header>Task Managment</Header>
    //   {errorMessage && <ErrorComponent message={errorMessage} />}
    //   <TextInput
    //     label="Username"
    //     returnKeyType="next"
    //     value={username}
    //     onChangeText={setUsername}
    //     error={!!errorMessage}
    //   />

    //   <TextInput
    //     label="Password"
    //     returnKeyType="done"
    //     value={password}
    //     onChangeText={setPassword}
    //     error={!!errorMessage}
    //     secureTextEntry
    //   />

    //   <View style={styles.forgotPassword}>
    //     <TouchableOpacity>
    //       <Text style={styles.label}>Forgot your password?</Text>
    //     </TouchableOpacity>
    //   </View>

    //   <Button mode="contained" onPress={_onLoginPressed}>
    //     Login
    //   </Button>

    //   <View style={styles.row}>
    //     <Text style={styles.label}>Don’t have an account? </Text>
    //     <TouchableOpacity>
    //       <Text style={styles.link}>Sign up</Text>
    //     </TouchableOpacity>
    //   </View>
    // </Background>
  );
};

// const styles = StyleSheet.create({
//   forgotPassword: {
//     width: '100%',
//     alignItems: 'flex-end',
//     marginBottom: 24,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//   },
//   label: {
//     color: theme.colors.secondary,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// });

export default LoginScreen;
