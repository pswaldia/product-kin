import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Pagination from './Pagination';
import Posts from './posts'
import Menu from './Menu'
import Challenges from './Challenges/Challenges'
import TextEditor from './TextEditor'
import Discuss from '../discuss/Discuss';
import Footer from  '../footer/footer'
export default function Main() {
    const [postsLoading, setPostsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurretPage] = useState(1);

    const [ShowEditor, setShowEditor] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/fetch_questions/all');
            setPosts(res.data);
            setPostsLoading(false); 
        }
        fetchPosts();
    }, []);

    //Get current posts
    let indexOfLastPost = currentPage * 4;
    let indexOfFirstPost = indexOfLastPost - 4;
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
    const paginate  = (pageNumber) => {
        setCurretPage(pageNumber);
    }

    if(postsLoading){
        return(
            <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
            
        )
    }

    else{
        return (
            <>  
                <BrowserRouter>
                    <div className="container-sm">
                            <div className="row mt-5 justify-content-between">
                                    <Menu/>
                                    <Switch>
                                        <Route exact path={["/", "/!#"]} component = { () => 
                                            <>
                                                <Posts posts={currentPosts} setTrigger={setShowEditor}/>
                                                <Pagination postsPerPage={4} totalPosts={posts.length} paginate={paginate}/>
                                            </>
                                        } />
                                        <Route exact path="/challenges" component = {Challenges}/>
                                        <Route exact path="/discuss/:id" component = {Discuss}/>
                                    </Switch>
                            </div>
                    </div>
                </BrowserRouter>
                <TextEditor trigger = {ShowEditor} setTrigger={setShowEditor}/> 
                <Footer/> 
            </>
        )
    }
}
