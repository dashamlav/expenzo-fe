import React, { useState } from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseExpandedComponent from './Expenses/ExpenseExpanded'
import './profile.scss'

const ProfileComponent = () => {

    const [singleExpense, setSingleExpense] = useState({}) 

    const clickedExpenseCardLite = (singleExpenseData) => {
      setSingleExpense(singleExpenseData)
    }

    return(
      <div className="profile-container">
        <span className="expense-list-span">
          <ExpenseListComponent onClickExpenseCard={clickedExpenseCardLite}></ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          
          <button id="add-expense-button"> +  &nbsp; ADD NEW EXPENSE</button>
          <ExpenseExpandedComponent singleExpenseData={singleExpense}></ExpenseExpandedComponent>
        </span>
      </div>

    )
}

export default ProfileComponent