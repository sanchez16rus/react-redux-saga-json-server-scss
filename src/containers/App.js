import React, { Component } from 'react';
import RootRouting from '../routers';
import { Container, Row, Col} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <RootRouting />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
