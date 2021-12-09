import React from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseCardComponent from './Expenses/ExpenseExpanded'
import './profile.scss'

const ProfileComponent = () => {

    return(
      <div className="profile-container">
        <span className="expense-list-span">
          <ExpenseListComponent></ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          <ExpenseCardComponent></ExpenseCardComponent>
        </span>
      </div>

    )
}

export default ProfileComponent