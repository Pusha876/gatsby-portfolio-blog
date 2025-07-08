import React from 'react';
import { GlobalStateProvider } from './src/context';

export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
);
