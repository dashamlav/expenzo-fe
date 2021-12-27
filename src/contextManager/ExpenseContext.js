import React, { useState, useContext, useEffect } from 'react'
import { urlFormat } from '../utils/urlFormat'
import AuthContext from './AuthContextManager'

const SingleExpenseContext = React.createContext({
    singleExpense: null,
    changed: false,
    selectedExpenseHandler: (id, title, amount, date, category, transactionType, description, currency, receiptImage) => {},
    expenseChangedHandler: (val) => {}
})

export const ExpenseContextProvider = (props) => {

    const [selectedExpenseState, setSelectedExpenseState] = useState({
        id: null,
        title: null,
        amount: null,
        date : null,
        category: null,
        transactionType: null,
        description: null,
        currency: null,
        recieptImage: null,
    })
    const [changed, setChanged] = useState(false)


    const selectedExpenseHandler = (id, title, amount, date, category, transactionType, description, currency, receiptImage) => {
        setSelectedExpenseState({
            id: id,
            title: title,
            amount: amount,
            date : date,
            category: category,
            transactionType: transactionType,
            description: description,
            currency: currency,
            receiptImage: receiptImage,
        })
    }

    const expenseChangedHandler = (val) => {
        setChanged(true)
    }

    const initialExpenseContext = {
        singleExpense: selectedExpenseState,
        changed: changed,
        selectedExpenseHandler: selectedExpenseHandler,
        expenseChangedHandler: expenseChangedHandler
    }

    return (
        <SingleExpenseContext.Provider value={initialExpenseContext}>
            {props.children}
        </SingleExpenseContext.Provider>
    )
}

export default SingleExpenseContext

