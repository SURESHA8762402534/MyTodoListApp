import React from 'react';
import LoginScreen from './screens/LoginScreen';
import TodoScreen from './screens/TodoScreen';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';

import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (isAuthenticated ? <TodoProvider><TodoScreen /></TodoProvider> : <LoginScreen />)}
        </AuthContext.Consumer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
