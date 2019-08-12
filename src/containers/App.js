import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
//import OwnerList from './Owner/OwnerList/OwnerList';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import InternalServer from '../components/ErrorPages/InternalServer/InternalServer';

const AsyncOwnerList = asyncComponent(() => {
  return import('./Owner/OwnerList/OwnerList');
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/owner-list" component={AsyncOwnerList} />
            {/* <Route path="/owner-list" component={OwnerList} /> */}
            <Route path="*" component={NotFound} />
            <Route path="/500" component={InternalServer} />
            <Route path="/internalError" component={InternalServer} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
