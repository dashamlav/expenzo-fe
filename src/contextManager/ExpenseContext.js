import React, { useState} from 'react'

const SingleExpenseContext = React.createContext({
    singleExpense: null,
    changed: false,
    selectedExpenseHandler: (selectedExpense) => {},
    expenseChangedHandler: () => {}
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


    const selectedExpenseHandler = (selectedExpense) => {
        setSelectedExpenseState({
            id: selectedExpense.id,
            title: selectedExpense.title,
            amount: selectedExpense.amount,
            date :selectedExpense.date,
            category: selectedExpense.category,
            transactionType: selectedExpense.transactionType,
            description: selectedExpense.description,
            currency: selectedExpense.currency,
            receiptImage: selectedExpense.receiptImage,
        })
    }

    const expenseChangedHandler = () => {
        setChanged(!changed)
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

