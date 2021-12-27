import React, { useState, useEffect, useContext } from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../contextManager/ExpenseContext'

const ExpenseListComponent = (props) => {

    const [expenseData, setExpenseData] = useState([])
    const authCtx = useContext(AuthContext)
    const expenseContext = useContext(SingleExpenseContext)

    // console.log(expenseData)
    useEffect(() => {

        const expenseListApiUrl = urlFormat('expenses/get-expenses')

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
    }, [authCtx, expenseContext.changed])

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
                        expenseContext.selectedExpenseHandler(
                          singleExpense.id,
                          singleExpense.title,
                          singleExpense.amount,
                          singleExpense.date,
                          singleExpense.category,
                          singleExpense.transactionType,
                          singleExpense.description,
                          singleExpense.currency,
                          singleExpense.receiptImage,
                        )
                    }}
                    />
              )
            })
          }
        </div>
    )
}

export default ExpenseListComponent