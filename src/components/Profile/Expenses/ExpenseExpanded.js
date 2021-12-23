import React, { useState } from 'react'
import './expenses.scss'
import ExpenseKeyValue from './ExpenseKeyValue'
import formatDate from '../../../utils/dateFormat'
import { CategorySelect, PaymentModeSelect } from './selectOptions'

const ExpenseExpandedComponent = (props) => {
    const singleData = props.singleExpenseData

    return (
        
        <div className="expense-expand-container">
            {
                (props.editMode) ?

                //If edit mode, show form
                <form>
                    <div className="ee-title">
                        <textarea id="expense-title-textarea" className="expense-form-content" placeholder="Enter title here...">

                        </textarea>
                    </div>
                    <div className="expense-expand-inner-container">
                        <span style={{width:"100%", display: "inline-block"}}>
                            <div className="ee-amount">
                                <input 
                                    type="number"
                                    id="expense-amount-input" 
                                    className="expense-form-content" 
                                    placeholder="₹...">
                                        
                                </input>
                            </div>
                        </span>

                        <ExpenseKeyValue keyname="DATE" val={
                            <input className="expense-form-content" type="date"></input>
                        } />
                        <ExpenseKeyValue keyname="CATEGORY" val={
                            <CategorySelect></CategorySelect>
                        } />
                        <ExpenseKeyValue keyname="PAYMENT TYPE" val={
                            <PaymentModeSelect></PaymentModeSelect>
                        } />
                        <ExpenseKeyValue keyname="DESCRIPTION" val={
                            <textarea id="expense-description-textarea" className="expense-form-content"></textarea>
                        } />
                        <ExpenseKeyValue 
                            keyname="IMAGE" 
                            val={
                                    <input 
                                        id="expense-file-input" 
                                        type="file"
                                        className="expense-form-content"
                                        >
                                    </input>
                            }
                        />
                <button type="submit" className="expense-form-submit">SUBMIT</button>
                <button type="submit" className="expense-form-submit discard">DISCARD</button>
                    </div>
                </form>:

                //Otherwise display clicked expense data
                <React.Fragment>
                    <div className="ee-title">
                        <p style={{ margin: "unset"}}>{singleData.title} </p>
                    </div>
                    <div className="expense-expand-inner-container">
                        <span style={{width:"100%", display: "inline-block"}}>
                            <div className="ee-amount">
                                <p style={{ margin: "unset"}}> ₹ {singleData.amount} </p>
                            </div>
                        </span>

                        <ExpenseKeyValue keyname="Date" val={formatDate(singleData.date)} />
                        <ExpenseKeyValue keyname="Category" val={singleData.category} />
                        <ExpenseKeyValue keyname="Payment Type" val={singleData.transactionType} />
                        <ExpenseKeyValue keyname="Description" val={singleData.description} />
                        <ExpenseKeyValue 
                            keyname="Image" 
                            val={singleData.receiptImage? "Click to open image": "No image"} 
                            onClick={
                            ()=>{
                                props.onClickExpandImage(singleData.receiptImage)
                            }
                        }/>
                    </div>
                </React.Fragment> 

            }
        </div>
        
    )
}

export default ExpenseExpandedComponent