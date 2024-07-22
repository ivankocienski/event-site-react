import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './views/Layout';
import Root from './views/Root';
import EventsIndex from './views/EventsIndex';
import PartnersIndex from './views/PartnersIndex';
import About from './views/About';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}>

        <Route index element={<Root />} />
        <Route path='/events' element={<EventsIndex />} />
        <Route path='/partners' element={<PartnersIndex />} />
        <Route path='/about' element={<About />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
