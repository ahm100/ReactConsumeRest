import React, { Component } from 'react';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import Input from '../../../UI/Inputs/Input';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { connect } from 'react-redux';
import moment from 'moment';

class UpdateOwner extends Component {
    state = {
        ownerForm: {},
        isFormValid: true
    }

    componentWillMount = () => {
        this.setState({ ownerForm: returnInputConfiguration() });
    }

    handleChangeEvent = (event, id) => {
        const updatedOwnerForm = { ...this.state.ownerForm };
        updatedOwnerForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, id);

        const counter = formUtilityActions.countInvalidElements(updatedOwnerForm);

        this.setState({ ownerForm: updatedOwnerForm, isFormValid: counter === 0 })
    }

    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.ownerForm });

        return (
            <Well>
                <Form horizontal onSubmit={this.updateOwner}>
                    {
                        formElementsArray.map(element => {
                            return <Input key={element.id} elementType={element.config.element}
                                id={element.id} label={element.config.label}
                                type={element.config.type} value={element.config.value}
                                changed={(event) => this.handleChangeEvent(event, element.id)}
                                errorMessage={element.config.errorMessage} invalid={!element.config.valid}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                blur={(event) => this.handleChangeEvent(event, element.id)} />
                        })
                    }
                    <br />
                    <FormGroup>
                        <Col mdOffset={6} md={1}>
                            <Button type='submit' bsStyle='info' disabled={!this.state.isFormValid}>Update</Button>
                        </Col>
                        <Col md={1}>
                            <Button bsStyle='danger' onClick={this.redirectToOwnerList}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>

            </Well>
        )
    }
}

// The mapStateToProps function is mapping the data property from the repositoryReducer’s initialState object 
// to the data property inside the updateowner component. 
// To access this data property, we just need to call it like this: this.props.data.
const mapStateToProps = (state) => {
    return {
        data: state.repository.data,
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOwnerById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onUpdateOwner: (url, owner, props) => dispatch(repositoryActions.putData(url, owner, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOwner);
