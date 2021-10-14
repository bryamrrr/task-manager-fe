import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
