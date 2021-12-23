import React, { useState } from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseExpandedComponent from './Expenses/ExpenseExpanded'
import './profile.scss'
import Modal from '../UI/Modal'

const ProfileComponent = () => {

    const [singleExpense, setSingleExpense] = useState({}) 
    const [imageSource, setImageSource] = useState('')
    const clickedExpenseCardLite = (singleExpenseData) => {
      setSingleExpense(singleExpenseData)
    }

    const closeImageModalFn = () => {
      setImageSource('')
    }

    const onClickExpandImage = (imgSource) => {
      setImageSource(imgSource)
    }
    return(
      <div className="profile-container">
        <span className="expense-list-span">
          <ExpenseListComponent onClickExpenseCard={clickedExpenseCardLite}></ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          
          <button id="add-expense-button"> +  &nbsp; ADD NEW EXPENSE</button>
          <ExpenseExpandedComponent singleExpenseData={singleExpense} onClickExpandImage={onClickExpandImage}></ExpenseExpandedComponent>
        </span>

       {
         (imageSource)?
          <Modal closeModalFn={closeImageModalFn}>
              <img src={imageSource}></img>
          </Modal>:
          <React.Fragment></React.Fragment>
       }
 
      </div>

    )
}

export default ProfileComponent