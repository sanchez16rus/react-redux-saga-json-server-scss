import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MyBreadcrumb from './Breadcrumb';
import { Alert } from 'reactstrap';
import Actions from '../actions';

class UserEdit extends Component {

  constructor(props) {
    super(props)
    
    this.handlerFormSubmit = this.handlerFormSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
    this.props.dispatch(Actions.getUserAction(this.props.match.params.id));
  }

  handlerFormSubmit(e) {
    e.preventDefault();
    var {user} = this.props;
    
    this.props.dispatch(Actions.updateUserAction(user));
    this.props.history.push("/");
  }

  onChangeName(e){
    let {user} = this.props;
    
    user.name = e.target.value;
    this.setState({user});
  }

  render() {
    let {user} = this.props;

    if (!user) {
      return <div>Sorry, but the user was not found</div>
    };

    return (
      <Container>
        <MyBreadcrumb/>
            { user.id > 0 ? 
              (
                <Alert color="success">
                  <strong>Editing</strong>
                </Alert>
              )
             : 
             (
              <Alert color="primary">
                <h4>Creation</h4>
              </Alert>
             )}
        <Row>
          <Col className="col-4"></Col>
          <Col className="col-4">
            
            <Form onSubmit={ (e) => this.handlerFormSubmit(e) }>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" required
                      value={user.name} 
                      onChange={this.onChangeName} 
                      placeholder="Enter Name" />
              </FormGroup>
              <Button color="success">Save</Button>
              
            </Form>
          </Col>
          <Col className="col-4"></Col>
        </Row>
      </Container>
    );
  }
};

UserEdit.propTypes = {
  user: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
{
  user: state.userSingle
})

export default connect(mapStateToProps)(UserEdit);