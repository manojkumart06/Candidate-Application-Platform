import React from 'react';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import JobList from './Components/JobList';
import FilterBar from './Components/FilterBar';
import store from './Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <FilterBar />
        <JobList />
      </Container>
    </Provider>
  );
};

export default App;
