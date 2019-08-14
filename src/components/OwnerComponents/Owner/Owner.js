import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

const redirectToOwnerDetails = (id, history) => {
    history.push('/owner/' + id);
}

const redirectToUpdateOwner = (id, history) => {
    // history.push('/updateOwner/' + id);
    history.push('/updateOwner/' + id);
}

const rediterctToDeleteOwner = (id, history) => {
    history.push('/delete/' + id);
}

// const cellStyle = {
//     color: 'blue',
//     'whitespace': 'normal !important',
//     'wordWrap': 'break-word',
//     width:100
//   };

const owner = (props) => {
    return (
        <Aux>
            <tr>
                {/* <td>{props.owner.name}</td> */}
                <td>{props.owner.id}</td>
                {/* <td  style={cellStyle}>{props.owner.employee_name}</td> */}
                <td  style={{ margin: 0,width:100}}>{props.owner.employee_name}</td>
                <td style={{margin:0}}>{props.owner.employee_salary}</td>
                <td>{props.owner.employee_age}</td>
                <td>{props.owner.profile_image}</td>
                {/* <td><Moment format="DD/MM/YYYY">{props.owner.dateOfBirth}</Moment></td> */}
                {/* <td>{props.owner.address}</td> */}
                <td>
                    <Button onClick={() => redirectToOwnerDetails(props.owner.id, props.history)}>Details</Button>
                </td>
                <td>
                    <Button bsStyle="success" onClick={() => redirectToUpdateOwner(props.owner.id, props.history)}>Update</Button>
                </td>
                <td>
                    <Button bsStyle="danger" onClick={() => rediterctToDeleteOwner(props.owner.id, props.history)}>Delete</Button>
                </td>
            </tr>
        </Aux>
    )
}

export default owner;