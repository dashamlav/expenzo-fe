import React, { useState, useEffect, useContext} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { transactionTypeOptions } from '../Profile/Expenses/ExpenseFilters/filterOptions'
import { getYearOptions } from './utils'
import { FilterSelectStyle } from '../Profile/Expenses/SelectStyles'
import Select from 'react-select'
import { urlFormat } from '../../utils/urlFormat'
import AuthContext from '../../contextManager/AuthContextManager'
import { Pie } from 'react-chartjs-2';
import './analytics.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

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
    const authCtx = useContext(AuthContext)
    // console.log(transactionTypeData, selectedMonth, selectedYear)
    useEffect(()=>{

        const url = urlFormat('expenses/get-field-data?fieldType=transactionType')
    
        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)
        const requestOptions = {
            method: "GET",
            headers: headers
        }
    
        fetch(url, requestOptions)
          .then(res => res.json())
          .then(res=>{
            setTransactionTypeData(res)
          })
      },[authCtx.token])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    const labels = transactionTypeOptions.map(transactionType=>transactionType.label)
    const data = {
        labels: labels,
        datasets: [
          {
            data: transactionTypeOptions.map(ttype=> transactionTypeData?transactionTypeData[selectedYear][selectedMonth][ttype.value]:0),
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

    return (
        <div className="chart-container">
            <div style={{height: "30em"}}>
                <Pie data={data} options={options}/>
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
        </div>
    )
}

export default PaymentPie