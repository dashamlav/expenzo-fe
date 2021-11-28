import React from 'react'
// import '../../../index.css'
import './intro.scss'
import Card from '../../UI/Card'

const IntroComponent = () => {

    let mainText = 'WANT TO HANDLE AND ANALYSE ALL YOUR EXPENSES?'
    let subText = 'EXPENZO IS THE PERFECT PLACE FOR YOUR NEEDS'
    return(
        <div className="intro-text">
            {/* <Card> */}
                {mainText}
                <div className='sub-intro-text'>
                    <p>{subText}</p>
                </div>
            {/* </Card> */}
        </div>
    )
}

export default IntroComponent