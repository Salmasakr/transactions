
import React, { useState } from 'react';
import { Chart as Charts } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function Graph(props) {
  const [selectedData, setSelectedData] = useState(0);

  const filteredTransactions = props.transactionsData.filter(
    (transaction) => transaction.customer_id === selectedData
  );
 

  const selectedCustomer = props.customerData.find(
    (customer) =>customer.id == selectedData
    );
  console.log(props.customerData)
  console.log(selectedData)
  console.log(selectedCustomer)

  return (
    <>
      <form className="max-w-sm mx-auto">
        <select
          id="countries"
          onChange={(e) => setSelectedData(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={0}>Choose a name</option>
          {props.customerData.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </form>

      <div>
        {selectedData !== 0 && filteredTransactions.length > 0 ? (
          <Bar
            data={{
              labels: filteredTransactions.map((transaction) => transaction.date),
              datasets: [
                {
                  label: selectedCustomer?.name||'customer',
                  data: filteredTransactions.map((transaction) => transaction.amount),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p>Please select a customer to view their transactions.</p>
        )}
      </div>
    </>
  );
}
