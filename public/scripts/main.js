console.log('Running');

const app = {
	title: 'The title',
	subtitle: 'My subtitle',
	options: ['One', 'Two']
};

//JSX - Javascript XML
const template = (
	<div>
		
		{app.title && <h1>{app.title}</h1>}
		{app.subtitle && <h2>{app.subtitle}</h2>}
		<p>{app.options.length > 0 ? "Here are options" : "No options"}</p>
	</div>
);	//template to be added to DOM








//counter example
let count = 0;
const addOne = () => {
	count++;
	renderCounterApp();
};
const subOne = () => {
	count--;
	renderCounterApp();
};
const reset = () => {
	count = 0;
	renderCounterApp();
};



const appRoot = document.getElementById('app');		//appending it to the DOM


const renderCounterApp =  () => {
	const templateTwo = (
		<div>
			<h1>Count: {count} </h1>
			<button onClick={addOne} > + 1 </button>
			<button onClick={subOne} > - 1 </button>
			<button onClick={reset} > 0 </button>
		</div>
	);
	
	ReactDOM.render(templateTwo, appRoot);
}

renderCounterApp();












