import React from 'react'
import MonthlyBar from './MonthlyBar'
import CategoryBar from './CategoryBar'
import PaymentPie from './PaymentPie'
import './analytics.scss'

const AnalyticsComponent = () => {
    return(
        <div className="analytics-container">
            <MonthlyBar></MonthlyBar>
            <CategoryBar></CategoryBar>
            <PaymentPie></PaymentPie>
        </div>
    )
}

export default AnalyticsComponent