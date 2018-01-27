/**
 * main imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 *  local imports
 */
import Layout from './components/layout';
import { Home, Login } from './components/pages';

/**
 * CSS imports
 */
import 'materialize-css/dist/css/materialize.css';
import './styles/main';

/**
 * import service worker
 */
import './worker';

// scroll the app to the top on a route change
const onUpdate = () => window.scrollTo(0, 0);

// our client-side router
const router = (
  <BrowserRouter onUpdate={onUpdate}>
    <Layout>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Layout>
  </BrowserRouter>
);

const entry = document.getElementById('react');

ReactDOM.render(router, entry);
