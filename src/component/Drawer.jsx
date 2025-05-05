import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import AddDomain from './addDomain';
import { Route, Routes, useNavigate } from 'react-router';
import UpdateDomain from './UpdateDomain';

const Drawer = () => {

    const {drawerIsOpen, setDrawerIsOpen} = useContext(MainContext);
    const navigate = useNavigate();

    return (
        <div className={`fixed ${drawerIsOpen ? 'left-0' : 'left-[100%]'} w-full h-screen transition-all duration-500`}>
            <div className='w-full h-full flex items-start justify-end gap-5 bg-black-100'>
                <button className='text-white mt-7' onClick={() => {
                    setDrawerIsOpen(false);
                    navigate('')
                }}><i className="ri-close-large-line"></i></button>
                <div className='w-2/3 lg:w-1/2 h-full bg-white'>
                    <Routes>
                        <Route path='/add' element = {<AddDomain/>}/>
                        <Route path='/edit/:id' element = {<UpdateDomain/>}/>
                        <Route path='' element = ''/>
                    </Routes>
                </div>
            </div>  
        </div>
    );
}

export default Drawer;
