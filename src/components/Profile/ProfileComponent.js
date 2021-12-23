import React, { useState } from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseExpandedComponent from './Expenses/ExpenseExpanded'
import './profile.scss'
import Modal from '../UI/Modal'

const ProfileComponent = () => {

    const [singleExpense, setSingleExpense] = useState({}) 
    const [imageSource, setImageSource] = useState('')
    const [clickedNewExpense, setClickedNewExpense] = useState(false)
    const [editMode, setEditMode] = useState(false)
    
    const clickedExpenseCardLite = (singleExpenseData) => {
      setEditMode(false)
      setSingleExpense(singleExpenseData)
    }

    const closeImageModalFn = () => {
      setImageSource('')
    }

    const onClickExpandImage = (imgSource) => {
      setImageSource(imgSource)
    }

    const onClickCreateNewExpense = () => {
      setEditMode(true)
      setClickedNewExpense(true)
    }
    
    return(
      <div className="profile-container">
        <span className="expense-list-span">
          <ExpenseListComponent onClickExpenseCard={clickedExpenseCardLite}></ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          <button id="add-expense-button" onClick={onClickCreateNewExpense}> +  &nbsp; ADD NEW EXPENSE</button>
        {
          (clickedNewExpense || singleExpense) ?
          <ExpenseExpandedComponent 
            singleExpenseData={singleExpense} 
            onClickExpandImage={onClickExpandImage} 
            editMode={editMode} />:
            <React.Fragment></React.Fragment>
        }
        </span>
       {
         (imageSource)?
          <Modal closeModalFn={closeImageModalFn}>
              <img src={imageSource} alt="Expense"></img>
          </Modal>:
          <React.Fragment></React.Fragment>
       }
 
      </div>

    )
}

export default ProfileComponent