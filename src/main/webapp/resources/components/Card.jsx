import React from 'react';
import $ from 'jquery';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currency: "Noname",
            price: "20000",
            riskLvl: "RISKY",
            avatar_url: "http://bitcoin.org/img/icons/opengraph.png"
        };
    }

    componentDidMount() {
        let component = this;

        $.ajax({
            url: 'http://api.github.com/users/' + this.props.currency,
            dataType: 'json',
            success: function(data){
                console.log(data);
                //component.setState(Object.assign({},data));
            }
        });
    }

    render() {
        let rand = Math.abs(Math.floor(Math.random() * (1 - 100 + 1)) + 1);
        console.log(rand);

        return <div className="col-6 col-lg-4">
            <div className="thumbnail">
                <img src={this.state.avatar_url} width="80"/>
                <div className="caption">
                    <p>{this.state.currency}</p>
                    <p>{this.state.price}</p>
                    <p>{this.state.riskLvl}</p>
                    <div className='progress'>
                        <div className='progress-bar progress-bar-danger'
                             role='progressbar'
                             aria-valuenow={rand}
                             aria-valuemin='0'
                             aria-valuemax='100'
                             style={{width: `${rand}%`}}>
                            <span className='sr-only'>70% Complete</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" href="#" role="button">Trade</button>
            </div>
        </div>;
    }
}

