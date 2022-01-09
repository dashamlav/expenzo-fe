import React, { useState } from 'react'

const ExpenseFilterContext = React.createContext({
    filters: null,
    changeFilters: () => {},
    getFiltersString: () => {}
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

    // Returns the filter string required to attach with GET request for expense list.
    // Takes page number as argument because currently we are not storing page number in filter context
    const getFiltersString = (pageNumber) => {
        let numFilters = 0
        const filters = currentFilters
        let filterString = '?'

        for (const [filterName, filterValue] of Object.entries(filters)) {
            if (filterValue){
            if(filterValue instanceof Array && filterValue.length === 0) continue
            filterString += `${filterName}=${filterValue}&`
            numFilters++
            }
        } 
        filterString += `page=${pageNumber}`
        return [filterString, numFilters]
    }

    const initialContext = {
        filters: currentFilters,
        changeFilters: changeFilters,
        getFiltersString: getFiltersString
    }

    return (
        <ExpenseFilterContext.Provider value={initialContext}>
            {props.children}
        </ExpenseFilterContext.Provider>
    )
}

export default ExpenseFilterContext