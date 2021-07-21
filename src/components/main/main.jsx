import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Pagination from './pagination.jsx';
import Posts from './posts.jsx'
import Menu from './Menu.jsx'
import Challenges from './Challenges/Challenges.jsx'


export default function Main() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurretPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('https://ghibliapi.herokuapp.com/films');
            const allPosts = await res.json();
            setPosts(allPosts);
        }
        fetchPosts();
    }, []);

    console.log(posts);
    //Get current posts
    let indexOfLastPost = currentPage * 4;
    let indexOfFirstPost = indexOfLastPost - 4;
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
    const paginate  = (pageNumber) => {
        setCurretPage(pageNumber);
    }

    return (
        <>  
            <BrowserRouter>
                <div className="container-sm">
                    <div className="row mt-5 justify-content-between">
                        <Menu/>
                        <Switch>
                            <Route exact path={["/", "/!#"]} component = { () => 
                                <>
                                    <Posts posts={currentPosts}/>
                                    <Pagination postsPerPage={4} totalPosts={posts.length} paginate={paginate}/>
                                </>
                            } />
                            <Route exact path="/challenges" component = {Challenges}/>
                        </Switch> 
                    </div>
                </div>
            </BrowserRouter>      
        </>
    )
}

