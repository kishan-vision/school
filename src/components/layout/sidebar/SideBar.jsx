import { ConfigProvider, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { Fragment, useState } from 'react';
import logo from '../../../assets/images/school-logo.jpg'
import { MenuFoldOutlined} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const SideBar = ({collapsed,setCollapsed,routes}) => {
    const location = useLocation();
    const {
        token: { boxShadow},
    } = theme.useToken();
    const [isMobile, setIsMobile] = useState(false);
    return (
        <Fragment>
            <Sider breakpoint="lg"
                collapsedWidth= {isMobile ? "0":"80"}
                onBreakpoint={(broken) => {
                    setIsMobile(broken)
                }}
                style={{
                    overflow: 'auto',
                    position: isMobile ? 'fixed' : 'static',
                    left: 0,
                    right:0,
                    top: 0,
                    bottom: 0,
                    zIndex: 10,
                    boxShadow: boxShadow
                  }}
                 collapsible trigger={null} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo-sidebar"  ><img src={logo} alt="logo" className='img-fluid' /> {isMobile && <MenuFoldOutlined className='close' onClick={()=>setCollapsed(!collapsed)}/>}</div>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                // itemActiveBg: "#405189",
                                // itemSelectedBg: "#405189",
                                // itemSelectedColor: "#fff",
                                // itemHoverColor:"#fff"
                            },
                        },
                    }}
                >  
                    <Menu mode="inline" defaultSelectedKeys={[location.pathname.slice(1)]} items={routes?.filter((item) => item.label !== false)} />
                </ConfigProvider>
            </Sider>
        </Fragment>
    )
}

export default SideBar