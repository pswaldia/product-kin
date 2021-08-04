import React from 'react'
import banner from '../../../resources/banner.jpg'
import idea from '../../../resources/idea.png'
import aven from '../../../resources/aven.png'
import treva from '../../../resources/treva.png'
import circle from '../../../resources/circle.png'
import Leaderboard from '../Leaderboard'
import '../Challenges/challenges.css'
export default function Challenges() {
    return (
        <>
            <div className="col-6 mb-5">
                
                <div  className="pb-5 mb-3 pt-1 mt-4" id="live-challenge">
                    {/* <div className="d-flex justify-content-around">
                        <img src={idea} alt=""/>
                        <h4 className = "pt-3">Live Challenge by idea company</h4>
                    </div>

                    <div className = "px-5">
                        <strong>COMING SOON !!!</strong>
                    </div> */}
                    <div className="d-flex justify-content-around">
                        <img src={idea} alt=""/>
                        <h4 className = "pt-3">Live Challenge by idea company</h4>
                    </div>

                    <div className = "px-5">
                    <h3>Coming Soon</h3>
                    </div>
                </div>

                <div id="past-challenge" className="mt-4 pt-5 text-center">
                    <h3 className="text-center pb-4">Past Challenges</h3>

                    <div className="row justify-content-around">
                        <div className="col-3" id="comp-card">
                            <img src={aven} alt=""/>
                            <p className="company-name">aven company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                            <a href="https://drive.google.com/file/d/1sP5-fkGrQQciOrtV46ya7njuwD264ElJ/view?usp=sharing" target="_blank"><button type="button" className="btn btn-primary mb-3" id="ask-btn" ><i class="fa fa-download" aria-hidden="true"></i> Download</button></a>    
                        </div>
                        <div className="col-3" id="comp-card">
                            <img src={treva} alt=""/>
                            <p className="company-name">treva company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                            <a href="https://drive.google.com/file/d/12EaehnK1SAD1XnsDDZXOSdWujIhXZ8kG/view?usp=sharing" target="_blank"><button type="button" className="btn btn-primary mb-3" id="ask-btn" ><i class="fa fa-download" aria-hidden="true"></i> Download</button></a>    
                        </div>
                        <div className="col-3" id="comp-card">
                            <img src={circle} alt=""/>
                            <p className="company-name">circle company</p>
                            <p className="clg-dt">Challenge taken up on Jul 19 ‘21</p>
                            <a href="https://drive.google.com/file/d/1GFO6EGCasNdDWXATHVhSKIdVbbMLww6S/view?usp=sharing" target="_blank"><button type="button" className="btn btn-primary mb-3" id="ask-btn" ><i class="fa fa-download" aria-hidden="true"></i> Download</button></a>    
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
