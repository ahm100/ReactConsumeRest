import React, { Component } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';

class CreateOwner extends Component {
    state = {
        ownerForm: {},
        isFormValid: false
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

    createOwner = (event) => {
        event.preventDefault();

        const ownerToCreate = {
            // name: this.state.ownerForm.name.value,
            employee_name: this.state.ownerForm.employee_name.value,
            // address: this.state.ownerForm.address.value,
            employee_salary: this.state.ownerForm.employee_salary.value,
            employee_age: this.state.ownerForm.employee_age.value,
            dateOfBirth: this.state.ownerForm.dateOfBirth.value
        }

        const url = '/create';//this url is attached to base url of axios using in repositoryaction
        this.props.onCreateOwner(url, ownerToCreate, { ...this.props });
    }

    redirectToOwnerList = () => {
        this.props.history.push('/owner-List');
    }

    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.ownerForm });
        return (
            <Well>
                <Form horizontal onSubmit={this.createOwner}>
                    {
                        formElementsArray.map(element => {
                            return <Input key={element.id} elementType={element.config.element} 
                                id={element.id} label={element.config.label}
                                type={element.config.type} value={element.config.value} 
                                changed={(event) => this.handleChangeEvent(event, element.id)}
                                errorMessage={element.config.errorMessage} 
                                invalid={!element.config.valid} shouldValidate={element.config.validation}
                                touched={element.config.touched} 
                                blur={(event) => this.handleChangeEvent(event, element.id)} />
                        })
                    }
                    <br />
                    <FormGroup>
                        <Col mdOffset={6} md={1}>
                            <Button type='submit' bsStyle='info' disabled={!this.state.isFormValid}>Create</Button>
                        </Col>
                        <Col md={1}>
                            <Button bsStyle='danger' onClick={this.redirectToOwnerList}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <SuccessModal show={this.props.showSuccessModal} 
                              modalHeaderText={'Success message'} 
                              modalBodyText={'Action completed successfully'}
                              okButtonText={'OK'} 
                              successClick={() => this.props.onCloseSuccessModal('/owner-List', { ...this.props })} />

                <ErrorModal show={this.props.showErrorModal} 
                            modalHeaderText={'Error message'} 
                            modalBodyText={this.props.errorMessage}
                            okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
            </Well>
        )
    }
}

// The mapStateToProps function is mapping the data property from the repositoryReducer’s initialState object 
// to the data property inside the createowner component. 
// To access this data property, we just need to call it like this: this.props.data.
const mapStateToProps = (state) => {
    return {
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateOwner: (url, owner, props) => dispatch(repositoryActions.postData(url, owner, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOwner);