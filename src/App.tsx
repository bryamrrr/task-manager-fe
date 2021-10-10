import { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './components/styles/theme';
import AppRoutes from './components/router/AppRoutes';
import { GlobalStyles } from './components/styles/globalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './redux/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity },
  },
});

function App() {
  const [theme] = useState<'light' | 'dark'>('dark');

  // const themeToggler = () => {
  //   theme === 'dark' ? setTheme('light') : setTheme('dark');
  // };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <GlobalStyles />
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
