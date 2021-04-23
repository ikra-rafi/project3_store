import React, { Component } from 'react';
import "./style.css";

class Ratings extends Component {

    constructor(props) {

        super(props);

        console.log(props);

        this.state = {
            ratings: props.ratings,
            average: 0
        }

    }

    componentDidMount() {
        this.getAverage();
        // this.setState({ratings: this.props.ratings})
        // console.log(this.state.ratings)
    }
    getAverage = () => {
        var avg = 0;

        for (var i=0; i< this.state.ratings.length; i++){
            const rating = parseInt(this.state.ratings[i].stars);
            avg += rating;
        }
        const average = avg / this.state.ratings.length;

        this.setState({
            average: average
        });
    }

    render(){
        return(
            <div>{this.state.average}</div>
        );
    }

}

export default Ratings;