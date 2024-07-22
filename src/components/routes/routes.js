import { NavLink } from "react-router-dom";
import Profile from "../../pages/Profile";
import Role from "../../pages/Role";
import Student from "../../pages/Student";
import Teachers from "../../pages/Teachers";
import { IdcardOutlined, ContactsOutlined,TeamOutlined, UserOutlined } from "@ant-design/icons";
import Users from "../../pages/Users";
import UsersForm from "../../pages/UsersForm";

export const routes = [
    {
        key: "users",
        path:"/users",
        label: <NavLink to={"/users"} style={{ textDecoration: "none" }}>Users</NavLink>,
        icon: <TeamOutlined />,
        element: <Users />,
    },
    {
        key: "role",
        path:"/role",
        label: <NavLink to={"/role"} style={{ textDecoration: "none" }}>Role</NavLink>,
        icon: <UserOutlined />,
        element: <Role />
    },
    {
        key: "teacher",
        path: "/teacher",
        label: <NavLink to={"/teacher"} style={{ textDecoration: "none" }}>Teacher</NavLink>,
        icon: <ContactsOutlined />,
        element: <Teachers />
    },
    {
        key: "student",
        path: "/student",
        label: <NavLink to={"/student"} style={{ textDecoration: "none" }}>Student</NavLink>,
        icon: <IdcardOutlined />,
        element: <Student />
    },
    {
        key: "profile",
        path: "/profile",
        label:false,
        element: <Profile />
    },
    { 
        key:"users/addUser",
        label:false,
        path: "users/addUser",
        element: <UsersForm />
    },
    {
        key:"users/addUser/:id",
        label:false,
        path: "users/addUser/:id",
        element: <UsersForm />
    },
]