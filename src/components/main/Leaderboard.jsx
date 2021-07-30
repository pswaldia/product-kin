import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import '../main/leaderboard.css'
import Profile_pic from '../../resources/profile_pic.png'
export default function Leaderboard() {
    const [top_usersLoading, setTop_usersLoading] = useState(true);
    let [top_users, setTop_users]  = useState([]);

    useEffect(() => {
        const fetchTop_users = async () => {
            const res = await axios.get(`/get_leaderboard`);
            setTop_users(res.data);
            setTop_usersLoading(false);
        }
        fetchTop_users();
    }, []);


    let len = top_users.length - 10;
    top_users.splice(10, len);


    if(!top_usersLoading){
        return (
            <>
                <div className="card mb-5" id="leaderboard">
                    <h5 className="card-header">Top Users</h5>
                    <div className="card-body">
                        {
                            top_users.map((top_user) => 
                                (
                                    <div className="row justify-content-between mb-2" key={top_user.user_id}>
                                        <div className="d-flex col-6 gap-2">
                                            <img src={top_user.profile_pic} alt="" id="leaderboard-profile-pic"/>
                                            <h5  id="leaderboard-profile-name">{top_user.name}</h5>
                                        </div>
                                        <div className="col-3">
                                            <p id="leaderboard-profile-points"> {top_user.points}pts</p>
                                        </div>
                                    </div>

                                )
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
    else{
        return ""
    }
    
}
