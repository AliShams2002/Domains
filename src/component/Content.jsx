import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDomains, deleteDomain, editDomain } from '../redux/DomainsReducer';
import swal from 'sweetalert';


const Content = () => {

    const {drawerIsOpen, setDrawerIsOpen} = useContext(MainContext);
    const navigate = useNavigate();

    const domains = useSelector(state => state.domains);
    const dispatch = useDispatch();

    const [dom, setDom] = useState([]);
    const [mainDomains, setMainDomains] = useState([]);
    

    const getDomain = () => {
        axios.get('https://6797aa2bc2c861de0c6d964c.mockapi.io/domain').then(res => {
            res.data.map(i => {
                i.isActive = String(i.isActive);
            })
            dispatch(getDomains(res.data));
            setDom(res.data);
            setMainDomains(res.data);
        })
    }

    const deleted = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this item?",
            icon: "warning",
            buttons: ['No', 'Yes'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`).then(res => {
                    if(res.status == 200) {
                        dispatch(deleteDomain(id))
                        swal("The deletion operation was successful!", {
                          icon: "success",
                        });
                    }
                })
            } else {
              swal("You have canceled the deletion of this item!");
            }
          });
    }

    const filterDomainsBySearch = (e) => {
        setMainDomains(dom.filter(item => item.domain.includes(e.target.value)));
    }

    const filterDomainsByStatus = (e) => {
        if(e.target.value == '') {
            setMainDomains(dom);
        } else {
            setMainDomains(dom.filter(item => item.status == e.target.value));
        }
    }

    const handelVerifyDomain = (i) => {
        const item = {...i, status: 'verified'};
        axios.put(`https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${i.id}`, item).then(res => {
            dispatch(editDomain(item));
            if(res.status == 200 || 201) {
                swal("Verified successful!", "Domain verified successfully.", "success");
            } else {
                swal("Verified failed!", "Verified domain failed..", "error");
            }
        })
    }

    useEffect(() => {
        getDomain();
    }, [domains.domainsList != dom])


    return (
        <div className='max-w-[1000px] w-full h-full flex flex-col items-center justify-start gap-8 py-24 px-12'>
            <h1 className='self-start text-3xl font-normal'>Domains</h1>
            <div className='max-w-full w-full flex flex-col-reverse gap-4 md:flex-row items-center justify-between'>
                <button className='w-full md:w-auto bg-blue-500 rounded-sm text-lg py-2 px-4 text-white' onClick={() => {
                    setDrawerIsOpen(true)
                    navigate(`/add`)
                    }}><i className="ri-add-line"></i> Add Domain</button>
                <div className='w-full md:w-auto flex flex-col md:flex-row items-center gap-5'>
                    <div className='w-full'>
                        <select className='w-full focus:outline-none py-2 px-4 border border-gray-400 rounded-sm' name="filter" id="filter" onChange={filterDomainsByStatus}>
                            <option value="">Order by Ascending</option>
                            <option value="pending">pending</option>
                            <option value="verified">verified</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </div>
                    <div className='w-full py-2 px-4 flex items-center gap-2 border border-gray-400 rounded-sm'>
                        <i className="ri-search-line text-gray-400"></i>
                        <input className='focus:outline-none' type="search" placeholder='Search' onChange={(e) => filterDomainsBySearch(e)}/>
                    </div>
                </div>
            </div>
            {
                mainDomains.length ? (
                    <table className='max-w-full w-full shadow-lg rounded-sm'>
                        <thead>
                            <tr className='border-b border-gray-200 text-gray-500 rounded-sm'>
                                <th className='text-start font-normal py-2 px-3'>Domain URL</th>
                                <th className='text-start font-normal py-2 px-3'>Active Status</th>
                                <th className='text-start font-normal py-2 px-3'>Verification Status</th>
                                <th className='text-start font-normal py-2 px-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mainDomains.map((i, index) => (
                                    <tr key={i.id} className='border-b border-gray-200'>
                                        <td className='text-start font-medium flex gap-1 py-2 px-3'>
                                            <span className='text-red-700'>
                                                {
                                                    i.isActive == `${false}` ? (
                                                        <span className='text-red-700'><i className="ri-error-warning-line"></i></span>
                                                    ) : (
                                                        <span className='text-red-700'><i className="ri-circle-fill"></i></span>
                                                    )
                                                }
                                            </span>
                                            <span className='max-w-20 sm:max-w-44 md:max-w-96 overflow-hidden text-nowrap text-ellipsis'>{i.domain}</span>
                                            <button onClick={() => {
                                                setDrawerIsOpen(true)
                                                navigate(`/edit/${i.id}`)
                                            }}>
                                                <i className="ri-share-box-line text-blue-500"></i>
                                            </button>
                                        </td>
                                        <td className='text-start py-2 px-3'>{`${i.isActive == `${true}` ? 'Active' : 'Not Active'}`}</td>
                                        <td className='text-start py-2 px-3'>{i.status}</td>
                                        <td className='text-start py-2 px-3 relative'>
                                            <input className='opacity-0 peer' type="checkbox" id={`more${index}`} name={`more${index}`} value=''/>
                                            <label className='' htmlFor={`more${index}`}><i className="ri-more-2-fill cursor-pointer"></i></label>
                                            <div className={`absolute top-4 right-8 sm:right-10 md:right-16 peer-checked:inline-block w-fit hidden items-center flex-col gap-2 bg-white rounded-sm shadow-xl`}>
                                                <button className={`w-full hover:bg-blue-500 hover:text-white py-1 px-2 ${i.status == 'verified' ? 'opacity-50 cursor-not-allowed' : 'visible'}`} onClick={() => i.status != 'verified' ? handelVerifyDomain(i) : null}>Verify</button>
                                                <button className='w-full text-red-600 hover:bg-blue-500 hover:text-white py-1 px-2' onClick={() => deleted(i.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                ) : (
                    <div className="animate-pulse w-full flex items-center flex-col gap-4">
                        <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                        <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                        <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                        <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                        <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                    </div>
                ) 
            }
        </div>
    );
}

export default Content;
