import React from 'react';
import $ from 'jquery';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "Noname",
            avatar_url: "http://github-jobs.s3.amazonaws.com/aa333d4e-adeb-11e2-9d28-44d170059efd.png"
        };
    }

    componentDidMount() {
        let component = this;
        $.ajax({
            url: 'http://api.github.com/users/' + this.props.currency,
            dataType: 'json',
            success: function(data){
                component.setState(data);
            }
        });
    }

    render() {
        return <div className="col-6 col-lg-4">
                <img src={this.state.avatar_url} width="80"/>
                <h3>{this.state.name}</h3>
                <button className="btn btn-secondary" href="#" role="button">Trade</button>
        </div>;
    }
}

