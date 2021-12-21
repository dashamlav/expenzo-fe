import React, { useState, useEffect, useContext } from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'


const ExpenseListComponent = (props) => {

    const [expenseData, setExpenseData] = useState([])
    const authCtx = useContext(AuthContext)

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
                console.log(res.results)
            })
    }, [authCtx])

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
                        props.onClickExpenseCard(singleExpense)
                    }}
                    />
              )
            })
          }
        </div>
    )
}

export default ExpenseListComponent