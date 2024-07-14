import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import Graph from '../Graph/Graph';
import axios from 'axios';
export default function Home() {

  const [customerData, setCustomerData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);


  function getCustomers(){
    axios.get(`http://localhost:3001/customers`)
    .then((respone)=>{
      setCustomerData(respone.data)
      console.log(respone)
    } )
    .catch((error)=>{
      console.log(error)
    })
    
  }


  function getTransactions(){
    axios.get(`http://localhost:3001/transactions`)
    .then((respone)=>{
      setTransactionsData(respone.data)
      console.log(respone)
    } )
    .catch((error)=>{
      console.log(error)
    })
    
  }

  useEffect(() => {
    getCustomers();
    getTransactions();
   
 }, [])
  
  console.log(customerData)
  console.log(transactionsData)

  const [Search, setSearch] = useState('')
  console.log(Search);

  const customerMap = customerData.reduce((map, customer) => {
    map[customer.id] = customer;
    return map;
  }, {});
  console.log(customerMap)

  const filterData = transactionsData.filter(transaction => {
    const customer = customerMap[transaction.customer_id];
    return customer.name.toLowerCase().includes(Search.toLowerCase());
  })
  console.log(filterData)

  return (
    <>
    <h1 className='text-center'>transactions</h1>
      <form className="max-w-md mx-auto my-7">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by name..." />

        </div>
      </form>

      <div className="relative overflow-x-auto flex my-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Customer Name</th>
              {/* <th scope="col" className="px-6 py-3">Customer ID</th> */}
              {/* <th scope="col" className="px-6 py-3">Transaction ID</th> */}
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map(transaction => {
              const customer = customerMap[transaction.customer_id];

              return (
                <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {customer.name}
                  </th>
                  {/* <td className="px-6 py-4">{customer.id}</td> */}
                  {/* <td className="px-6 py-4">{transaction.id}</td> */}
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.amount}</td>
                </tr>
              );
            }
            )}
          </tbody>
        </table>
      </div>

      <Graph customerData={customerData} transactionsData={transactionsData} filterData={filterData} />


    </>
  );

}
