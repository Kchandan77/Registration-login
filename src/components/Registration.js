import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';

const getDataFromLS = () => {
    const loginData = localStorage.getItem('users');
    if (loginData) {
        return JSON.parse(loginData);
    } else
        return [];
}

const getLoginDetails = () => { 
    const loginDetails = localStorage.getItem('loginUsers');
    if (loginDetails) {
        return JSON.parse(loginDetails);
    } else
        return [];
}
export const Registration = () => {
    const loginDateTime = new Date().toLocaleString();

    const [users, setUsers] = useState(getDataFromLS());
    const [loginUsers, setloginUsers] = useState(getLoginDetails());
    const [signUpFormValues, setSignUpFormValues] = useState({
        signUpUserName: '',
        mobileNumber: '',
        email: '',
        signUpPassword: '',
        role:'',
        signUpErrors: {}
    });

    const [loginFormValues, setLoginFormValues] = useState({
        userName: '',
        password: '',
        loginErrors: {},
        loginDateTime,
    });

    const signUpFormValidation = () => {
        const signUpErrors = {};
        let signUpFormIsValid = true;

        //for Name
        if (!signUpFormValues.signUpUserName) {
            signUpFormIsValid = false;
            signUpErrors.signUpUserNameError = 'Name is required';
        }
        //for mobile
        if (!signUpFormValues.mobileNumber) {
            signUpFormIsValid = false;
            signUpErrors.mobileNumberError = 'Mobile number is required';
        } else if (signUpFormValues.mobileNumber.length !== 10) {
            signUpFormIsValid = false;
            signUpErrors.mobileNumberError = 'Please enter a valid mobile number';
        }
        //for Email
        if (!signUpFormValues.email) {
            signUpFormIsValid = false;
            signUpErrors.emailError = 'Email is required';
        }
        //for signUp password
        if (!signUpFormValues.signUpPassword) {
            signUpFormIsValid = false;
            signUpErrors.signUpPasswordError = 'Password is required';
        }
        // for role
        if (!signUpFormValues.role) {
            signUpFormIsValid = false;
            signUpErrors.roleError = 'Role is required';
        }
        setSignUpFormValues({ signUpErrors });
        return signUpFormIsValid;

    }

    const loginFormValidation = () => {
        const loginErrors = {};
        let loginFormIsValid = true;

        //for User Name
        if (!loginFormValues.userName) {
            loginFormIsValid = false;
            loginErrors.userNameError = 'User Name is required';
        }
        //for password
        if (!loginFormValues.password) {
            loginFormIsValid = false;
            loginErrors.passwordError = 'Password is required';
        }
        
        setLoginFormValues({ loginErrors });
        return loginFormIsValid;
    }

    const onSignUpForm = (e) => {
        e.preventDefault();
        if (signUpFormValidation()) {

            
            let user = {
                signUpUserName: signUpFormValues.signUpUserName,
                mobileNumber: signUpFormValues.mobileNumber,
                email: signUpFormValues.email,
                signUpPassword: signUpFormValues.signUpPassword,
                role: signUpFormValues.role
            }
            if (users.some((v) => { return v.email === signUpFormValues.email })) {
                alert("duplicate data");
                setSignUpFormValues({
                    signUpUserName: '',
                    mobileNumber: '',
                    email: '',
                    signUpPassword: '',
                    role:'',
                    signUpErrors: {}
                })
            } else {
                alert('Sign-Up form has been Submitted ');
                setUsers([...users, user]);
            }

            setSignUpFormValues({
                signUpUserName: '',
                mobileNumber: '',
                email: '',
                role:'',
                signUpPassword: '',
                signUpErrors: {}
            })
        } else {
            alert('Sign-up form has errors')
        }

    }

    //saving the data to localstorage

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])
    // saving data for loginUser
    useEffect(() => {
        localStorage.setItem('loginUsers', JSON.stringify(loginUsers))
    }, [loginUsers])


    const onLoginForm = (e) => {
        e.preventDefault();
        if (loginFormValidation()) {
            if (users.some((v) => {
                 return (
                     v.email === loginFormValues.userName, v.signUpPassword === loginFormValues.password
                     ) }))
                      {
                let loginUser = {
                    userName: loginFormValues.userName,
                    password: loginFormValues.password,
                    loginDateTime: loginFormValues.loginDateTime,
                    role:loginFormValues.role   
                }
                if (loginUsers.some((v) => { return (v.userName === loginFormValues.userName, v.password === loginFormValues.password) })) {
                    alert('You have already logged In !')
                    setLoginFormValues({
                        userName: '',
                        password: '',
                        loginErrors: {},
                    })

                }else {
                    alert('logged in successfully!');
                    window.location.replace('/home');
                    setloginUsers([...loginUsers, loginUser]);
                    setLoginFormValues({
                        userName: '',
                        password: '',
                        loginErrors: {},
                    })
                }

            } 
            else {
                alert('Invalid user')
                setLoginFormValues({
                    userName: '',
                    password: '',
                    loginErrors: {},
                })
            }
        } else {
            alert('Login form has errors')
            // setLoginFormValues({
            //     userName: '',
            //     password: '',
            //     loginErrors: {},
            // })
        }
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setSignUpFormValues({
            ...signUpFormValues,
            [name]: value
        });
        setLoginFormValues({
            ...loginFormValues,
            [name]: value
        })
    }



    return (
        <div className='container p-3 my-3 d-flex justify-content-center'>
            <Row className="login-signup col-sm-6 col-xs-12 col-md-6 ">
                <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example" className="mb-3 d-flex justify-content-center">
                    <Tab eventKey="Login"  title="Login">
                    <div className='login'>
                        <Col
                            className="col-md-12 col-sm-6 col-xs-12">
                               
                            <h1 className='d-flex justify-content-center'>Login</h1>
                            
                                <Form onSubmit={onLoginForm}>
                                    <Form.Group controlId='userName'>
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            name='userName'
                                            type="email"
                                            onChange={inputChange}
                                            value={loginFormValues.userName}
                                        />
                                        <span style={{ color: "red" }}>{loginFormValues.loginErrors.userNameError}</span>
                                    </Form.Group>
                                    <Form.Group controlId='password'>
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            name="password"
                                            type="password"
                                            value={loginFormValues.password}
                                            onChange={inputChange}
                                        />
                                        <span style={{ color: "red" }}>{loginFormValues.loginErrors.passwordError}</span>
                                    </Form.Group>
                                    <Row className='d-flex justify-content-center'>
                                        <Col className='col-md-6 d-flex justify-content-center'><Button size="lg" className='sign-up__btn mt-3 mb-2' type="submit"
                                        >
                                            Login
                                        </Button></Col>

                                    </Row>
                                </Form>
                           
                        </Col>
                        </div>
                    </Tab>
                    <Tab eventKey="Sign-Up" title="Sign-Up">
                    <div className='sign-up'>
                        <Col
                            className="col-md-12 col-sm-6 col-xs-12">
                            <h1 className='d-flex justify-content-center'>Sign-Up</h1>
                          
                                <Form onSubmit={onSignUpForm}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="signUpUserName"
                                            onChange={inputChange}
                                            value={signUpFormValues.signUpUserName}
                                        />
                                        <span style={{ color: "red" }}>{signUpFormValues.signUpErrors.signUpUserNameError}</span>
                                    </Form.Group>
                                    <Form.Group controlId='number'>
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            name="mobileNumber"
                                            type="number"
                                            onChange={inputChange}
                                            value={signUpFormValues.mobileNumber}
                                        />
                                        <span style={{ color: "red" }}>{signUpFormValues.signUpErrors.mobileNumberError}</span>
                                    </Form.Group>
                                    <Form.Group controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            name="email"
                                            onChange={inputChange}
                                            value={signUpFormValues.email}
                                        />
                                        <span style={{ color: "red" }}>{signUpFormValues.signUpErrors.emailError}</span>
                                    </Form.Group>
                                    <Form.Group controlId='signUpPassword'>
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            name="signUpPassword"
                                            type="password"
                                            value={signUpFormValues.signUpPassword}
                                            onChange={inputChange}
                                        />
                                        <span style={{ color: "red" }}>{signUpFormValues.signUpErrors.signUpPasswordError}</span>
                                    </Form.Group>
                                    <Form.Group controlId='role'>
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            name="role"
                                            as="select"
                                            value={signUpFormValues.role}
                                            onChange={inputChange}
                                            
                                        > <option value=''>Select role</option>
                                        <option value='Admin'>Admin</option>
                                         <option value='User'>User</option></Form.Control>
                                       
                                        
                                        <span style={{ color: "red" }}>{signUpFormValues.signUpErrors.roleError}</span>
                                    </Form.Group>
                                    <Row className='d-flex justify-content-center'>
                                        <Col className='col-md-6 d-flex justify-content-center'>
                                            <Button
                                                size="lg"
                                                className='sign-up__btn mt-3 mb-2'
                                                type="submit"
                                            >
                                                Sign-Up
                                            </Button></Col>
                                    </Row>
                                </Form>
                            
                        </Col>
                        </div>
                    </Tab>

                </Tabs>

            </Row>
        </div>

    )
}
