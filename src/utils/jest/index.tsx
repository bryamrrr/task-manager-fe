import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducers } from '../../redux/store';

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  }: any = {}
) {
  const queryClient = new QueryClient();

  function Wrapper({ children }: { children: React.ReactChild }) {
    return (
      <Router>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      </Router>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
