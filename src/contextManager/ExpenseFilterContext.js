import React, { useState } from 'react'

const ExpenseFilterContext = React.createContext({
    filters: null,
    changeFilters: () => {}
})

export const ExpenseFilterProvider = (props) => {

    const [currentFilters, setCurrentFitlers] = useState({
        minDate: null,
        maxDate: null,
        minAmount: null,
        maxAmount: null,
        categories: [], 
        transactionTypes: [],
        sortBy: '-date'
    })

    const changeFilters = (filtersObj) => {
        setCurrentFitlers({
            minDate: filtersObj.minDate,
            maxDate: filtersObj.maxDate,
            minAmount: filtersObj.minAmount,
            maxAmount: filtersObj.maxAmount,
            categories: filtersObj.categories,
            transactionTypes: filtersObj.transactionTypes,
            sortBy: filtersObj.sortBy
        })
    }

    const initialContext = {
        filters: currentFilters,
        changeFilters: changeFilters
    }

    return (
        <ExpenseFilterContext.Provider value={initialContext}>
            {props.children}
        </ExpenseFilterContext.Provider>
    )
}

export default ExpenseFilterContext