import React, { useContext, useState } from 'react'
import ExpenseListComponent from './Expenses/ExpenseListComponent'
import ExpenseExpandedComponent from './Expenses/ExpenseExpanded/ExpenseExpanded'
import './profile.scss'
import Modal from '../UI/Modal'
import SingleExpenseContext from '../../contextManager/ExpenseContext'
import ExpenseFilters from './Expenses/ExpenseFilters/ExpenseFilters'

const ProfileComponent = () => {

    const [imageSource, setImageSource] = useState('')
    const [clickedNewExpense, setClickedNewExpense] = useState(false)
    const [newMode, setNewMode] = useState(false)

    const expenseCtx = useContext(SingleExpenseContext)
    const singleExpense = expenseCtx.singleExpense

    return(
      <div className="profile-container">
        <span className="expense-filters-span">
          <ExpenseFilters></ExpenseFilters>
        </span>
        <span className="expense-list-span">
          <ExpenseListComponent onClickExpenseCard={(singleExpenseData) => {
            setNewMode(false)
          }}>
          </ExpenseListComponent>
        </span>
        <span className="expense-expanded-span">
          <button id="add-expense-button" onClick={() =>{
            setNewMode(true)
            setClickedNewExpense(true)
          }}> +  &nbsp; ADD NEW EXPENSE</button>
        {
          (clickedNewExpense || singleExpense.id) ?
          <ExpenseExpandedComponent 
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