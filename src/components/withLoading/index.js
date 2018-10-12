import React from 'react';
import { Loading } from '../Loading';

export const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading
        ? <Loading />
        : <Component {...rest} />