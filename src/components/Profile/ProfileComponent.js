import React, { useState } from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseExpandedComponent from './Expenses/ExpenseExpanded'
import './profile.scss'
import Modal from '../UI/Modal'

const ProfileComponent = () => {

    const [singleExpense, setSingleExpense] = useState(null) 
    const [imageSource, setImageSource] = useState('')
    const [clickedNewExpense, setClickedNewExpense] = useState(false)
    const [newMode, setNewMode] = useState(false)

    return(
      <div className="profile-container">
        <span className="expense-list-span">
          <ExpenseListComponent onClickExpenseCard={(singleExpenseData) => {
            setNewMode(false)
            setSingleExpense(singleExpenseData)
          }}>
          </ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          <button id="add-expense-button" onClick={() =>{
            setNewMode(true)
            setClickedNewExpense(true)
          }}> +  &nbsp; ADD NEW EXPENSE</button>
        {
          (clickedNewExpense || singleExpense) ?
          <ExpenseExpandedComponent 
            singleExpenseData={singleExpense} 
            onClickExpandImage={(imgSource)=>setImageSource(imgSource)} 
            newMode={newMode}
            setNewMode={setNewMode} />:
            <React.Fragment></React.Fragment>
        }
        </span>
       {
         (imageSource)?
          <Modal closeModalFn={() => setImageSource('')}>
              <img src={imageSource} alt="Expense"></img>
          </Modal>:
          <React.Fragment></React.Fragment>
       }
 
      </div>

    )
}

export default ProfileComponent