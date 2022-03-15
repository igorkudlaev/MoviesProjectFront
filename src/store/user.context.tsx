import React, {useCallback, useContext, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

type UserContextType = {
  tokens: Tokens;
  setTokens?: (value: Tokens) => void;
  clearAccessToken?: () => void;
};

const initialState: UserContextType = {
  tokens: {
    access_token: '',
    refresh_token: '',
  },
};

const UserContext = React.createContext(initialState);

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({children}: any) => {
  const [tokens, setTokens] = useState(initialState.tokens);
  const [synced, setSynced] = useState(false);
  useEffect(() => {
    if (tokens.refresh_token && tokens.refresh_token) {
      Keychain.setGenericPassword('token', JSON.stringify(tokens));
    }
  }, [tokens]);

  useEffect(() => {
    Keychain.getGenericPassword().then(value => {
      if (value) {
        setTokens(JSON.parse(value.password));
      }
      setSynced(true);
    });
  }, []);
  const clearAccessToken = useCallback(() => {
    setTokens(initialState.tokens);
    Keychain.resetGenericPassword();
  }, []);
  return synced ? (
    <UserContext.Provider
      value={{
        tokens,
        setTokens,
        clearAccessToken,
      }}>
      {children}
    </UserContext.Provider>
  ) : (
    <></>
  );
};

export default UserContext;
