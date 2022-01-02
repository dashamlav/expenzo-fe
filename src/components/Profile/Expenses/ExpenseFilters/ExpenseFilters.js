import React, { useState, useRef, useContext } from 'react'
import Select from 'react-select'
import { CategoryFilterSelectStyle } from '../SelectStyles'
import { categoryOptions, transactionTypeOptions } from './filterOptions'
import ExpenseFilterContext from '../../../../contextManager/ExpenseFilterContext'
import '../expenses.scss'
import { urlFormat } from '../../../../utils/urlFormat'



const ExpenseFilters = () => {

    const filterContext = useContext(ExpenseFilterContext)
    const formElement = useRef(null)
    const categorySelectRef = useRef(null)
    const transactionTypeSelectRef = useRef(null)

    const submitFiltersHandler = (event) => {
        event.preventDefault()
        const filterObj = {}

        filterObj['minDate'] = event.target.minDate.value
        filterObj['maxDate'] = event.target.maxDate.value
        filterObj['minAmount'] = event.target.minAmount.value
        filterObj['maxAmount'] = event.target.maxAmount.value
        filterObj['selectedCategories'] = categorySelectRef.current.getValue().map((obj)=>obj.value)
        filterObj['selectedTransactionTypes'] = transactionTypeSelectRef.current.getValue().map((obj)=>obj.value)

        filterContext.changeFilters(filterObj)

        const fd = new FormData()

        fd.append('minDate', filterObj.minDate)
        fd.append('maxDate', filterObj.maxDate)
        fd.append('minAmount', filterObj.minAmount)
        fd.append('maxAmount', filterObj.maxAmount)
        fd.append('categories', JSON.stringify(filterObj.selectedCategories))
        fd.append('transactionTypes', JSON.stringify(filterObj.selectedTransactionTypes))

        let test_url = urlFormat('expenses/test')
        const requestOptions = {
                method: "POST",
                body: fd 
        }

        fetch(test_url, requestOptions)
            .then(res=>console.log(res))
            .catch((err)=>console.log(err))
  
        

    }

    return(
        <div className="expense-filters-wrapper">
            <div className="auth-card-title">
                <h2>FILTERS</h2>
                <div className="underline-title" style={{width:160}}></div>
            </div>
                <form className="filters-form" ref={formElement} onSubmit={submitFiltersHandler}>

                    <div className="filter-single">
                        <label for="filter-date" style={{paddingTop:'13px'}}>&nbsp;DATE</label>
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
                                styles={CategoryFilterSelectStyle}
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
                                styles={CategoryFilterSelectStyle}
                                placeholder="Select payment modes..."
                                ref={transactionTypeSelectRef}
                            />
                        </div>
                    </div>
                    
                    <div className="filter-single">
                        <input className="filters-submit-btn" type="button" value="RESET" onClick={()=>{
                            formElement.current.reset()
                            categorySelectRef.current.clearValue()
                            transactionTypeSelectRef.current.clearValue()
                            }}/>
                        <input className="filters-submit-btn green" type="submit" value="APPLY" />
                    </div>
                </form>      
        </div>
    )
}


export default ExpenseFilters