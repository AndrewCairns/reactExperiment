class IndecisionApp extends React.Component {
	render() {
		
		const title = "Indecision App";
		const subtitle = "Let the computer 'think'";
		const options = ["one", "two", "three"]


		return (
			<div>
				<Header title={title} subtitle={subtitle} />
				<Action />
				<Options options={options} />
				<AddOption />
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{this.props.subtitle}</h2>
			</div>
		);
	}
}



class Action extends React.Component {
	handlePick() {
		alert("Handled!")
	}

	render() {
		return (
				<div>
					<button onClick={this.handlePick}>What should I do?</button>
				</div>
		);
	}
}



class Options extends React.Component {
	constructor(props) {
		super(props);
		this.handleRemoveAll = this.handleRemoveAll.bind(this);
	}

	handleRemoveAll(){
		console.log(this.props.options)
	};

	render() {
		return (
				<div>
					<button onClick={this.handleRemoveAll}>Remove all</button>
					{
						this.props.options.map((option, index) => {
							return <Option key={index} optionText={option}/>
						})
					}
				</div>
		);
	}
}

class Option extends React.Component {
	render() {
		return (
				<div>
					Option: {this.props.optionText}
				</div>
		);
	}
}




class AddOption extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
	
		const newItem = e.target.elements.newItem.value.trim();

		if (newItem){
			alert(newItem);
		}
	}

	render() {
		return (
				<div>
					<form onSubmit={this.handleSubmit}>
						
						<input type="text" name="newItem"/>
						<button>Add item!</button>
					</form>
				</div>
		);
	}
}





const appRoot = document.getElementById('app');		//appending it to the DOM

ReactDOM.render(<IndecisionApp />, appRoot)
















