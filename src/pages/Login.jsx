import React, { Fragment, useContext, useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import Container from '../components/conatiner/Container';
import { StateContext } from '../components/context/stateContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { users, setIsAuth, setLoginData } = useContext(StateContext);
    const [error, setError] = useState("")

    const onFinish = (values) => {
        const loginData = users?.find((item) => item.email === values.email && item.password === values.password);
        if (loginData) {
            setIsAuth(true);
            setLoginData(loginData)
            navigate("/users");
        }
        else {
            setError("Please Enter a valid email or password")
        }
    };

    const {
        token: { colorBgContainer, padding, borderRadius },
    } = theme.useToken();
    return (
        <Fragment>
            <div className='center'>
                <Container height={"100vh"}>
                    <Row className='row hight-100 center'>
                        <Col xl={9} lg={14} xs={24} className='col'>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 24,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                style={{ background: colorBgContainer, padding: padding, borderRadius: borderRadius, boxShadow: "0 1px 16px -2px rgba(56, 65, 74, 0.15)" }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <h2 className='margin-0 title-sign-in font-family-poppins'>Sign In</h2>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                {
                                    error && <p className='font-size-15 error'>{error}</p>
                                }
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}
export default Login;