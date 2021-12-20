import React, { useState } from 'react'
import './expenses.scss'
import ExpenseKeyValue from './ExpenseKeyValue'


const ExpenseExpandedComponent = (props) => {

    const [imageExpanded, setImageExpanded] = useState('')

    const singleData = props.singleExpenseData

    return (
        
            
            <div class="expense-expand-container">
                <div className="ee-title">
                    <p style={{ margin: "unset"}}>{singleData.title} </p>
                </div>
                <div className="expense-expand-inner-container">
                    <span style={{width:"100%", display: "inline-block"}}>
                        <div className="ee-amount">
                            <p style={{ margin: "unset"}}> ₹ {singleData.amount} </p>
                        </div>
                    </span>

                    <ExpenseKeyValue keyname="Date" val={singleData.date} />
                    <ExpenseKeyValue keyname="Category" val={singleData.category} />
                    <ExpenseKeyValue keyname="Payment Type" val={singleData.transactionType} />
                    <ExpenseKeyValue keyname="Description" val={singleData.description} />
                    <ExpenseKeyValue keyname="Image" val={singleData.receiptImage} />
                </div>
            </div>
        
    )
}

export default ExpenseExpandedComponent