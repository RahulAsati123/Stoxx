import './App.css';
import Header from './components/header';
import Body from './components/body';
import { useEffect, useState } from 'react';

function App() {
	const [stock, setStock] = useState({
		symbol: '',
		name: '',
	});
	const [stockList, setStockList] = useState();
	const [interval, setInterval] = useState('1h');
	const [duration, setDuration] = useState('3mo');
	return (
		<div className='App'>
			<Header />
			{/* body containin the main structure */}
			<Body
				stock={stock}
				setStock={setStock}
				interval={interval}
				setInterval={setInterval}
				duration={duration}
				setDuration={setDuration}
			/>
		</div>
	);
}

export default App;
