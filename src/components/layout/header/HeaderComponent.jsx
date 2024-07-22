import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Fragment } from 'react'
import {  Link, useNavigate } from 'react-router-dom'

const HeaderComponent = ({ setIsAuth, collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, boxShadow, },
    } = theme.useToken();

    const handlelogOut = () => {
        localStorage.removeItem('loginData');
        localStorage.removeItem('auth');
        setIsAuth(false);
        navigate('/');
    }

    const items = [
        {
            key: '1',
            label: <Link to={'/profile'}>Setting</Link>,
        },
        {
            key: '2',
            label: <Button onClick={handlelogOut} type='text' style={{ padding: 0 }}>LogOut</Button>,
        }
    ];
    return (
        <Fragment>
            <Header style={{
                padding: '0 20px',
                background: colorBgContainer,
                boxShadow: boxShadow,
            }}>
                <Flex align='center' justify='space-between' style={{height:"100%"}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <Flex>
                        <Dropdown
                            menu={{
                                items,
                                style: { padding: 8, width: "100px" }
                            }}
                            trigger={['click']}
                            className='p'
                        >
                            <Avatar
                                className='avatar'
                                size="large"
                            >
                                J
                            </Avatar>
                        </Dropdown>
                    </Flex>
                </Flex>
            </Header>
        </Fragment>
    )
}

export default HeaderComponent