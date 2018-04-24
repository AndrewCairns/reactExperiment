const appData = {
	title: 'The title',
	subtitle: 'My subtitle',
	options: []
};

const onFormSubmit = (e) => {
	e.preventDefault();
	console.log("form submitted")

	const option = e.target.elements.option.value;

	if (option){
		appData.options.push(option);
		e.target.elements.option.value = '';
		render();
	}
}


const onRemoveAll = () => {
	appData.options = [];
	render();
}

const onMakeDecision = () => {
	const randomNum = Math.floor(Math.random() * appData.options.length);
	const option = appData.options[randomNum];
	alert(option);
}

const numbers = [55, 101, 1000];



const appRoot = document.getElementById('app');		//appending it to the DOM

const render = () => {
	//JSX - Javascript XML
	const template = (
		<div>
			
			{appData.title && <h1>{appData.title}</h1>}
			{appData.subtitle && <h2>{appData.subtitle}</h2>}
			<p>{appData.options.length > 0 ? "Here are options" : "No options"}</p>
			
			<button disabled={appData.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
			<button onClick={onRemoveAll}>Remove all</button>

			<ol>
				{ 
					appData.options.map((option, index)	=> {
						return <li key={index}>{option}</li>
					})
				}
			</ol>



			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" />
				<button>Add button</button>
			</form>
		</div>
	);	//template to be added to DOM

	ReactDOM.render(template, appRoot);

};




render();