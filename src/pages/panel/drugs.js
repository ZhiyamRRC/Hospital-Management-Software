import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Drug from '@/model/Drug'
import { Card, CardBody, Select, Typography } from '@material-tailwind/react'
import React, { Fragment, useEffect, useState } from 'react'
import mongoose from 'mongoose'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AiOutlineDelete, AiOutlineMedicineBox, AiOutlinePlusCircle } from 'react-icons/ai'


const Drugs = ({ dbDrugs }) => {

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  // id For delete
  const [id, setId] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);

  const [filteredDrugs, setFilteredDrugs] = useState([])

  useEffect(() => {
    setFilteredDrugs(dbDrugs);
  }, [dbDrugs])
  

  const [drugData, setDrugData] = useState({
    drugID: '',
    drugName: '',
    drugType: '',

    suppliers: [
      { supplierID: '', name: '', email: '', contactNo: '', location: '', },
      { supplierID: '', name: '', email: '', contactNo: '', location: '', },
    ],
    
    joiningDate: '',
    desc: '',
  });


  const addLines = () => {
    setDrugData((prevData) => ({
      ...prevData,
      suppliers: [
        ...prevData.suppliers,
        { supplierID: '', name: '', email: '', contactNo: '', location: '', },
      ],
    }));
  }

  const delLines = (indexToDelete) => {
    setDrugData((prevData) => {
      const updatedData = prevData.suppliers.filter((_, index) => index !== indexToDelete);
      return {
        ...prevData,
        suppliers: updatedData,
      };
    });
  };

  const handleSupplierChange = (e, index) => {

    const { name, value } = e.target;
    setDrugData((prevData) => {
      const updatedData = prevData.suppliers.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      return {
        ...prevData,
        suppliers: updatedData,
      };
    });
  }

  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }


  const submit = async(e)=>{
    e.preventDefault();

    const data = { drugData, path:'drugs' }

    let res = await fetch(`/api/addEntry`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      toast.success(response.message, { position: 'top-right', autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',});
      setOpen(false)
      setFilteredDrugs([...filteredDrugs, response.data]);
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const editEntry = async()=>{
    const data = { id, drugData, path: 'drugs'};

    let res = await fetch(`/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.success === true) {
      setOpen(false)
      setFilteredDrugs((prevDrugs) =>
        prevDrugs.map((drug) =>
          drug._id === drugData._id ? drugData : drug
        )
      );
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const delEntry = async()=>{
    const data = { selectedIds , path: 'drugs' };
    let res = await fetch(`/api/delEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      setFilteredDrugs(filteredDrugs.filter(item => !selectedIds.includes(item._id)));
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }

  return (
    <main className="w-full flex min-h-screen bg-gray-100">

      {/* React tostify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

      <div className="w-[20%]">
        <Sidebar />
      </div>

      <div className="w-full">
        <Header/>


        <div className="p-3">

          <Card className="w-full">
            <CardBody>

              <div className='flex justify-between items-center py-2'>
                <Typography variant="h5" color="blue-gray" className="flex items-center">
                  <AiOutlineMedicineBox className='mr-2 text-xl' /> Drugs ({filteredDrugs.length})
                </Typography>

                <div className='flex space-x-1'>

                  <button
                    onClick={ ()=>{ 

                        setOpen(true),
                        setDrugData({
                          drugID: '',
                          drugName: '',
                          drugType: '',
                          joiningDate: '',

                          suppliers: [
                            { supplierID: '', name: '', email: '', contactNo: '', location: '', },
                            { supplierID: '', name: '', email: '', contactNo: '', location: '', },
                          ],
                          desc: '',
                        });
                        
                        
                        setIsEdit(false)
                      
                      } } 
                    className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md"
                  >
                    <FaPlus className='mr-1' />
                    Add Drug
                  </button>

                  <button onClick={()=>delEntry()} className="bg-deleteColor hover:bg-hoverDeleteColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
                    <MdDelete className='mr-1' />
                    Delete
                  </button>
                  
                </div>
              </div>

              <div className='mt-10'>
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block align-middle w-full">
                      <div className="block h-[21rem]">
                        <table className='w-full '>
                          <thead className='sticky top-0 z-10 bg-white shadow border-b-2 border-gray-300'>
                            <tr className='w-full'>
                              <td scope="col" className="w-4 p-2.5">
                                <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                              </td>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Drug ID
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Drug Name
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Drug Type
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  No of Suppliers
                              </th>
                              
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            
                            {filteredDrugs.length != 0 && filteredDrugs.map((item, index)=>{

                              return <tr key={index} 
                              onClick={(e) => {
                                if (!e.target.tagName.toLowerCase() === 'input' || e.target.type !== 'checkbox') {
                                  e.stopPropagation(); setDrugData(item), setOpen(true), setId(item._id), setIsEdit(true)
                                }
                              }}
                              
                              className='cursor-pointer border-b border-gray-300 hover:bg-tableHoverColor'>
                              <td className="w-4 p-2.5">
                                <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                              </td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-800">{item.drugID}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.drugName}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.drugType}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.suppliers.length}</td>
                              
                            </tr>
                            })}

                          </tbody>
                        </table>

                        {filteredDrugs.length === 0 && <div className='w-full'>
                          <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
                        </div>}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>


          {/* Add Drug Popup */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={()=>{setOpen(false)}}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 md:scale-100" leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-6xl">
                      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        
                        <div className='w-full'>
                          <div className="mt-10 sm:mt-0 w-full">
                            <div className="md:grid md:grid-cols-1 md:gap-6">
                              <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Drug</h3>
                                </div>
                              </div>
                              <div className="mt-2 text-black md:col-span-2 md:mt-0 w-full">
                                <form method="POST" onSubmit={submit}>
                                    
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-1">
                                      <label htmlFor="drugID" className="block text-sm font-medium text-gray-700">
                                        Drug ID
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={drugData.drugID}
                                        type="text"
                                        name="drugID"
                                        id="drugID"
                                        autoComplete="drugID"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="drugName" className="block text-sm font-medium text-gray-700">
                                        Drug Name
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={drugData.drugName}
                                        type="text"
                                        name="drugName"
                                        id="drugName"
                                        autoComplete="drugName"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="drugType" className="block text-sm font-medium text-gray-700">
                                        Drug Type
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={drugData.drugType}
                                        type="text"
                                        name="drugType"
                                        id="drugType"
                                        autoComplete="drugType"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    {/* Add similar blocks for other fields */}
                                    

                                    <div className="col-span-6">
                                      <table className="w-full text-sm text-left text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                          <tr>
                                            <th scope="col" className="p-2">
                                                Supplier ID
                                            </th>
                                            <th scope="col" className="p-2">
                                                Name 
                                            </th>
                                            <th scope="col" className="p-2">
                                                Email
                                            </th>
                                            <th scope="col" className="p-2">
                                                Contact No
                                            </th>
                                            <th scope="col" className="p-2">
                                                Location
                                            </th>
                                            <th scope="col" className="p-2">
                                                Add/Del
                                            </th>
                                          </tr>
                                        </thead>
                                      
                                        <tbody >
                                        { drugData.suppliers.map(( item , index)=>{

                                          return <tr key={index} className="bg-white text-black border-b">
                                          
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleSupplierChange(e, index) }
                                                value={ item.supplierID }
                                                name="supplierID"
                                                id="supplierID"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleSupplierChange(e, index) }
                                                value={ item.supplierName }
                                                name="supplierName"
                                                id="supplierName"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleSupplierChange(e, index) }
                                                value={ item.email }
                                                name="email"
                                                id="email"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleSupplierChange(e, index) }
                                                value={ item.contactNo }
                                                name="contactNo"
                                                id="contactNo"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleSupplierChange(e, index) }
                                                value={ item.location }
                                                name="location"
                                                id="location"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            
                                            <td className="p-1 flex items-center mt-[18px]">
                                              
                                              <button type='button' className='mx-auto' onClick={addLines}><AiOutlinePlusCircle className='text-xl text-green-600'/></button>
                                              <button type='button' className='mx-auto'><AiOutlineDelete onClick={()=>index != 0 && delLines(index)} className='text-xl text-red-700'/></button>
                                            </td>

                                          </tr>})}
                                            
                                        </tbody>
                                      </table>
                                    </div>


                                    <div className="col-span-6">
                                      <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        Description
                                      </label>
                                      <textarea
                                        onChange={handleChange}
                                        value={drugData.desc}
                                        rows={4}
                                        name="desc"
                                        id="desc"
                                        autoComplete="desc"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                  </div>

                                  <div className="mt-5 space-x-3 py-3 text-right">
                                    {isEdit && <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-baseColor py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-hoverBaseColor focus:outline-none focus:ring-2 focus:ring-baseColor focus:ring-offset-2">Save Changes</button>}
                                    {!isEdit && <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-baseColor py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-hoverBaseColor focus:outline-none focus:ring-2 focus:ring-baseColor focus:ring-offset-2">Save</button>}
                                  </div>
                                  
                                </form>
                              </div>
                            </div>
                          </div>

                          <div>
                        
                          </div>
                        </div>

                      
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>


        </div>

      </div>

    </main>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbDrugs = await Drug.find()

  // Pass data to the page via props
  return {
    props: {
      dbDrugs: JSON.parse(JSON.stringify(dbDrugs)),
    }
  }
}


export default Drugs