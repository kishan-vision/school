import { Fragment, useContext } from "react"
import Table from "../components/tableComponent/Table"
import { StateContext } from "../components/context/stateContext";
import dayjs from 'dayjs';
import moment from "moment";

const Teachers = () => {
  const { roles, users, } = useContext(StateContext);
  const teachers = users?.filter((item) => roles?.find((role) => Number(role.roleId) === Number(item.roleId) && role?.roleName?.toLowerCase() === 'teacher'));

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
      title: 'Admin',
      dataIndex: 'adminId',
      key: 'adminId',
      width: "200px",
      render: ((data, record) => {
        return users.map((item) => item.id === record.adminId && <span>{`${item?.firstName} ${item.lastName}`}</span>)
      })
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: "200px"
    },
    {
      title: 'College Name',
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: "200px"
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      width: "200px"
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      width: "100px"
    },
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      width: "250px"
    },
    {
      title: 'Subjects',
      dataIndex: 'subjects',
      key: 'subjects',
      width: "150px",
      render: ((data, record) => {
        return <span>{record?.subjects?.join(", ")}</span>
      })
    },
    {
      title: 'Education Start Year',
      dataIndex: 'educationStartDate',
      key: 'educationStartDate',
      width: "300px",
      render:((date,record) =>{
        return <span>{moment(record?.graduationDates[0]).format("MM-YYYY")}</span>
      })
    },
    {
      title: 'Education End Year',
      dataIndex: 'educationEndDate',
      key: 'educationEndDate',
      width: "200px",
      render:((date,record) =>{
        return <span>{dayjs(record?.graduationDates[1]).format("MM-YYYY")}</span>
      })
    },
    {
      title: 'Experience Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: "250px",
      render:((date,record) =>{
        return record?.experienceDates?.length > 0 ? <span>{dayjs(record?.experienceDates[0]).format("DD-MM-YYYY")}</span> : <span>{dayjs(record?.experienceStartDate
        ).format("DD-MM-YYYY")}</span>
      })
    },
    {
      title: 'Experience End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: "250px",
      render:((date,record) =>{
        return record?.experienceDates?.length > 0 ?  <span>{dayjs(record?.experienceDates?.experienceEndDate).format("DD-MM-YYYY")}</span> : "-"
      })
    },
  ]
  return (
    <Fragment>
      <h1 className="margin-0" style={{ textAlign: "center", padding: "8px 0 25px" }}>All Teachers</h1>
      <Table columns={columns} width={3000} data={teachers} />
    </Fragment>
  )
}

export default Teachers