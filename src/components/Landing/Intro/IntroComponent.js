import React from 'react'
import './intro.scss'

const IntroComponent = () => {

    let mainText = 'WANT TO HANDLE AND ANALYSE ALL YOUR EXPENSES?'
    let subText = 'EXPENZO IS THE PERFECT PLACE FOR YOUR NEEDS'
    return(
            <div className="intro-text">
                    {mainText}
                    <div className='sub-intro-text'>
                        <p>{subText}</p>
                    </div>
            </div>
    )
}

export default IntroComponent