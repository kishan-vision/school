import { Fragment, useState } from 'react';
import { ConfigProvider, Layout as LayoutComponent, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import SideBar from './sidebar/SideBar';
import HeaderComponent from './header/HeaderComponent';
import FooterComponent from './footer/FooterComponent';

const Layout = ({ routes, setIsAuth }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG, boxShadow, padding },
    } = theme.useToken();

    return (
        <Fragment>
            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            siderBg: "#fff",
                            footerBg: "white",
                            padding: 24,
                            boxShadow: "0 1px 16px -2px rgba(56, 65, 74, .15)",
                        },
                    },
                }}
            >
                <LayoutComponent>
                    <SideBar collapsed={collapsed} routes={routes} setCollapsed={setCollapsed} />
                    <LayoutComponent>
                        <HeaderComponent boxShadow={boxShadow} collapsed={collapsed} setIsAuth={setIsAuth} setCollapsed={setCollapsed} />
                        <Content className='content'>
                            <div
                                style={{
                                    background: colorBgContainer,
                                    height: "calc(100vh - 175px)",
                                    padding: padding,
                                    borderRadius: borderRadiusLG,
                                    boxShadow: boxShadow,
                                    overflow: "hidden",
                                    overflowY: "auto"
                                }}
                            >
                                <Outlet />
                            </div>
                        </Content>
                        <FooterComponent />
                    </LayoutComponent>
                </LayoutComponent>
            </ConfigProvider>
        </Fragment >
    )
}

export default Layout