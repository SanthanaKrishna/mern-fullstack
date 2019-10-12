import React, { PureComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fieldvalidation from '../../../utils/validation';

import { signup } from './ActionCreator';

class CreateAccount extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }
    handleInputChange = (event, setFieldValue) => {
        const { name, value } = event.target;
        let inputValue = '';
        if (name === 'username') {
            inputValue = Fieldvalidation.limitMaxValue(value, 30);
            setFieldValue(name, inputValue);
            this.setState({
                username: inputValue
            })
        } else if (name === 'emailID') {
            // inputValue = Fieldvalidation.emailValidate(value, Errors)
            setFieldValue(name, value)
            this.setState({
                email: value
            })
        } else if (name === 'newPassword' || name === 'confirmPassword') {
            // inputValue = Fieldvalidation.phoneNumberValidate(value, Errors)
            setFieldValue(name, value)
            this.setState({
                password: value
            })
        }
        // else if (name === 'phoneNumber') {
        //     inputValue = Fieldvalidation.allowOnlyNumber(value);
        //     let phoneNumber = Fieldvalidation.limitMaxValue(inputValue, 10);
        //     setFieldValue(name, phoneNumber);
        // }
    }
    handleSubmit = (values) => {
        this.props.signup(values)
    }

    // navToLoginPage = () => {
    //     this.props.history.push('./login')
    // }
    render() {
        const { username, email, password } = this.state;
        return (
            <div className="left-box">
                <Formik
                    initialValues={{
                        username: '',
                        emailID: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={(values) => {
                        let errors = {};
                        if (values.newPassword !== values.confirmPassword) {
                            errors.confirmPassword = "confirm password should match password"
                        }
                        return errors;
                    }}
                    onSubmit={async (values, actions) => {
                        const { username, emailID, newPassword } = values
                        const signupInput = {
                            username,
                            email: emailID,
                            password: newPassword
                        }
                        this.handleSubmit(signupInput);
                    }}
                    render={props => (
                        <Form >
                            <h3>Create Account</h3>
                            <div>
                                {/* <label>User Name</label> */}
                                <Field
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    placeholder="User Name"
                                    required
                                    value={props.values.firstName}
                                    onChange={(ev) => this.handleInputChange(ev, props.setFieldValue)}
                                />
                                <ErrorMessage name="firstName" />
                            </div>
                            <div>
                                {/* <label>E-mail</label> */}
                                <Field
                                    className="form-control"
                                    name="emailID"
                                    type="email"
                                    placeholder="Email Id"
                                    autoComplete="off"
                                    required
                                    value={props.values.email}
                                    onChange={(ev) => this.handleInputChange(ev, props.setFieldValue)}
                                />
                                <ErrorMessage name="emailID" />
                            </div>
                            <div>
                                {/* <label>Password</label> */}
                                <Field
                                    className="form-control"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    required
                                    value={props.values.password}
                                    onChange={(ev) => this.handleInputChange(ev, props.setFieldValue)}
                                />
                                <ErrorMessage name="password" />
                            </div>
                            <div>
                                {/* <label>Confirm Password</label> */}
                                <Field
                                    className="form-control"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    autoComplete="off"
                                    required
                                    value={props.values.confirmEmail}
                                    onChange={(ev) => this.handleInputChange(ev, props.setFieldValue)}
                                />
                                <ErrorMessage name="confirmPassword" />
                            </div>
                            {/* <button className="form-submit" type="submit" disabled={props.isSubmitting}>Signup</button> */}
                            <button className="form-submit" type="submit" >Signup</button>

                        </Form>
                    )}
                />
                <p>--or--</p>

                {/* <div className="right-box">
                    <h3>Sign in with other options</h3>

                    <div className="nav-signin">
                        <GoogleSign />
                        <button className="btn btn-warning" onClick={this.navToLoginPage}>Log-in with Email</button>
                        <button className="btn btn-danger">Log-in with Google</button>
                        <button className="btn btn-primary">Log-in with Facebook</button>
                    </div>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: bindActionCreators(signup, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);