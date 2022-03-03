import React from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        {/* {summary page and entry page need provider and the confirmation page does not} */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
