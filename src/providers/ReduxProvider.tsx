"use client"

import type { ReactNode } from 'react';
import store from '@/state-management/store/Store';
import {Provider} from "react-redux";

const ReduxProvider = ({ children }:{children:ReactNode}) => {
  return (
      <Provider store={store}>
        {children}
      </Provider>
  );
};

export default ReduxProvider;