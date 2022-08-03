import React from 'react';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

const Container = React.lazy(() => import('./components/Container'));

export default {
  Container,
  actions,
  actionTypes,
  reducer,
  constants,
  selectors,
};
