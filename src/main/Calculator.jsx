import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const DOT = ".";

const initialState = {
	displayValue: "0",
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0,
};

export default class Calculator extends Component {
	state = { ...initialState };

	constructor(props) {
		super(props);
		this.clearMemory = this.clearMemory.bind(this);
		this.setOperation = this.setOperation.bind(this);
		this.addDigit = this.addDigit.bind(this);
	}

	clearMemory() {
		this.setState({ ...initialState });
	}

	setOperation(newOperation) {
		if (this.state.current === 0) {
			this.setState({
				operation: newOperation,
				current: 1,
				clearDisplay: true,
			});
			return;
		}

		const currentOperation = this.state.operation;
		const values = [...this.state.values];

		switch (currentOperation) {
			case "/":
				values[0] = values[0] / values[1];
				values[1] = 0;
				this.setState({
					displayValue: values[0],
					operation: newOperation,
					current: 1,
					clearDisplay: true,
				});
				break;
			case "*":
				values[0] = values[0] * values[1];
				values[1] = 0;
				this.setState({
					displayValue: values[0],
					operation: newOperation,
					current: 1,
					clearDisplay: true,
				});
				break;
			case "-":
				values[0] = values[0] - values[1];
				values[1] = 0;
				this.setState({
					displayValue: values[0],
					operation: newOperation,
					current: 1,
					clearDisplay: true,
				});
				break;
			case "+":
				values[0] = values[0] + values[1];
				values[1] = 0;
				this.setState({
					displayValue: values[0],
					operation: newOperation,
					current: 1,
					clearDisplay: true,
				});
				break;
			default:
				this.setState({
					operation: null,
					current: 0,
					clearDisplay: false,
				});
				break;
		}

		if (Number.isNaN(values[0]) || Number.isFinite(values[0])) {
			this.clearMemory();
		}
	}

	addDigit(digit) {
		if (digit === DOT && this.state.displayValue.includes(DOT)) {
			return;
		}

		const clearDisplay =
			this.state.displayValue === "0" || this.state.clearDisplay;
		const currentValue = clearDisplay ? "" : this.state.displayValue;
		const displayValue = currentValue + digit;
		this.setState({ displayValue, clearDisplay: false });

		if (digit !== DOT) {
			const i = this.state.current;
			const newValue = Number.parseFloat(displayValue);
			const values = [...this.state.values];
			values[i] = newValue;
			this.setState({ values });
		}
	}

	render() {
		return (
			<>
				<h1>Calculator</h1>
				<div className="calculator">
					<Display value={this.state.displayValue} click={this.addDigit} />
					<Button label="AC" click={this.clearMemory} triple />
					<Button label="/" click={this.setOperation} operation />
					<Button label="7" click={this.addDigit} />
					<Button label="8" click={this.addDigit} />
					<Button label="9" click={this.addDigit} />
					<Button label="*" click={this.setOperation} operation />
					<Button label="4" click={this.addDigit} />
					<Button label="5" click={this.addDigit} />
					<Button label="6" click={this.addDigit} />
					<Button label="-" click={this.setOperation} operation />
					<Button label="1" click={this.addDigit} />
					<Button label="2" click={this.addDigit} />
					<Button label="3" click={this.addDigit} />
					<Button label="+" click={this.setOperation} operation />
					<Button label="0" click={this.addDigit} double />
					<Button label="." click={this.addDigit} />
					<Button label="=" click={this.setOperation} operation />
				</div>
			</>
		);
	}
}
