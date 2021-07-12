import React from 'react'
import banner from '../../../resources/banner.jpg'
import idea from '../../../resources/idea.png'
import aven from '../../../resources/aven.png'
import treva from '../../../resources/treva.png'
import circle from '../../../resources/circle.png'
import Leaderboard from '../Leaderboard.jsx'
import '../Challenges/challenges.css'
export default function Challenges() {
    return (
        <>
            <div className="col-6 mb-5">
                <div className="card mb-3" id="banner"> 
                        <img id="image" src={banner} alt="" />
                        <h2 id="text"><span>The internet is</span><br/><span>now a forum for</span>
                        <br/><span>for public prosecution</span>
                        </h2>
                </div>

                <div  className="pb-5 mb-3 pt-1 mt-4" id="live-challenge">
                    <div className="d-flex justify-content-around">
                        <img src={idea} alt=""/>
                        <h4 className = "pt-3">Live Challenge by idea company</h4>
                    </div>

                    <div className = "px-5">
                        <a href="">Come test your Product Management Skills by solving 
                        “ABC” company problem and get hired most certainly!!</a>
                    </div>
                </div>

                <div id="past-challenge" className="mt-4 pt-5 text-center">
                    <h3 className="text-center pb-4">Past Challenges</h3>

                    <div className="row justify-content-around">
                        <div className="col-3" id="comp-card">
                            <img src={aven} alt=""/>
                            <p className="company-name">aven company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                        </div>
                        <div className="col-3" id="comp-card">
                            <img src={treva} alt=""/>
                            <p className="company-name">treva company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                        </div>
                        <div className="col-3" id="comp-card">
                            <img src={circle} alt=""/>
                            <p className="company-name">circle company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                        </div>
                    </div>
                </div>


            </div>

            <div className="col-3">
                <Leaderboard/>
            </div>
        </>
        

    )
}
