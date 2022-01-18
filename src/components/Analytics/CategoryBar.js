import React, { useState, useEffect, useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './analytics.scss'
import { categoryOptions } from '../Profile/Expenses/ExpenseFilters/filterOptions'
import { getYearOptions } from './utils'
import { FilterSelectStyle } from '../Profile/Expenses/SelectStyles'
import Select from 'react-select'
import { urlFormat } from '../../utils/urlFormat'
import AuthContext from '../../contextManager/AuthContextManager'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const monthOptions = [
    // {value: 'All', label: 'ALL'},
    {value: 'Jan', label: 'JANUARY'},
    {value: 'Feb', label: 'FEBRUARY'},
    {value: 'Mar', label: 'MARCH'},
    {value: 'Apr', label: 'APRIL'},
    {value: 'May', label: 'MAY'},
    {value: 'Jun', label: 'JUNE'},
    {value: 'Jul', label: 'JULY'},
    {value: 'Aug', label: 'AUGUST'},
    {value: 'Sep', label: 'SEPTEMBER'},
    {value: 'Oct', label: 'OCTOBER'},
    {value: 'Nov', label: 'NOVEMBER'},
    {value: 'Dec', label: 'DECEMBER'},
]

const CategoryBar = () => {

    const yearOptions = getYearOptions()
    const [selectedYear, setSelectedYear] = useState(yearOptions[0].value)
    const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value)
    const [categoryData, setCategoryData] = useState(null)
    console.log(categoryData)
    const authCtx = useContext(AuthContext)
    useEffect(()=>{

        const url = urlFormat('expenses/get-category-data')
    
        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)
        const requestOptions = {
            method: "GET",
            headers: headers
        }
    
        fetch(url, requestOptions)
          .then(res => res.json())
          .then(res=>{
            setCategoryData(res)
          })
      },[authCtx.token])

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Your category-wise expense distribution for 2022',
                font:{
                    size: 25,
                }
            },
        },
        scales: {
            y: {
                ticks: {
                  color: 'black',
                  padding: 5,
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Rupees (₹)', 
                    padding: 5,
                    color: 'black',
                },
                ticks: {
                    color: 'black',
                    padding: 5,
                }
            }
        },
    };
    
    const labels = categoryOptions.map(category=>category.label)
    
    const data = {
        labels,
        datasets: [
            {
                data: categoryOptions.map((category) => categoryData?categoryData[selectedYear][selectedMonth][category.value]:0),
                // data: labels.map((category) => Math.random()),
                borderColor: 'transparent',
                backgroundColor: '#23395d',
            }
        ],
    };
  return (
      <div className="chart-container">
          <Bar options={options} data={data}/>
          <div className="year-select" style={{width:"40%"}}>
            <Select
              options={yearOptions}
              styles={FilterSelectStyle}
              defaultValue={yearOptions[0]}
              onChange={(ev)=>setSelectedYear(ev.value)}
            />
            <Select
              options={monthOptions}
              styles={FilterSelectStyle}
              defaultValue={monthOptions[0]}
              onChange={(ev)=>setSelectedMonth(ev.value)}
            />
          </div>
      </div>
  );
}

export default CategoryBar
