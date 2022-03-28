import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/routing/RootNavigator';
import {UserContextProvider} from './src/store/user.context';
import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AxiosContextProvider} from './src/store/axios.context';
import {BiometricContextProvider} from './src/store/biometric.auth';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <BiometricContextProvider>
          <UserContextProvider>
            <AxiosContextProvider>
              <RootNavigation />
            </AxiosContextProvider>
          </UserContextProvider>
        </BiometricContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
