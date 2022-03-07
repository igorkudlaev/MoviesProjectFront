import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/routing/RootNavigator';
import {UserContexProvider} from './src/store/user.context';
import 'react-native-gesture-handler';
import {MovieInfoContextProvider} from './src/store/movie.info.context';

function App() {
  return (
    <SafeAreaProvider>
      <UserContexProvider>
        <MovieInfoContextProvider>
          <RootNavigation />
        </MovieInfoContextProvider>
      </UserContexProvider>
    </SafeAreaProvider>
  );
}

export default App;
