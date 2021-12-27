import React, { useState, useContext } from 'react'
import ExpenseKeyValue from './ExpenseKeyValue'
import formatDate from '../../../../utils/dateFormat'
import { categoryMap, transactionTypeMap } from './expenseUtils'
import SingleExpenseContext from '../../../../contextManager/ExpenseContext'

const ExpenseDisplay = (props) => {

    const expenseCtx = useContext(SingleExpenseContext)
    const singleData = expenseCtx.singleExpense


    return (
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

                <ExpenseKeyValue keyname="DATE" val={formatDate(singleData.date)} />
                <ExpenseKeyValue keyname="CATEGORY" val={categoryMap[singleData.category]} />
                <ExpenseKeyValue keyname="PAYMENT MODE" val={transactionTypeMap[singleData.transactionType]} />
                <ExpenseKeyValue keyname="DESCRIPTION" val={singleData.description} />
                <ExpenseKeyValue 
                    keyname="IMAGE" 
                    val={singleData.receiptImage? "Click to open image": "No image"} 
                    onClick={
                    ()=>{
                        props.onClickExpandImage(singleData.receiptImage)
                    }
                }/>
            <button type="button" className="expense-form-submit" onClick={()=>props.setEditMode(true)}>EDIT</button>
            </div>
        </React.Fragment>
    )
}

export default ExpenseDisplay