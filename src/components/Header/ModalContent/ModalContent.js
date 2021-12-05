import React from 'react'
import './modalContent.scss'
import LinkedInLogo from '../../../assets/images/linkedinlogo.svg'
import GithubLogo from '../../../assets/images/githublogo.svg'

const HowItWorks = () => {
    return (
        <div className="modal-content">
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    )
} 

const Feedback = () => {
    return (
        <div className="modal-content">
            <div id="feedback-card-title">
                <h2>FEEDBACK</h2>
                <div className="feedback-underline-title"></div>
            </div>
            <form className="feedback-form">
                <label for="feedback-user-name" className="feedback-label">
                    &nbsp;NAME
                </label>
                <input id="feedback-user-name" className="feedback-form-content" type="text" name="name" required />
                <div className="feedback-form-border"></div>
                <label for="feedback-user-email" className="feedback-label">&nbsp;EMAIL
                </label>
                <input id="feedback-user-email" className="feedback-form-content" type="email" name="email" required />
                <div className="feedback-form-border"></div>
                <label for="feedback-text" className="feedback-label">&nbsp;MESSAGE
                </label>
                <textarea id="feedback-text" className="feedback-form-content" name="text" required />
                <div className="feedback-form-border"></div>
                <input id="feedback-submit-btn" type="submit" name="submit" value="SUBMIT" />
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
