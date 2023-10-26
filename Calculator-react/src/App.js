import React, { Component } from 'react';
import './App.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentValue: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  handleDigitClick = (digit) => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: digit,
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === '0' ? digit : display + digit,
      });
    }
  };

  handleOperatorClick = (operator) => {
    const { display, currentValue, operator: prevOperator } = this.state;

    if (currentValue === null) {
      this.setState({
        currentValue: parseFloat(display),
        operator,
        waitingForOperand: true,
      });
    } else if (prevOperator) {
      this.setState({
        currentValue: this.calculateResult(),
        operator,
        waitingForOperand: true,
        display: this.calculateResult().toString(),
      });
    } else {
      this.setState({
        operator,
        waitingForOperand: true,
      });
    }
  };

  calculateResult = () => {
    const { currentValue, display, operator } = this.state;
    const inputValue = parseFloat(display);

    switch (operator) {
      case '+':
        return currentValue + inputValue;
      case '-':
        return currentValue - inputValue;
      case '*':
        return currentValue * inputValue;
      case '/':
        return currentValue / inputValue;
      default:
        return inputValue;
    }
  };

  handleEqualsClick = () => {
    const { currentValue, display, operator } = this.state;

    if (currentValue && operator) {
      this.setState({
        display: this.calculateResult().toString(),
        currentValue: null,
        operator: null,
        waitingForOperand: true,
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <div className="button-row">
            <button onClick={() => this.handleDigitClick('7')}>7</button>
            <button onClick={() => this.handleDigitClick('8')}>8</button>
            <button onClick={() => this.handleDigitClick('9')}>9</button>
            <button onClick={() => this.handleOperatorClick('+')}>+</button>
          </div>
          <div className="button-row">
            <button onClick={() => this.handleDigitClick('4')}>4</button>
            <button onClick={() => this.handleDigitClick('5')}>5</button>
            <button onClick={() => this.handleDigitClick('6')}>6</button>
            <button onClick={() => this.handleOperatorClick('-')}>-</button>
          </div>
          <div className="button-row">
            <button onClick={() => this.handleDigitClick('1')}>1</button>
            <button onClick={() => this.handleDigitClick('2')}>2</button>
            <button onClick={() => this.handleDigitClick('3')}>3</button>
            <button onClick={() => this.handleOperatorClick('*')}>*</button>
          </div>
          <div className="button-row">
            <button onClick={() => this.handleDigitClick('0')}>0</button>
            <button onClick={this.handleClearClick}>C</button>
            <button onClick={this.handleEqualsClick}>=</button>
            <button onClick={() => this.handleOperatorClick('/')}>/</button>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

