import React, { useState, useRef } from 'react'
import './modalContent.scss'
import LinkedInLogo from '../../../assets/images/linkedinlogo.svg'
import GithubLogo from '../../../assets/images/githublogo.svg'
import { urlFormat } from '../../../utils/urlFormat'

const HowItWorks = () => {
    return (
        <div className="modal-content">
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    )
} 

const Feedback = () => {

    const [errMsg, setErrMsg] = useState(null)
    const formElement = useRef(null)
    const submitFeedbackHandler = (event) => {
        event.preventDefault()

        let name = event.target.name.value
        let email = event.target.email.value
        let feedback = event.target.feedback.value

        const sendFeedbackUrl = urlFormat('feedback/post-feedback')

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('feedback', feedback)

        const requestOptions = {
            method: "POST",
            body: formData,
            mode: 'cors',

        }

        fetch(sendFeedbackUrl, requestOptions)
            .then(res=>{
                if(!res.ok) setErrMsg("Something went wrong")
                else setErrMsg("Thanks for your feedback!")
            })
            .catch(err=>setErrMsg('Network Error'))
        
        formElement.current.reset()
    }

    return (
        <div className="modal-content">
            <div id="feedback-card-title">
                <h2 className="modal-title">FEEDBACK</h2>
                <div className="feedback-underline-title"></div>
            </div>
            <form className="feedback-form" onSubmit={submitFeedbackHandler} ref={formElement}>
                <label for="feedback-user-name" className="feedback-label">
                    &nbsp;NAME
                </label>
                <input id="feedback-user-name" className="feedback-form-content" type="text" name="name" required />
                <div className="feedback-form-border"></div>
                <label for="feedback-user-email" className="feedback-label">&nbsp;EMAIL
                </label>
                <input id="feedback-user-email" className="feedback-form-content" type="email" name="email" />
                <div className="feedback-form-border"></div>
                <label for="feedback-text" className="feedback-label">&nbsp;MESSAGE
                </label>
                <textarea id="feedback-text" className="feedback-form-content" name="feedback" maxLength="1000" required />
                <div className="feedback-form-border"></div>
                <input style={{marginTop:"1.5em"}} id="feedback-submit-btn" type="submit" name="submit" value="SUBMIT" />
                {
                    errMsg && <p style={{color:errMsg==='Thanks for your feedback!'?"darkgreen":"#D03D56"}}>{errMsg}</p>
                }
            </form>
        </div>
    )
}

const AboutMe = () => {
    return (
        <div className="modal-content">
           <p className="about-text">
                Hey! 

                I am Abhishek Thaker, a 2020 graduate from IIT Roorkee, currently working as a full time Software Engineer.
                I predominantly write server side code in Python/Javascript using frameworks like Django, Flask, ExpressJS.
                I also have a working knowledge of ReactJS and AngularJS.
                In my free time, I like to watch movies, read books or play chess.
                Feel free to connect with me on LinkedIn or Github.
               <br></br>
            </p>
            <div style={ {textAlign: "center"} }>
                <a className="logo-anchor" href="https://www.linkedin.com/in/abhishekthaker/" target="_blank" rel="noopener noreferrer">
                    <img id="li-logo" src={LinkedInLogo} className="App-logo" alt="linkedin" />
                </a>
                <a className="logo-anchor" href="https://github.com/dashamlav" target="_blank" rel="noopener noreferrer">
                    <img id="gh-logo" src={GithubLogo}  className="App-logo" alt="github" />
                </a>
            </div>
               
           
        </div>
    )
}

export {HowItWorks, Feedback, AboutMe}
