import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthentication = async () => {
  const AuthenticatedUser = await AsyncStorage.getItem('@security_Key');
  return AuthenticatedUser;
};
