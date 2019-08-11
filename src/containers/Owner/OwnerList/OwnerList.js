import React, { Component } from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Owner from '../../../components/OwnerComponents/Owner/Owner';

import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';

class OwnerList extends Component {
    componentDidMount = () => {
        // let url = '/api/owner';
        let url = '/employees';
        this.props.onGetData(url, { ...this.props });
    }

    render() {
        let owners = [];
        if (this.props.data && this.props.data.length > 0) {
            owners = this.props.data.map((owner) => {
                return (
                    // <Owner key={owner.id} owner={owner} {...this.props} />
                    <Owner key={owner.id} owner={owner} {...this.props} />
                )
            })
            //owner is assigned to <tbody> of follwoing table

        }

        return (
            <Aux>
                <Row>
                    <Col mdOffset={10} md={2}>
                        <Link to='/create' >Create Owner</Link>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th sm={2} md={1} style={{ margin: 0 }}>employee_name</th>
                                    <th style={{ 'wordWrap': 'break-word', width: 2 }}>employee_salary</th>
                                    <th>employee_age</th>
                                    <th>profile_image</th>
                                    <th>Details</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {owners}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Aux>
        )
    }
}
// The mapStateToProps function is mapping the data property from the repositoryReducer’s initialState object 
// to the data property inside the OwnerList component. 
// To access this data property, we just need to call it like this: this.props.data.
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
// the Central Store maps data property comming from reducer to this component with the mapStateToProps function.
const mapDispatchToProps = (dispatch) => {
    return {
        //oncGetData with follow manner is going to be a property of this component and is called at didmount() life sycle
        // The mapDispatchToProps function is creating additional property onGetData. We may call it with the: this.props.onGetData statement. Then, it is going to dispatch the action inside the repositoryActions.js file which is going to fetch the data from the server.
        onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerList);