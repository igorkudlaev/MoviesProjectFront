import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext, FC, useState, useEffect, useCallback} from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import LockScreen from '../screens/lock/LockScreen';

type BiometricAuthContextType = {
  biometricEnabled: boolean;
  auth?: (failure?: () => Promise<void>) => Promise<void>;
  disable?: () => Promise<void>;
  init?: (success?: () => void) => Promise<void>;
};

const initialState: BiometricAuthContextType = {
  biometricEnabled: false,
};

const BiometricAuthContext = React.createContext(initialState);

export const useBiometricAuth = () => useContext(BiometricAuthContext);

export const BiometricContextProvider: FC = ({children}) => {
  const [enabled, setEnabled] = useState(false);
  const [synced, setSynced] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const syncEnabledState = async () => {
    const value = await AsyncStorage.getItem('ENABLED_BIOMETRIC_AUTH');
    if (value) {
      setEnabled(true);
    }
    setSynced(true);
  };
  useEffect(() => {
    syncEnabledState();
  }, []);

  const init = useCallback(async (success?: () => void) => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Auth',
    });
    if (result.success) {
      AsyncStorage.setItem('ENABLED_BIOMETRIC_AUTH', 'true');
      success?.();
      setIsAuthorized(true);
      setEnabled(true);
    }
  }, []);
  const logIn = async () => {
    if (enabled && !isAuthorized && synced) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Auth',
      });
      if (result.success) {
        setIsAuthorized(true);
        return;
      }
      await logIn();
    }
  };
  const disable = useCallback(async () => {
    await AsyncStorage.removeItem('ENABLED_BIOMETRIC_AUTH');
    setEnabled(false);
    setIsAuthorized(false);
  }, []);

  useEffect(() => {
    logIn();
  }, [enabled, isAuthorized, synced]);

  return (
    <BiometricAuthContext.Provider
      value={{biometricEnabled: enabled, init, disable}}>
      {enabled && !isAuthorized ? <LockScreen /> : children}
    </BiometricAuthContext.Provider>
  );
};
