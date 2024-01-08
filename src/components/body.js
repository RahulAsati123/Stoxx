import '../styles/body.css';
import LeftBody from './bodyLeft';
import RightBody from './bodyRight';
import { useState, useEffect } from 'react';

const Body = ({
	stock,
	setStock,
	interval,
	setInterval,
	duration,
	setDuration,
}) => {
	const [trading, setTrading] = useState();
	const [series, setSeries] = useState([]);
	const [list, setList] = useState();

	useEffect(() => {
		//we will get the list of all the companies listed in stock market with their symbols
		fetch(
			'https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json'
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const temp = [];
				for (let i = 0; i < data.length; i++) {
					//converting data in lable-value form so that we can show it in react-select
					temp.push({
						value: data[i]['ACT Symbol'],
						label: data[i]['Company Name'],
					});
				}
				console.log(temp, 'temp');
				setList(temp);
			});
	}, []);
	return (
		<div className='bodyCont'>
			<LeftBody
				stock={stock}
				setStock={setStock}
				interval={interval}
				setInterval={setInterval}
				duration={duration}
				setDuration={setDuration}
				trading={trading}
				setTrading={setTrading}
				series={series}
				setSeries={setSeries}
				list={list}
			/>
			<RightBody
				stock={stock}
				interval={interval}
				setInterval={setInterval}
				duration={duration}
				setDuration={setDuration}
				trading={trading}
				setTrading={setTrading}
				series={series}
				setSeries={setSeries}
			/>
		</div>
	);
};

export default Body;
