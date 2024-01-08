import { Button, List } from '@mui/material';
import { useState } from 'react';
import Select from 'react-select';
import '../styles/leftbody.css';
const LeftBody = ({
	stock,
	setStock,
	interval,
	duration,
	trading,
	setTrading,
	series,
	setSeries,
	list,
}) => {
	const [stockData, setStockData] = useState();
	const [stockBrief, setStockBrief] = useState();

	const [week, setWeek] = useState();
	const [monthData, setMonthData] = useState();
	const [yearData, setYearData] = useState();
	const [temp, setTemp] = useState();
	const round = (number) => {
		return number ? +number.toFixed(2) : null;
	};
	const getData = () => {
		//api to get stock summary
		fetch(
			`https://query1.finance.yahoo.com/v11/finance/quoteSummary/${stock.symbol}?modules=assetProfile`
		)
			.then((res) => res.json())
			.then((data) => {
				setStockBrief(data.quoteSummary.result);
				// console.log(data.quoteSummary.result);
			});
		//api to get stock condition like it is moving up or downwards and other information
		fetch(`https://query1.finance.yahoo.com/v7/finance/options/${stock.symbol}`)
			.then((res) => res.json())
			.then((data) => {
				setStockData(data.optionChain.result);
			});
		//api to get chart data for default value of interval and duration which is 1 hour and 3 months
		fetch(
			`https://query1.finance.yahoo.com/v8/finance/chart/${stock.symbol}?metrics=high?&interval=${interval}&range=${duration}`
		)
			.then((res) => res.json())
			.then((data) => {
				setTrading(data.chart.result);
				const quote = data.chart.result[0].indicators.quote[0];
				const prices = data.chart.result[0].timestamp.map(
					(timestamp, index) => ({
						x: new Date(timestamp * 1000),
						y: [
							quote.open[index],
							quote.high[index],
							quote.low[index],
							quote.close[index],
						].map(round),
					})
				);
				setSeries([
					{
						data: prices,
					},
				]);
			});

		console.log(series);
		setTemp(stock);
	};

	return (
		<div className='leftBodyCont'>
			<div style={{ padding: '1rem' }}>
				<div>
					<p style={{ fontSize: '0.9rem', color: 'gray' }}>
						Search for the stock
					</p>
				</div>
				<div>
					<Select
						className='basic-single'
						classNamePrefix='select'
						name='color'
						isClearable='true'
						// getValue={() => setStock()}
						onChange={(e) => {
							setStock({
								symbol: e.value,
								name: e.label,
							});
							console.log('select');
						}}
						options={list}
					/>
				</div>
				<div style={{ marginTop: '1rem' }}>
					{/* button will give general and interaday data about the stock */}
					<Button variant='outlined' color='primary' onClick={() => getData()}>
						Search
					</Button>
				</div>
			</div>
			<div>
				{/* stockData */}
				<div>
					{stockData != undefined && (
						<div className='stockdata'>
							<div className='stockdatachild'>
								<p style={{ fontSize: '2rem' }}>
									{stockData[0].quote.displayName}
									<span style={{ color: 'gray', fontSize: '0.9rem' }}>
										{' ('}
										{stockData[0].quote.symbol}
										{')'}
									</span>
								</p>
								<p style={{ fontSize: '1.2rem' }}>
									<span style={{ color: 'gray', fontSize: '0.9rem' }}>
										{' '}
										Current Price:
									</span>{' '}
									{stockData[0].quote.regularMarketPrice}
									{'$ '}
								</p>
							</div>
							<div className='stockdatachild' style={{ textAlign: 'right' }}>
								<p
									style={{
										color: `${
											stockData[0].quote.regularMarketChangePercent > 0
												? 'green'
												: 'red'
										}`,
										fontSize: '2rem',
									}}
								>
									{/* terniary operator to get colour representation to represent growth or fall in stock  */}
									{stockData[0].quote.regularMarketChangePercent.toFixed(2)}%{' '}
									{stockData[0].quote.regularMarketChangePercent > 0
										? '⬆️'
										: '⬇️'}
								</p>
							</div>
						</div>
					)}
				</div>
				{/* stock info */}
				{stockBrief && (
					<div style={{ fontSize: '0.8rem', color: 'gray', padding: '1rem' }}>
						{/* stock brief */}
						{stockBrief[0].assetProfile.longBusinessSummary}
					</div>
				)}
			</div>
		</div>
	);
};

export default LeftBody;
