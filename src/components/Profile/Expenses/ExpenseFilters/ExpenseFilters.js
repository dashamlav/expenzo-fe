import React, { useRef, useContext } from 'react'
import Select from 'react-select'
import { FilterSelectStyle } from '../SelectStyles'
import { categoryOptions, transactionTypeOptions, sortByOptions } from './filterOptions'
import ExpenseFilterContext from '../../../../contextManager/ExpenseFilterContext'
import '../expenses.scss'


const ExpenseFilters = () => {

    const filterContext = useContext(ExpenseFilterContext)
    const formElement = useRef(null)
    const categorySelectRef = useRef(null)
    const transactionTypeSelectRef = useRef(null)
    const sortBySelectRef = useRef(null)

    const submitFiltersHandler = (event) => {
        event.preventDefault()
        const filterObj = {}

        
        let minDate = event.target.minDate.value
        let maxDate = event.target.maxDate.value
        let minAmount = event.target.minAmount.value
        let maxAmount = event.target.maxAmount.value
        
        if (minDate && !maxDate) maxDate = '3000-01-01'
        if (maxDate && !minDate) minDate = '0000-01-01'
        if (minAmount && !maxAmount) maxAmount = '2147483647'
        if (maxAmount && !minAmount) minAmount = '0'
        
        filterObj['minDate'] = minDate
        filterObj['maxDate'] = maxDate
        filterObj['minAmount'] = minAmount
        filterObj['maxAmount'] = maxAmount
        filterObj['categories'] = categorySelectRef.current.getValue().map((obj)=>obj.value)
        filterObj['transactionTypes'] = transactionTypeSelectRef.current.getValue().map((obj)=>obj.value)
        filterObj['sortBy'] = sortBySelectRef.current.getValue()[0].value

        //Changing filter context will cause the ExpenseListComponent to make a call to the back-end with attached filters
        filterContext.changeFilters(filterObj)
    }

    const resetForm = () => {
        formElement.current.reset()
        categorySelectRef.current.clearValue()
        transactionTypeSelectRef.current.clearValue()
        filterContext.changeFilters({
            minDate: null,
            maxDate: null,
            minAmount: null,
            maxAmount: null,
            categories: null,
            transactionTypes: null,
            sortBy:'-date'
        })
    }

    return(
        <div className="expense-filters-wrapper">
            <div className="auth-card-title">
                <h2>FILTERS</h2>
                <div className="underline-title" style={{width:160}}></div>
            </div>
                <form className="filters-form" ref={formElement} onSubmit={submitFiltersHandler}>

                    <div className="filter-single">
                        <label for="filter-date" style={{paddingTop:'13px'}}>&nbsp;DATE RANGE</label>
                        <div id="filter-date" className="filter-name">
                            <input 
                                style={{width:"50%", minHeight:"20pt"}} 
                                className="filter-form-content" 
                                type="date" 
                                name="minDate" 
                            />
                            <p style={{margin:"unset", paddingTop:"6px", paddingBottom:"6px"}}>-</p>
                            <input 
                                style={{width:"50%", minHeight:"20pt"}} 
                                className="filter-form-content" 
                                type="date" 
                                name="maxDate"
                            />
                        </div>
                    </div>


                    <div className="filter-single">
                        <label for="filter-amount" style={{paddingTop:'13px'}}>
                            &nbsp;AMOUNT
                        </label>
                        <div id="filter-amount" className="filter-name">
                            <input 
                                style={{width:"50%", minHeight:"20pt"}} 
                                className="filter-form-content" 
                                type="number" 
                                placeholder="From..."
                                name="minAmount"
                                />
                            <p style={{margin:"unset", paddingTop:"6px", paddingBottom:"6px"}}>-</p>
                            <input 
                                style={{width:"50%", minHeight:"20pt"}} 
                                className="filter-form-content" 
                                type="number" 
                                placeholder="To..."
                                name="maxAmount"
                                />
                        </div>
                    </div>


                    <div className="filter-single">
                        <label for="filter-category" style={{paddingTop:'13px'}}>&nbsp;CATEGORIES</label>
                        <div id="filter-category" className="filter-name">
                            <Select
                                isMulti
                                options={categoryOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                closeMenuOnSelect={false}
                                styles={FilterSelectStyle}
                                placeholder="Select categories..."
                                ref={categorySelectRef}
                            />
                        </div>
                    </div>

                    <div className="filter-single">
                        <label for="filter-transactionType" style={{paddingTop:'13px'}}>&nbsp;PAYMENT MODES</label>
                        <div id="filter-transactionType" className="filter-name">
                            <Select
                                isMulti
                                options={transactionTypeOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                closeMenuOnSelect={false}
                                styles={FilterSelectStyle}
                                placeholder="Select payment modes..."
                                ref={transactionTypeSelectRef}
                            />
                        </div>
                    </div>

                    <div className="filter-single">
                        <label for="filter-sort-by" style={{paddingTop:'13px'}}>&nbsp;SORT BY</label>
                        <div id="filter-sort-by" className="filter-name">
                            <Select
                                options={sortByOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                styles={FilterSelectStyle}
                                placeholder="Select sorting..."
                                ref={sortBySelectRef}
                                defaultValue={sortByOptions[0]}
                            />
                        </div>
                    </div>
                    
                    <div className="filter-single">
                        <input className="filters-submit-btn" type="button" value="RESET" onClick={resetForm}/>
                        <input className="filters-submit-btn green" type="submit" value="APPLY" />
                    </div>
                </form>      
        </div>
    )
}


export default ExpenseFilters