import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotFound from '../components/ErrorPages/NotFound/NotFound';
//import OwnerList from './Owner/OwnerList/OwnerList';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import internalServer from '../components/ErrorPages/InternalServer/InternalServer';
import CreateOwner from './Owner/CreateOwner/CreateOwner';
import UpdateOwner from './Owner/UpdateOwner/UpdateOwner';
import DeleteOwner from './Owner/DeleteOwner/DeleteOwner';



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
            <Route path="/create" component={CreateOwner} />
            <Route path="/updateOwner/:id" component={UpdateOwner} />
            <Route path="/delete/:id" component={DeleteOwner} />

            {/* baghiye route ha ghabl az ina biad vaela kar nemikone */}
            <Route path="/500" component={internalServer} />
            <Route path="/internalError" component={internalServer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;