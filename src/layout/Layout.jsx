import React from 'react';
import Content from '../component/Content';
import Drawer from '../component/Drawer';
import DrawerMainContext from '../context/MainContext';

const Layout = () => {
    return (
        <DrawerMainContext>
            <div className='w-full h-screen flex items-center justify-center'>
                <Content/>
                <Drawer/>
            </div>
        </DrawerMainContext>
    );
}

export default Layout;
