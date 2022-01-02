import React, { useState, useEffect, useContext } from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../contextManager/ExpenseContext'
import ExpenseFilterContext from '../../../contextManager/ExpenseFilterContext'

const ExpenseListComponent = (props) => {

    const [expenseData, setExpenseData] = useState([])
    const authCtx = useContext(AuthContext)
    const expenseCtx = useContext(SingleExpenseContext)
    const filterCtx = useContext(ExpenseFilterContext)

    // console.log(expenseData)
    useEffect(() => {

        const expenseListApiUrl = urlFormat('expenses/get-expenses')

        const filters = filterCtx.filters
        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)

        const requestOptions = {
            method: "GET",
            headers: headers
        }

        fetch(expenseListApiUrl, requestOptions)
            .then((res)=>res.json())
            .then((res)=>{
                setExpenseData(res.results)
            })
    }, [authCtx, expenseCtx.changed, filterCtx.filters])

    return(
        <div className="expense-list-wrapper">
          {
            expenseData.map((singleExpense)=>{
              return (
                    <ExpenseCardLiteComponent
                    key={singleExpense.id} 
                    title={singleExpense.title} 
                    amount={singleExpense.amount}
                    date={singleExpense.date}
                    onClick= { () => {
                      expenseCtx.selectedExpenseHandler(singleExpense)
                    }}
                    />
              )
            })
          }
        </div>
    )
}

export default ExpenseListComponent