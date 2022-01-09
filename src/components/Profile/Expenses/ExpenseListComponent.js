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
    const [errorMsg, setErrorMsg] = useState(null)
    const authCtx = useContext(AuthContext)
    const expenseCtx = useContext(SingleExpenseContext)
    const filterCtx = useContext(ExpenseFilterContext)

    const onPageChange = (newPageNumber) => {
      setPageNumber(newPageNumber)
    }

    useEffect(() => {
        setIsLoading(true)
        setHasAppliedFilters(false)
        const [filtersString, numFilters] = filterCtx.getFiltersString(pageNumber)
        if (numFilters>1) setHasAppliedFilters(true)

        const expenseListApiUrl = urlFormat('expenses/get-expenses' + filtersString)

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
      const [filtersString, ] = filterCtx.getFiltersString(pageNumber)
      const downloadCsvUrl = urlFormat('expenses/download-csv' + filtersString)
      const headers = new Headers()
      headers.append('Authorization', `Token ${authCtx.token}`)

      const requestOptions = {
          method: "GET",
          headers: headers
      }

      fetch(downloadCsvUrl, requestOptions)
        .then(res=>{
          console.log(res)
          if(res.ok) return res.blob()
          setErrorMsg("You're sending too many requests.")
          setTimeout(()=>setErrorMsg(null), 5000)
          return null
        })
        .then(blob=>{
          if (blob) {
            let partialEmail = authCtx.userEmail.split('@')[0]
            let date = new Date()
            let dateStamp = date.toISOString().split('T')[0]
            downloadStream(blob,`${partialEmail}_${dateStamp}_expense_data`)
          }
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
            <div>
              <button type="button" className="download-csv-btn green" onClick={downloadCSV}> DOWNLOAD AS CSV</button>
              {errorMsg && <p style={{margin:"unset", color:"#D03D56"}}>{errorMsg}</p>}
            </div>
            
            :
            <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default ExpenseListComponent