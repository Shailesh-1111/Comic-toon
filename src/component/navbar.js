// Navbar.js
import React from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <Menu inverted style={{ height: '70px', padding: '15px', borderRadius: '0', background: '#B15EFF' }}>
      <Menu.Item header>
        <strong style={{ color: 'white', fontSize:"2rem"}}>Comic-Toon</strong>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <span style={{ color: 'white' }}>Feedback</span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
