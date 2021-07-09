import React, {useState, useEffect} from 'react'
import Pagination from './pagination';
import Posts from './posts'
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
        <div>
           <Posts posts={currentPosts}/>
           <Pagination postsPerPage={4} totalPosts={posts.length} paginate={paginate}/>
        </div>
    )
}
