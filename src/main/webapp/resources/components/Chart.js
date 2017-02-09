import React from 'react';
import $ from 'jquery';

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let component = this;
        $.ajax({
            url: 'http://api.github.com/users/' + this.props.login,
            dataType: 'json',
            success: function(data){
                component.setState(data);
            }
        });
    }

    render() {
        return ;
    }
}