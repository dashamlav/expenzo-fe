import React, { useState, useEffect, useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { transactionTypeOptions } from '../Profile/Expenses/ExpenseFilters/filterOptions'
import { getYearOptions } from './utils'
import { FilterSelectStyle } from '../Profile/Expenses/SelectStyles'
import Select from 'react-select'
import { urlFormat } from '../../utils/urlFormat'
import AuthContext from '../../contextManager/AuthContextManager'
import { Pie } from 'react-chartjs-2';
import './analytics.scss'


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const monthOptions = [
    {value: 'All', label: 'ALL'},
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

const PaymentPie = () => {
    
    const yearOptions = getYearOptions()
    const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value)
    const [selectedYear, setSelectedYear] = useState(yearOptions[0].value)
    const [transactionTypeData, setTransactionTypeData] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const authCtx = useContext(AuthContext)

    useEffect(()=>{

        const url = urlFormat('expenses/get-field-data?fieldType=transactionType')
    
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
            setTransactionTypeData(res)
            setErrMsg(null)
          })
          .catch(()=>{
              setErrMsg('Something went wrong!')
          })
      },[authCtx.token])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Your payment mode expense distribution for ${(selectedMonth === 'All')?'':selectedMonth+' '}${selectedYear}`,
                font:{
                    size: 25,
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        let currentValue = context.raw
                        let totalSum = context.dataset.data.reduce((val1,val2)=>val1+val2)
                        let percent = currentValue*100/totalSum
                        return `${context.label}: ${Math.round(percent)}%, ₹ ${currentValue}`
                    },
                }
            },
        },
    }

    const labels = transactionTypeOptions.map(transactionType=>transactionType.label)
    const data = {
        labels: labels,
        datasets: [
          {
            data: transactionTypeOptions.map(
                (ttype)=>{
                    let dataValue = transactionTypeData?transactionTypeData[selectedYear][selectedMonth][ttype.value]:0
                    return dataValue || 0
                }
            ),
            backgroundColor: [
                'rgba(35, 57, 93)',
                'rgba(232, 156, 49)',
                'rgba(166, 156, 172)',
                'rgba(241, 218, 196)',
                'rgba(230, 102, 6)',
            ],
            borderWidth: 0,
          },
        ],
    };

    let dataAvailable = data.datasets[0].data.reduce((val1,val2)=>val1+val2)
    return (
        <div className="chart-container">
            <div style={{height: "30em"}}>
                <Pie data={data} options={options}/>
                {
                    (!dataAvailable)?
                        <div className="no-data-to-display">
                            No data to display
                        </div>:
                        <React.Fragment/>
                }
            </div>
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
          {
          (errMsg) && <p className="chart-err-text">{errMsg}</p>
          }
        </div>
    )
}

export default PaymentPie