import React, { useState, useContext } from 'react'
import '../expenses.scss'
import ExpenseDisplay from './ExpenseDisplay'
import ExpenseForm from './ExpenseForm'
import SingleExpenseContext from '../../../../contextManager/ExpenseContext'

const ExpenseExpandedComponent = (props) => {
    const [editMode, setEditMode] = useState(false)

    const expenseContext = useContext(SingleExpenseContext)
    const singleData = expenseContext.singleExpense

    return (
        
        <div className="expense-expand-container">
            {
                (props.newMode || editMode) ?
                <ExpenseForm
                    editMode = {editMode}
                    singleData = {singleData}
                    setEditMode={(val)=>setEditMode(val)}
                    setNewMode={(val)=>props.setNewMode(val)}
                >
                </ExpenseForm>
                : (singleData)?
                <ExpenseDisplay
                    setEditMode={(val)=>setEditMode(val)}
                    singleData={singleData}
                    onClickExpandImage={(imgSource)=>props.onClickExpandImage(imgSource)}
                >
                </ExpenseDisplay>:
                <React.Fragment></React.Fragment>

            }
        </div>
        
    )
}

export default ExpenseExpandedComponent