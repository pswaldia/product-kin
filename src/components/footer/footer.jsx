import React , {useState} from 'react'
import axios from 'axios';
import '../footer/footer.css'
export default function Footer() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleMessageChange(event) {
        setMessage(event.target.value);
    }

    function handleMessageSubmit(event){
        event.preventDefault();
        const messageDetails = {
            email : email,
            name : name,
            message : message
        };
        axios.post('/add_query', messageDetails)
        .then(function (response) {
            alert(response.data.message);
            setEmail("");
            setMessage("");
            setName("");
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>

            <footer>

                <div className="container-fluid footer-main">
                    <div className="row justify-content-around">
                        <div className="col-4 mt-4" id="footer-lft">
                            <h5 className="mb-3">Get in touch</h5>
                            <p className="mb-5">Dont hesistate to contact us via the form on the right.</p>
                            <p>Call: 0900236778</p>
                            <p>Email: productkin.help@gmail.com</p>
                            {/* <div className="d-flex icons-btn mt-5">

                                <div>
                                    <button><i className="fa fa-facebook"></i></button>
                                </div>

                                <div  className="mx-4">
                                    <button><i className="fa fa-linkedin"></i></button>
                                </div>
                                
                            </div> */}
                        </div>

                        <div className="col-4">
                            <form onSubmit={handleMessageSubmit}>
                                <div className="form-group mt-2">
                                    <label htmlFor="inputName">Name</label>
                                    <input type="text" className="form-control" id="inputName" onChange = {handleNameChange} value={name} required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="inputEmail">Email address</label>
                                    <input type="email" className="form-control" id="inputEmail" onChange = {handleEmailChange} value={email} required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="textArea">Messsage</label>
                                    <textarea className="form-control" id="textArea" rows="3" onChange = {handleMessageChange} value={message} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3 mb-3" id="footer-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                

                <div className="container-fluid privacy">
                    <div className="row justify-content-around">
                        <div className="col-4 mt-3">
                            <p>© 2021 Product Kin. All rights reserved.</p>
                        </div>
                        <div className="col-4 d-flex justify-content-between mt-3">
                            <p>Community Guidelines</p>
                            <p>Policy Privacy</p>
                        </div>
                    </div>
                </div>

            </footer>

                
        </>
    )
}
