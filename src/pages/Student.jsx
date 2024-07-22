import { Fragment, useContext } from "react"
import Table from "../components/tableComponent/Table"
import { StateContext } from "../components/context/stateContext";
import dayjs from 'dayjs';

const Student = () => {
  const { roles, users, } = useContext(StateContext);
  const students = users?.filter((item) => roles?.find((role) => Number(role.roleId) === Number(item.roleId) && role?.roleName?.toLowerCase() === 'student'));
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
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      width: "200px"
    },
    {
      title: 'Birthdate',
      dataIndex: 'dob',
      key: 'dob',
      width: "200px",
      render:(date,record) =>{
        return <span>{dayjs(record?.dob).format("DD-MM-YYYY")}</span>
      }
    },
    {
      title: 'Father Name',
      dataIndex: 'fatherName',
      key: 'fatherName',
      width: "200px"
    },
    {
      title: 'General Number',
      dataIndex: 'generalNumber',
      key: 'generalNumber',
      width: "200px"
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: "200px"
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
      title: 'Teacher',
      dataIndex: 'teacherId',
      key: 'adminId',
      width: "200px",
      render: ((data, record) => {
        return users.map((item) => item.id === record.teacherId && <span>{`${item?.firstName} ${item.lastName}`}</span>)
      })
    },
    {
      title: 'Parent Phone',
      dataIndex: 'parentPhone',
      key: 'parentPhone',
      width: "200px"
    },
  ]
  return (
    <Fragment>
      <h1 className="margin-0" style={{ textAlign: "center", padding: "8px 0 25px" }}>All Students</h1>
      <Table columns={columns} width={2500} data={students} />
    </Fragment>
  )
}

export default Student