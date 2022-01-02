import React, { useState } from 'react'

const ExpenseFilterContext = React.createContext({
    filters: null,
    changeFilters: () => {}
})

export const ExpenseFilterProvider = (props) => {

    const [currentFilters, setCurrentFitlers] = useState({
        minDate: null,
        maxDate: null,
        minAMount: null,
        maxAmount: null,
        selectedCategories: [],
        selectedTransactionTypes: [],
    })

    const changeFilters = (filtersObj) => {
        setCurrentFitlers({
            minDate: filtersObj.minDate,
            maxDate: filtersObj.maxDate,
            minAMount: filtersObj.minAmount,
            maxAmount: filtersObj.maxAmount,
            selectedCategories: filtersObj.selectedCategories,
            selectedTransactionTypes: filtersObj.selectedTransactionTypes,
        })
    }

    const initialContext = {
        filters: currentFilters,
        changeFilters: changeFilters
    }
    console.log(initialContext)

    return (
        <ExpenseFilterContext.Provider value={initialContext}>
            {props.children}
        </ExpenseFilterContext.Provider>
    )
}

export default ExpenseFilterContext