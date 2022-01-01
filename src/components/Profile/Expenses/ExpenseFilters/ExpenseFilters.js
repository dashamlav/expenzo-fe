import React, { useState } from 'react'
import Select from 'react-select'
import { CategoryFilterSelectStyle, FilterAmountSelectStyle } from '../SelectStyles'
import { categoryOptions, transactionTypeOptions, amountOptions } from './filterOptions'
import '../expenses.scss'


const ExpenseFilters = () => {

    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    console.log(minDate)
    console.log(maxDate)

    return(
        <div className="expense-filters-wrapper">
            <div className="auth-card-title">
                <h2>FILTERS</h2>
                <div className="underline-title" style={{width:160}}></div>
            </div>
                <form className="filters-form" >

                    <div className="filter-single">
                        <label for="filter-date" style={{paddingTop:'13px'}}>&nbsp;DATE</label>
                        <div id="filter-date" className="filter-name">
                            <input 
                                style={{width:"50%"}} 
                                className="filter-form-content" 
                                type="date" 
                                name="mindate" 
                                max={ maxDate ? maxDate : "" }
                                onChange={(ev) => setMinDate(ev.target.value)}
                            />
                            <p style={{margin:"unset", paddingTop:"6px", paddingBottom:"6px"}}>-</p>
                            <input 
                                style={{width:"50%"}} 
                                className="filter-form-content" 
                                type="date" 
                                name="maxdate"
                                min={ minDate ? minDate : ""}
                                onChange={(ev) => setMaxDate(ev.target.value)}
                            />
                        </div>
                    </div>


                    <div className="filter-single">
                        <label for="filter-amount" style={{paddingTop:'13px'}}>
                            &nbsp;AMOUNT
                        </label>
                        <div id="filter-amount" className="filter-name">
                            <input style={{width:"50%"}} className="filter-form-content" type="number" name="minamount" placeholder="Min..."/>
                            <p style={{margin:"unset", paddingTop:"6px", paddingBottom:"6px"}}>-</p>
                            <input style={{width:"50%"}} className="filter-form-content" type="number" name="maxamount" placeholder="Max..."/>
                            <Select
                                name="amount-order-select"
                                options={amountOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                styles={FilterAmountSelectStyle}
                                defaultValue={amountOptions[0]}
                            />
                        </div>
                    </div>


                    <div className="filter-single">
                        <label for="filter-category" style={{paddingTop:'13px'}}>&nbsp;CATEGORY</label>
                        <div id="filter-category" className="filter-name">
                            <Select
                                isMulti
                                options={categoryOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                closeMenuOnSelect={false}
                                styles={CategoryFilterSelectStyle}
                                placeholder="Select categories..."
                            />
                        </div>
                    </div>

                    <div className="filter-single">
                        <label for="filter-transactionType" style={{paddingTop:'13px'}}>&nbsp;PAYMENT MODE</label>
                        <div id="filter-transactionType" className="filter-name">
                            <Select
                                isMulti
                                options={transactionTypeOptions}
                                className="filter-form-content"
                                classNamePrefix="filter-form-content"
                                closeMenuOnSelect={false}
                                styles={CategoryFilterSelectStyle}
                                placeholder="Select payment modes..."
                            />
                        </div>
                    </div>
                    
                    <div className="filter-single">
                        <input className="filters-submit-btn" type="button" name="submit" value="RESET" />
                        <input className="filters-submit-btn green" type="submit" name="submit" value="APPLY" />
                    </div>
                </form>      
        </div>
    )
}


export default ExpenseFilters