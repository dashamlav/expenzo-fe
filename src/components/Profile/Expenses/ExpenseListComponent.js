import React, { useState, useEffect, useContext } from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../contextManager/ExpenseContext'
import ExpenseFilterContext from '../../../contextManager/ExpenseFilterContext'
import Pagination from './ExpensePagination'

const ExpenseListComponent = (props) => {

    const [expenseData, setExpenseData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalCount, setTotalCount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasAppliedFilters, setHasAppliedFilters] = useState(false)
    const authCtx = useContext(AuthContext)
    const expenseCtx = useContext(SingleExpenseContext)
    const filterCtx = useContext(ExpenseFilterContext)
    console.log(expenseData)

    const onPageChange = (newPageNumber) => {
      setPageNumber(newPageNumber)
    }

    useEffect(() => {
        setIsLoading(true)
        setHasAppliedFilters(false)
        const filters = filterCtx.filters
        let filterString = '?'

        let numFilters = 0
        for (const [filterName, filterValue] of Object.entries(filters)) {
          if (filterValue){
            if(filterValue instanceof Array && filterValue.length === 0) continue
            filterString += `${filterName}=${filterValue}&`
            numFilters++
          }
        } 
        filterString += `page=${pageNumber}`
        if (numFilters>1) setHasAppliedFilters(true)

        const expenseListApiUrl = urlFormat('expenses/get-expenses' + filterString)

        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)

        const requestOptions = {
            method: "GET",
            headers: headers
        }

        fetch(expenseListApiUrl, requestOptions)
            .then((res)=>res.json())
            .then((res)=>{
                setExpenseData(res.results)
                setTotalCount(res.count)
                // setTimeout(()=>setIsLoading(false), 500)
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
    }, [authCtx, expenseCtx.changed, filterCtx.filters, pageNumber])

    return(
        <React.Fragment>
          <div className="expense-list-wrapper">
            {
              (isLoading) ?

                <div className="wait-message">
                  <div className="wait-loader"></div>
                  <p> Fetching your expense data...</p>
                </div> :

                (expenseData.length && expenseData.length > 0) ?

                  expenseData.map((singleExpense)=>{
                    return (
                          <ExpenseCardLiteComponent
                          key={singleExpense.id} 
                          title={singleExpense.title} 
                          amount={singleExpense.amount}
                          date={singleExpense.date}
                          isActive={singleExpense.id === expenseCtx.singleExpense.id}
                          onClick= {()=>expenseCtx.selectedExpenseHandler(singleExpense)}
                          />
                    )
                  })
                  :
                  <div className="wait-message">
                    <div className="no-data-card">
                      {hasAppliedFilters ?
                        <p>No matching query exists. <br></br>Please change the filters and try again.</p>:
                        <p>Get started by clicking the ADD NEW EXPENSE button.</p>
                      }
                    </div>
                  </div>
            }
          </div>
          <Pagination onPageChange={onPageChange} totalCount={totalCount} currentPageNo={pageNumber}></Pagination>
        </React.Fragment>
    )
}

export default ExpenseListComponent