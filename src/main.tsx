import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './views/Layout';

import Root from './views/Root';

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

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
