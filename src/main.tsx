import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import store from './data/store';
import { Provider } from 'react-redux';

import Layout from './views/Layout';
import Root from './views/Root';
import EventsIndex from './views/EventsIndex';
import PartnersIndex from './views/PartnersIndex';
import PartnerShow from './views/PartnerShow';
import About from './views/About';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';

// import { getSummary } from './data/api';
// getSummary();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}>

        <Route index element={<Root />} />
        <Route path='/events' element={<EventsIndex />} />
        <Route path='/partners' element={<PartnersIndex />} />
        <Route path='/partners/:id' element={<PartnerShow />} />
        <Route path='/about' element={<About />} />
    </Route>
  )
);

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );

/*   const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<Layout />}>
  
          <Route index element={<Root />} />
          <Route path='/events' element={<EventsIndex />} />
          <Route path='/partners' element={<PartnersIndex />} />
          <Route path='/partners/:id' element={<PartnerShow />} />
          <Route path='/about' element={<About />} />
      </Route>
    )
  ); */