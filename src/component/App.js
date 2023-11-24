import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import TextInput from './text_input';
import Navbar from './navbar.js'

const App = () => {
 
  return (
    <div>
      <Navbar/>
    <Container style={{ marginTop: '4em' }}>
      <TextInput/>

    </Container>
    </div>
    
  );
};

export default App;