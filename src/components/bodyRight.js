import Chart from 'react-apexcharts';
import '../styles/rightbody.css';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
const RightBody = ({
	trading,
	setTrading,
	stock,
	setInterval,
	setDuration,
	interval,
	duration,
	series,
	setSeries,
}) => {
	// function converts the number to 2 decimal place
	const round = (number) => {
		return number ? +number.toFixed(2) : null;
	};
	useEffect(() => {
		// api to get stock data when user changes the duration
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
	}, [duration]);
	const chart = {
		options: {
			chart: {
				type: 'candlestick',
				height: 350,
			},

			xaxis: {
				type: 'datetime',
			},
			yaxis: {
				tooltip: {
					enabled: true,
				},
			},
		},
	};
	return (
		<div className='rightBodyCont'>
			{
				<div style={{ padding: '1rem' }}>
					<Chart
						options={chart.options}
						series={series}
						type='candlestick'
						width='100%'
						height={320}
					/>
				</div>
			}
			<div
				style={{
					padding: '1rem 2rem',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Button
					variant={duration == '1d' ? 'contained' : 'outlined'}
					color='primary'
					onClick={() => {
						setDuration('1d');
						setInterval('1m');
					}}
				>
					1 d
				</Button>
				<Button
					variant={duration == '1mo' ? 'contained' : 'outlined'}
					color='primary'
					onClick={() => {
						setDuration('1mo');
						setInterval('1h');
					}}
				>
					1 M
				</Button>
				<Button
					variant={duration == '3mo' ? 'contained' : 'outlined'}
					color='primary'
					onClick={() => {
						setDuration('3mo');
						setInterval('1h');
					}}
				>
					3 M
				</Button>
				<Button
					variant={duration == '1y' ? 'contained' : 'outlined'}
					color='primary'
					onClick={() => {
						setDuration('1y');
						setInterval('1d');
					}}
				>
					1 Y
				</Button>
				<Button
					variant={duration == '5y' ? 'contained' : 'outlined'}
					color='primary'
					onClick={() => {
						setDuration('5y');
						setInterval('1d');
					}}
				>
					5 Y
				</Button>
			</div>
		</div>
	);
};

export default RightBody;
