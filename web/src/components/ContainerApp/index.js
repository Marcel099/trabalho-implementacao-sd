import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export function ContainerApp({ children }) {
  return (
    <>
      <CssBaseline />
      <Container>
        { children }
      </Container>
    </>
  )
}