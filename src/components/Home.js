import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Pagination, PaginationItem, PaginationLink, Input, Button, Form, FormGroup} from 'reactstrap';
import Actions from '../actions';

class Home extends Component {

  constructor(props) {
    super(props)
    
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }
  
  componentWillMount() {
    const {filterInfo} = this.props;
    this.props.dispatch(Actions.getUsersAction(filterInfo));
  }

  onClickEdit(value) {
    this.props.history.push("/"+value);
  }

  onChangeSearch(e) {
    let {filterInfo} = this.props;
    
    filterInfo.searchingStr = e.target.value;
    this.setState({filterInfo});
  }

  onClickSearch(e) {
    var {filterInfo} = this.props;
    filterInfo.page=1;
    this.props.dispatch(Actions.getUsersAction(filterInfo));
  }

  onPreviousClick(e) {
    e.preventDefault();
    const {filterInfo} = this.props;

    if(filterInfo.page <= 1)
    {
      filterInfo.page = 1;
    }
    else
    {
      filterInfo.page = filterInfo.page -1;
    }
    
    this.props.dispatch(Actions.getUsersAction(filterInfo));
  }

  onNextClick(e) {
    e.preventDefault();
    const {filterInfo} = this.props;

    if(filterInfo.count == filterInfo.limit)
    {
      filterInfo.page = filterInfo.page +1;
    }

    this.props.dispatch(Actions.getUsersAction(filterInfo));
  }
  
  render() {
    const { users, filterInfo} = this.props;
    
    let items = users.map((item) => {
        return (
        <div className="col-md-2 col-lg-2" key={item.id} onClick={(e) => this.onClickEdit(item.id)}>
            <div className="card">
                <img alt="Card image cap" className="card-img-top img-fluid" src={item.avatarUrl} />
                <div className="card-img-overlay sub-info">
                  <h6 className="card-title">Info:</h6>
                  <p><small className="text-muted">age: 20</small></p>
                  <p><small className="text-muted">ip: 193.168.45.66</small></p>
                </div>
                <div className="card-footer">
                    <p className="card-text">{item.name}</p>
                    
                </div>
            </div>
        </div>
            );
        });
  
      return (
        <Container>
          <Row>
            <Col>
            <Breadcrumb>
                <BreadcrumbItem active>Home</BreadcrumbItem>
            </Breadcrumb>

            <Container>
              <Row>
                <Col className="col-md-10 col-lg-10">
                  <Input type="text"
                    value={filterInfo.searchingStr} 
                    onChange={this.onChangeSearch} 
                    placeholder="Searching By Name " />
                </Col>
                <Col className="col-md-2 col-lg-2">
                  <Button color="success" onClick={this.onClickSearch}>Search</Button>
                </Col>
              </Row>
            </Container>
            
            <Container>
              <Row>
                {items}
              </Row>
            </Container>
            </Col>
          </Row>
          
            <div className="div_center">
            <Pagination>
              <PaginationItem>
                <PaginationLink previous onClick={ (e) => this.onPreviousClick(e) } />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next onClick={ (e) => this.onNextClick(e)} />
              </PaginationItem>
            </Pagination>
            </div>
          
        </Container>
      );
  }
};

Home.propTypes = {
    users: PropTypes.any.isRequired,
    filterInfo: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  
  const mapStateToProps = (state) => (
  {
    users: state.users,
    filterInfo: state.filterInfo,
  })
  
export default connect(mapStateToProps)(Home);