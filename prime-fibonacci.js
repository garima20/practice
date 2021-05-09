import React, { Component } from 'react';

function Col1(props) {
    return (
        <input type="number" onChange={props.calcFunc} value={props.number}></input>
    );
}

function Col2(props) {
    return (
        <select onChange={props.calcFunc} value={props.isPrime}>
            <option value="true">isPrime</option>
            <option value="false">isFibonacci</option>
        </select>
    );
}

class PrimeFibonacci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 14,
            isPrime: true, // false if Fibonacci
            calcResult: false
        };
        this.calcFunc = this.calcFunc.bind(this);
    }

    // round to nearest integer, if negative -> set -1
    roundNumber(val) {
        var res;
        if (val < 0)
            res = -1;
        else
            res = Math.round(val);
        this.setState({number: res})

        return res;
    }
    
    // check is prime
    isPrime(val) {
        for(var i = 2; i <= val - 1; i++) {
            if (val % i == 0) return false;
        }
        return true;
    }

    // check is fibonacci
    isFibonacci (val, count = 1, last = 0) {
        if (count < val) {
            return this.isFibonacci(val, count+last, count);
        };
        if(count === val) return true;
        return false;
    }

    calcFunc() {
        var val = this.state.number;
        val = this.roundNumber(val);
        if (this.state.isPrime == true) {
            this.setState({
                calcResult : this.isPrime(val)
            })
        } else {
            this.setState({
                calcResult : this.isFibonacci(val)
            })
        }
        console.log(this.state.calcResult)
    }

    updNumAndCalcFunc(e) {
        this.setState({number: e.target.value})
        setTimeout(() => {
            this.calcFunc();
        }, 2000);
    }

    updBoolAndCalcFunc(e) {
        this.setState({isPrime: e.target.value})
        setTimeout(() => {
            this.calcFunc();
        }, 2000);
    }

    render() {
        return (
            <div className="container">
                <div id="col1" className="col1">
                    <Col1 
                        number = {this.state.number}
                        calcFunc={(e) => this.updNumAndCalcFunc(e)}
                    />
                </div>
                <div id="col2" className="col2">
                    <Col2 
                        isPrime={this.state.isPrime}
                        calcFunc={(e) => this.updBoolAndCalcFunc(e)}
                    />
                </div>
                <div id="col3" className="col3">
                    <span>{this.state.calcResult.toString()}</span>
                </div>
            </div>
        );
    }
}

export default PrimeFibonacci;