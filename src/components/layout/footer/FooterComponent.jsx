import { theme } from 'antd';
import { Footer } from 'antd/es/layout/layout'
import React, { Fragment } from 'react'

const FooterComponent = () => {
    const {
        token: { boxShadow},
    } = theme.useToken();
    return (
        <Fragment>
            <Footer style={{boxShadow: boxShadow}}>
                <div className='footer-warapper'>
                    <p className='font-size-15 margin-0 font-family-poppins'>© Copyrights <span className='title-color'>Tschool</span> 2024. All rights reserved. Designed by <span className='title-color'>John</span></p>
                </div>
            </Footer>
        </Fragment>
    )
}

export default FooterComponent