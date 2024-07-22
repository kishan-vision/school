import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Space } from 'antd'
import { Fragment, useContext, useEffect, useState } from 'react'
import { StateContext } from '../components/context/stateContext';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
const format = 'DD-MM-YYYY';

const UsersForm = () => {
    const [form] = Form.useForm();
    const [role, setRole] = useState("")
    const { roles, users, setUsers } = useContext(StateContext);
    const [isWorking, setIsWorking] = useState(false);
    const [dates, setDates] = useState({});
    const [editUser, setEditUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getEditUser = users?.find((item) => +item.id === +id);
        if (getEditUser) {
            const getRole = roles?.find((item) => +item?.roleId === +getEditUser?.roleId);
            if (getRole?.roleName?.toLowerCase() === "admin") {
                form.setFieldsValue({ ...getEditUser })
            }
            else if (getRole?.roleName?.toLowerCase() === "teacher") {
                if (getEditUser?.experienceDates > 0) {
                    form.setFieldsValue({
                        ...getEditUser,
                        graduationDates: [dayjs(getEditUser?.graduationDates[0]), dayjs(getEditUser?.graduationDates[1])],
                        experienceDates: [dayjs(getEditUser?.experienceDates[0]), dayjs(getEditUser?.experienceDates[1])],
                    })
                }
                else {
                    form.setFieldsValue({
                        ...getEditUser,
                        graduationDates: [dayjs(getEditUser?.graduationDates[0]), dayjs(getEditUser?.graduationDates[1])],
                        experienceStartDate: dayjs(getEditUser?.experienceStartDate)
                    })
                }
            }
            else if(getRole?.roleName?.toLowerCase() === "student"){
                form.setFieldsValue({
                    ...getEditUser,
                    dob: dayjs(getEditUser?.dob),
                })
            }
            setRole(getRole);
            setEditUser({ ...getEditUser });
            setIsWorking(getEditUser?.isWorking)
        }
    }, [id])


    const handleNavigate = () => {
        navigate('/users')
    }

    const handleForm = (newUsers) => {
        setUsers([...newUsers]);
        form.resetFields();
        setRole("");
        setEditUser({});
        setDates({});
        handleNavigate();
    }

    const onFinish = (values) => {
        if (editUser?.id) {
            const getUserIndex = users?.findIndex((item) => item.id === editUser?.id);
            const newUsers = [...users];
            const isEmailExist = users?.find((item) => item.email === values?.email && item.id !== editUser?.id);
            const isUserNameExist = users?.find((item) => item.userName?.toLowerCase() === values?.userName?.toLowerCase() && item.id !== editUser?.id);
            const isPhoneExist = users?.find((item) => item.phone === values.phone && values.phone && item.id !== editUser?.id);
            const isParentExist = users?.find((item) => item.parentPhone === values.parentPhone && values.parentPhone && item.id !== editUser?.id);
            const isGeneralNumberExist = users?.find((item) => +item.generalNumber === +values.generalNumber && item.id !== editUser?.id);
            if (isEmailExist) {
                form.setFields([
                    {
                        name: 'email',
                        errors: ['Email is aready exist!'],
                    },
                ])
            }
            if (isUserNameExist) {
                form.setFields([
                    {
                        name: 'userName',
                        errors: ['Username is aready exist!'],
                    },
                ])
            }
            if (isPhoneExist) {
                form.setFields([
                    {
                        name: 'phone',
                        errors: ['Phone is aready exist!'],
                    },
                ])
            }
            if (isParentExist) {
                form.setFields([
                    {
                        name: 'parentPhone',
                        errors: ['Parent phone is aready exist!'],
                    },
                ])
            }
            if (isGeneralNumberExist) {
                form.setFields([
                    {
                        name: 'generalNumber',
                        errors: ['General Number is aready exist!'],
                    },
                ])
            }
            if (role?.roleName?.toLowerCase() === 'admin') {
                if (!isEmailExist && !isUserNameExist) {
                    newUsers[getUserIndex] = { ...values, id: editUser?.id };
                    handleForm(newUsers);
                }
            }
            else if (role?.roleName?.toLowerCase() === 'teacher' && !isEmailExist && !isUserNameExist && !isPhoneExist) {
                newUsers[getUserIndex] = { ...values, id: editUser?.id };
                handleForm(newUsers);
            }
            else if(role?.roleName?.toLowerCase() === 'student' && !isEmailExist && !isUserNameExist && !isParentExist && !isGeneralNumberExist){
                newUsers[getUserIndex] = { ...values, id: editUser?.id };
                handleForm(newUsers);
            }
        }
        else {
            const isEmailExist = users?.find((item) => item.email === values?.email);
            const isUserNameExist = users?.find((item) => item.userName?.toLowerCase() === values?.userName?.toLowerCase());
            const isPhoneExist = users?.find((item) => item.phone === values.phone && values.phone);
            const isParentExist = users?.find((item) => item.parentPhone === values.parentPhone && values.parentPhone);
            const isGeneralNumberExist = users?.find((item) => +item.generalNumber === +values.generalNumber);
            if (isEmailExist) {
                form.setFields([
                    {
                        name: 'email',
                        errors: ['Email is aready exist!'],
                    },
                ])
            }
            if (isUserNameExist) {
                form.setFields([
                    {
                        name: 'userName',
                        errors: ['Username is aready exist!'],
                    },
                ])
            }
            if (isPhoneExist) {
                form.setFields([
                    {
                        name: 'phone',
                        errors: ['Phone is aready exist!'],
                    },
                ])
            }
            if (isParentExist) {
                form.setFields([
                    {
                        name: 'parentPhone',
                        errors: ['Parent phone is aready exist!'],
                    },
                ])
            }
            if (isGeneralNumberExist) {
                form.setFields([
                    {
                        name: 'generalNumber',
                        errors: ['General Number is aready exist!'],
                    },
                ])
            }
            if (!isEmailExist && !isUserNameExist && !isPhoneExist && !isParentExist && !isGeneralNumberExist) {
                setUsers([...users, { ...values, id: Date.now() }]);
                form.resetFields();
                setDates({});
                setRole("");
                handleNavigate();
            }
        }
    }

    const handleSelectRole = (event) => {
        const isRole = roles?.find((item) => +item.roleId === +event);
        setRole(isRole);
    }

    const admins = users?.filter((item) => roles?.find((role) => Number(role.roleId) === Number(item.roleId) && role?.roleName?.toLowerCase() === 'admin'));
    const teachers = users?.filter((item) => roles?.find((role) => Number(role.roleId) === Number(item.roleId) && role?.roleName?.toLowerCase() === 'teacher'));

    return (
        <Fragment>
            <div className='user-main'>
                <h2 className="margin-0 padding">All Users</h2>
                <Row className='row'>
                    <Col xs={24}>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Row>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        name="firstName"
                                        label="Firstname"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Firstname is required!"
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a firstname' />
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        name="lastName"
                                        label="Lastname"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Lastname is required!"
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a lastname' />
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please enter a email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a email' />
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        name="userName"
                                        label="Username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter a username!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a username' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    !id &&
                                    <Col xl={6} md={12} xs={24} className='col'>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter a password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password placeholder='Enter a password' />
                                        </Form.Item>
                                    </Col>
                                }
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        label="Gender"
                                        name="gender"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select gender!',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={"Male"}>Male</Radio>
                                            <Radio value={"Female"}>Female</Radio>
                                            <Radio value={"Other"}>Other</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        label="City"
                                        name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter a city!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a city' />
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        label="Landmark"
                                        name="landMark"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter a landmark!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Enter a landmark' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={7} md={13} xs={24} className='col'>
                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter Address!',
                                            },
                                        ]}
                                    >
                                        <Input type='address' placeholder='Enter a address' />
                                    </Form.Item>
                                </Col>
                                <Col xl={6} md={12} xs={24} className='col'>
                                    <Form.Item
                                        label="Role"
                                        name="roleId"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select role!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            onChange={handleSelectRole}
                                            placeholder="Please select role!"
                                            options={roles?.map((item) => ({
                                                value: +item.roleId,
                                                label: item.roleName
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                {
                                    role.roleName?.toLowerCase() === 'teacher' &&
                                    <Fragment>
                                        <Col xl={6} md={11} xs={24} className='col'>
                                            <Form.Item
                                                label="Admin"
                                                name="adminId"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select admin!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    placeholder="Please select admin!"
                                                    options={admins?.map((item) => ({
                                                        value: item.id,
                                                        label: item.firstName + item.lastName
                                                    }))}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={5} md={12} xs={24} className='col'>
                                            <Form.Item
                                                label="Subject"
                                                name="subjects"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select role!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    showSearch
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    placeholder="Please select subject!"
                                                    options={[
                                                        {
                                                            value: 'English',
                                                            label: 'English',
                                                        },
                                                        {
                                                            value: 'Maths',
                                                            label: 'Maths',
                                                        },
                                                        {
                                                            value: 'Gujarati',
                                                            label: 'Gujarati',
                                                        },
                                                        {
                                                            value: 'Psychology',
                                                            label: 'Psychology',
                                                        },
                                                        {
                                                            value: 'Social Sciences',
                                                            label: 'Social Sciences',
                                                        },
                                                        {
                                                            value: 'Science',
                                                            label: ' Science',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Fragment>
                                }
                            </Row>
                            {
                                role.roleName?.toLowerCase() === 'teacher' &&
                                <Fragment>
                                    <Row>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="salary"
                                                label="Salary"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a salary!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: "100%" }} placeholder='Enter a salary' />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="phone"
                                                label="Phone"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter your phone number!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: "100%" }} placeholder='Enter a phone number' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} className='col'>
                                            <h3 className='margin-0'>Education:</h3>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="collegeName"
                                                label="College Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a college name!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter a college name' />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="degree"
                                                label="Degree"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a degree!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter a degree' />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="graduationDates"
                                                label="Graduation Year"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select graduation date!',
                                                    },
                                                ]}
                                            >
                                                <DatePicker.RangePicker format={'MM-YYYY'} style={{ width: "100%" }} picker="month" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} className='col'>
                                            <h3 className='margin-0'>Experience:</h3>
                                            <Form.Item name="isWorking" valuePropName="checked">
                                                <Checkbox onChange={(e) => { setIsWorking(e.target.checked); form.resetFields(['experienceStartDate','experienceDates']); setDates({ ...dates, experienceDates: {} }) }}>Current Working</Checkbox>
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="schoolName"
                                                label="School Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a school name!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter a school name' />
                                            </Form.Item>
                                        </Col>
                                        {
                                            isWorking ?
                                                <Col xl={6} md={12} xs={24} className='col'>
                                                    <Form.Item
                                                        name="experienceStartDate"
                                                        label="Experience Start Date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please Enter a endDate!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker format={format} style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                :
                                                <Col xl={6} md={12} xs={24} className='col'>
                                                    <Form.Item
                                                        name="experienceDates"
                                                        label="Experience Date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please Select Experience Year!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker.RangePicker format={format} style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                        }
                                    </Row>
                                </Fragment>
                            }
                            {
                                role.roleName?.toLowerCase() === 'student' &&
                                <Fragment>
                                    <Row>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="fatherName"
                                                label="Father Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a father name!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter a father name' />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="generalNumber"
                                                label="General Number"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a general number!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder='Enter a general number' style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="dob"
                                                label="Birthdate"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a birthdate!',
                                                    },
                                                ]}
                                            >
                                                <DatePicker format={format} placeholder='Select a birthdate' style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="parentPhone"
                                                label="Parent Number"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a parent number!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder='Enter a parent number' style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                name="class"
                                                label="Class"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter a class!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter a class' />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6} md={12} xs={24} className='col'>
                                            <Form.Item
                                                label="Teacher"
                                                name="teacherId"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select teacher!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    placeholder="Please select teacher!"
                                                    options={teachers?.map((item) => ({
                                                        value: item.id,
                                                        label: item.firstName + item.lastName
                                                    }))}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Fragment>
                            }
                            <Row>
                                <Col xs={24} className='col' style={{ textAlign: "right" }}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button type="default" danger onClick={handleNavigate}>
                                            Cancel
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default UsersForm