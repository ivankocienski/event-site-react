import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';

const Layout: React.FC = () => (
  <>
    <header>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/partners'>Partners</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <p>This is the footer</p>
    </footer>
  </>
);

export default Layout;