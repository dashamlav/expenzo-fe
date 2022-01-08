import React, { useState, useEffect, useContext } from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../contextManager/ExpenseContext'
import ExpenseFilterContext from '../../../contextManager/ExpenseFilterContext'
import Pagination from './ExpensePagination'
import { downloadStream } from '../../../utils/generalUtils'

const ExpenseListComponent = (props) => {

    const [expenseData, setExpenseData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalCount, setTotalCount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasAppliedFilters, setHasAppliedFilters] = useState(false)
    const authCtx = useContext(AuthContext)
    const expenseCtx = useContext(SingleExpenseContext)
    const filterCtx = useContext(ExpenseFilterContext)

    const onPageChange = (newPageNumber) => {
      setPageNumber(newPageNumber)
    }


    // Takes the applied filters from filter context and returns the filter string required for expense GET req
    // Also return a numFilters, i.e. the number of filters applied.
    const getFilterString = () => {
      let numFilters = 0
      const filters = filterCtx.filters
      let filterString = '?'

      for (const [filterName, filterValue] of Object.entries(filters)) {
        if (filterValue){
          if(filterValue instanceof Array && filterValue.length === 0) continue
          filterString += `${filterName}=${filterValue}&`
          numFilters++
        }
      } 
      filterString += `page=${pageNumber}`
      return [filterString, numFilters]
    }

    useEffect(() => {
        setIsLoading(true)
        setHasAppliedFilters(false)
        const [filterString, numFilters] = getFilterString()
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
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
    }, [authCtx, expenseCtx.changed, filterCtx.filters, pageNumber])


    const downloadCSV = () => {
      const [filterString, ] = getFilterString()
      const downloadCsvUrl = urlFormat('expenses/download-csv' + filterString)
      const headers = new Headers()
      headers.append('Authorization', `Token ${authCtx.token}`)

      const requestOptions = {
          method: "GET",
          headers: headers
      }

      fetch(downloadCsvUrl, requestOptions)
        .then(res=>res.blob())
        .then(blob=>{
          let partialEmail = authCtx.userEmail.split('@')[0]
          let date = new Date()
          let dateStamp = date.toISOString().split('T')[0]
          downloadStream(blob,`${partialEmail}_${dateStamp}_expense_data`)
        })
        .catch(err=>console.log(err))
    }

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
          {(expenseData.length && expenseData.length > 0) ?
            <button type="button" className="download-csv-btn green" onClick={downloadCSV}> DOWNLOAD AS CSV</button>:
            <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default ExpenseListComponent