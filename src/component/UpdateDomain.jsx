import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { editDomain } from '../redux/DomainsReducer';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { MainContext } from '../context/MainContext';
import swal from 'sweetalert';


const UpdateDomain = () => {

    const formik = useFormik({
            initialValues: {
                domainName: ''
            }, 
            onSubmit: (values, submitProps) => {
                domainValues.domain = values.domainName;
                setTimeout(() => {
                    updateDomain();
                    submitProps.setSubmitting(false);
                }, 3000);
            },
            validate: values => {
                const error = {};
                if(!values.domainName) {
                    error.domainName = 'Please enter the domain name!'
                } else if(!/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(values.domainName)){
                    error.domainName = 'Please enter the domain name correctly. EX: https://www.google.com'
                }
    
                return error;
            }
        })

    const [domainValues, setDomainValues] = useState(null);
    const {drawerIsOpen, setDrawerIsOpen} = useContext(MainContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();




    const getDomainValue = () => {
        axios.get(`https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`).then(res => {
            formik.values.domainName = res.data.domain;
            setDomainValues(res.data);
        })
    }

    const updateDomain = () => {
        axios.put(`https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`, domainValues).then(res => {
            dispatch(editDomain(domainValues));
            if(res.status == 200 || 201) {
                swal("Update successful!", "Domain update successfully.", "success");
            } else {
                swal("Update failed!", "Domain update failed..", "error");
            }
        })
    }

    useEffect(() => {
        getDomainValue();
    }, [])


    return (
        <div className='h-full py-5 px-3'>
            <h2 className='text-2xl font-medium'>Edit Domain</h2>
            
            {
                domainValues ? (
                    <form onSubmit={formik.handleSubmit} className='h-full w-full flex items-center flex-col gap-4 py-5'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="">DomainName</label>
                            <input className='py-1 px-2 border border-gray-400 rounded-sm' type="text" name='domainName' placeholder='Ex: https://www.google.com' value={formik.values.domainName}  onChange={formik.handleChange}/>
                            {
                                formik.errors.domainName ? (
                                    <span className='text-center text-red-600'>{formik.errors.domainName}</span>
                                ) : (
                                    null
                                )
                            }
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="">IsActive</label>
                            <select className='w-full focus:outline-none py-2 px-4 border border-gray-400 rounded-sm' onChange={(e) => setDomainValues({...domainValues, isActive: e.target.value})} name="" id="" value={domainValues.isActive}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-2 mt-auto ml-auto'>
                            <button type='button' className='w-24 py-1 px-2 rounded-sm bg-white shadow-lg' onClick={() => {
                        navigate('/');
                        setDrawerIsOpen(false)
                            }}>Cancel</button>
                            <button className='w-24 py-1 px-2 rounded-sm text-white bg-blue-500' disabled = {formik.isSubmitting}>
                                {formik.isSubmitting ? (<svg aria-hidden="true" className="inline w-6 h-6 text-white-100 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>) : ('Edit')}
                            </button>
                                </div>
                            </form>
                        ) : (
                            null
                        )
            }

            
        </div>
    );
}

export default UpdateDomain;
