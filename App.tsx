import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/routing/RootNavigator';
import {UserContexProvider} from './src/store/user.context';
import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';

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
        <UserContexProvider>
          <RootNavigation />
        </UserContexProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
