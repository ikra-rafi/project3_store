import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import CommentData from "../../components/Test/CommentData"
import {Row, Container} from "../../components/Test/Grid";

function TempComment () {
    // set up state for saved books and a trigger
    const [comments, setComments]= useState([]);
    // const [trigger, setTrigger] = useState("1");

    // const storeComments = [
    //     {
    //         userComment: "Spice was very fresh.",
    //         productID: "GIN0003"
    //     },
    //     {
    //         userComment: "Bottle broken in shipping",
    //         productID: "OREG0001"
    //     },
            
    // ];

    // Load all saved books and store them with setBooks
    useEffect(() => {
        console.log("in comments useEffect");
        getComments();
      }, [])

    // function handleCommentBtnClick(event) {
    //     API.saveComments(storeComments)
    //         .then(res => {
    //             console.log("comments");
    //             console.log(res.data);
    //             setComments(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }

    function getComments() {
        API.getComments()
        .then(res=> {
            console.log(res.data);
            setComments(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
                <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} ><strong>Comments</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {comments.length ? (
                                            <div>
                                                {comments.map(result => (
                                                    <div key={result._id}>
                                                        <CommentData
                                                            id = {result._id}
                                                            userComment = {result.userComment}
                                                            productID = {result.productID}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                    ) : (
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <h3><strong>No Saved Comments</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
    )
}

export default TempComment;