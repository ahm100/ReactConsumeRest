import moment from 'moment';
 
export const returnInputConfiguration = () => {
    return {
        employee_name: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Name:'
        },
        employee_salary: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true, maxLength: 60 }, valid: false, touched: false,
            errorMessage: '', label: 'Salary:'
        },
        employee_age: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true, maxLength: 60 }, valid: false, touched: false,
            errorMessage: '', label: 'Age:'
        },
        dateOfBirth: {
            element: 'datePicker', type: 'text', value: moment(), 
            valid: true, touched: false,
            errorMessage: '', label: 'Date of birth:'
        }
    }
}