import React from 'react'
import MonthlyBar from './MonthlyBar'
import CategoryBar from './CategoryBar'
import './analytics.scss'

const AnalyticsComponent = () => {
    return(
        <div className="analytics-container">
            <MonthlyBar></MonthlyBar>
            <CategoryBar></CategoryBar>
        </div>
    )
}

export default AnalyticsComponent