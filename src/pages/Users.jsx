import { Button, ConfigProvider, Space } from 'antd'
import { Fragment, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Table from '../components/tableComponent/Table';
import { StateContext } from '../components/context/stateContext';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Users = () => {
  const navigate = useNavigate();
  const { users, roles,setUsers } = useContext(StateContext);

  const handleNavigate = () => {
    navigate('/users/addUser')
  }

  const handleEditUser = (editId) =>{
    navigate(`/users/addUser/${editId}`)
  }

  const handleDeleteUser = (deleteId) =>{
    const newUsers = users?.filter((item) => +item.id !== +deleteId);
    setUsers([...newUsers]);
  }

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: "200px"
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: "200px"
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      width: "200px"
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: "200px"
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: "100px"
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: "100px"
    },
    {
      title: 'Landmark',
      dataIndex: 'landMark',
      key: 'landMark',
      width: "150px"
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: "300px"
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: "100px",
      render: (_, record) => {
        return roles?.map((item) => {
          return +item.roleId === +record?.roleId && <span>{item?.roleName}</span>
        })
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: "200px",
      render: (text, record) => <Fragment>
        <Space>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#fff",
                  colorTextLightSolid: "orange",
                  colorPrimaryHover: "#fff",
                  colorPrimaryActive: "#fff",
                  fontSize: 19
                },
              },
            }}
          >
            <Button type="primary" onClick={() => handleEditUser(record.id)}><EditOutlined /></Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorTextLightSolid: "#ff4d4f",
                  colorErrorHover: "#fff",
                  colorBorder: "#fff",
                  colorError: "#fff",
                  fontSize: 15
                },
              },
            }}
          >
            <Button type="primary" danger onClick={() => handleDeleteUser(record.id)}><DeleteOutlined /></Button>
          </ConfigProvider>
        </Space>
      </Fragment>,
    },
  ]

  return (
    <Fragment>
      <div className='margin-bottom' style={{ textAlign: "right", padding: "20px" }}>
        <Button onClick={handleNavigate} type='primary'>Add User</Button>
      </div>
      <Outlet />
      <Table columns={columns} width={1300} data={users} />
    </Fragment>
  )
}

export default Users