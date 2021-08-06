import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Pagination from './Pagination';
import Posts from './posts'
import Menu from './Menu'
import TextEditor from './TextEditor'
import Footer from  '../footer/footer'
import Discuss from '../discuss/Discuss'
import Challenges from './Challenges/Challenges'
export default function Main() {
    const [postsLoading, setPostsLoading] = useState(true);
    const [postContainer, setPostContainer] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurretPage] = useState(1);

    const [ShowEditor, setShowEditor] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/fetch_questions/all');
            setPostContainer(res.data);
            setPosts(res.data);
            setPostsLoading(false); 
        }
        fetchPosts();
    }, []);


    //Get current posts
    let indexOfLastPost = currentPage * 4;
    let indexOfFirstPost = indexOfLastPost - 4;
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const filterItem = (peer_cases) => {
        
        if(peer_cases === 'all'){
            localStorage.setItem("case_no",0);
            setPosts(postContainer);
        }

        else{
            const updatedItems = postContainer.filter((post) => {
                if(peer_cases)
                    localStorage.setItem("case_no",1);
                else
                    localStorage.setItem("case_no",2);
                return post.peer_cases === peer_cases;
            });
    
            setPosts(updatedItems);
        }
       
    }
    
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
                    <div className="container-sm">
                            <div className="row mt-5 justify-content-between">
                                    <Switch>
                                        <Route exact path={["/", "/!#"]} component = { () => 
                                            <>
                                                <Menu filterItem = {filterItem}/>
                                                <Posts posts={currentPosts} setTrigger={setShowEditor}/>
                                                <Pagination postsPerPage={4} totalPosts={posts.length} paginate={paginate}/>
                                            </>
                                        } />
                                        <Route exact path="/challenges" component = {Challenges}/>
                                        <Route exact path="/discuss/:id" component = {Discuss}/>
                                    </Switch>
                            </div>
                    </div>
                <TextEditor trigger = {ShowEditor} setTrigger={setShowEditor}/> 
                <Footer/> 
            </>
        )
    }
}
