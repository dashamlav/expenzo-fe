import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { FilterSelectStyle } from '../Profile/Expenses/SelectStyles'
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
import { urlFormat } from '../../utils/urlFormat'
import AuthContext from '../../contextManager/AuthContextManager'
import { getYearOptions }  from './utils'
import './analytics.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const MonthlyBar = () => {

  const authCtx = useContext(AuthContext)
  
  const yearOptions = getYearOptions()
  const [selectedYear, setSelectedYear] = useState(yearOptions[0].value)
  const [monthlyData, setMonthlyData] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  useEffect(()=>{

    const url = urlFormat('expenses/get-monthly-data')

    const headers = new Headers()
    headers.append('Authorization', `Token ${authCtx.token}`)
    const requestOptions = {
        method: "GET",
        headers: headers
    }

    fetch(url, requestOptions)
    .then(res => {
        if (res.ok) return res.json()
        else throw new Error()
    })
    .then(res=>{
      setMonthlyData(res)
      setErrMsg(null)
    })
    .catch(()=>{
        setErrMsg('Something went wrong!')
    })
  },[authCtx.token])

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Your month-wise expense distribution for ${selectedYear}`,
          font:{
            size: 25,
          }
        }
      },
      scales: {
        y: {
            title: {
                display: true,
                text: 'Rupees (₹)', 
                padding: 5,
                color: 'black',
            },
            ticks: {
              color: 'black',
              padding: 5
            }
        },
        x: {
          ticks: {
            color: 'black',
            padding: 5
          }
        }
    }
  };

  const data = {
      labels: labels,
      datasets: [
          {
            data: labels.map(month => monthlyData?monthlyData[selectedYear][month]: 0 ),
            backgroundColor: '#23395d',
            maxBarThickness: 50,
          }
      ],
  }
  
  return(
      <div className="chart-container">
          <Bar data={data} options={options}></Bar>
          <div className="year-select">
            <Select
              options={yearOptions}
              styles={FilterSelectStyle}
              defaultValue={yearOptions[0]}
              onChange={(ev)=>setSelectedYear(ev.value)}
            />
          </div>
          <p style={{margin: "unset", marginTop: "1em", fontSize:"1.3em"}}> 
            Total expense for {selectedYear} is ₹{data.datasets[0].data.reduce((val1,val2)=>val1+val2)}
          </p>
          {
          (errMsg) && <p className="chart-err-text">{errMsg}</p>
          }
      </div>
  )
}

export default MonthlyBar