import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.column)
	}

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>
		)
	}
}

class Grid extends React.Component {
	render() {
		const width = this.props.columns * 16
		let rowsArray = []
		let boxClass = ''

		//following loop could be done with map() method

		for (let i = 0; i < this.props.rows; i++) {
			for (let j = 0; j < this.props.columns; j++) {
				let boxId = i + '_' + j
				boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off'
				rowsArray.push(
					<Box
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						column={j}
						selectBox={this.props.selectBox}
					/>
				)
			}
		}

		return (
			<div className="grid" style={{ width: width }}>
				{rowsArray}
			</div>
		)
	}
}

class Buttons extends React.Component {
	render() {
		return (
			<div className="center">
				<button onClick={this.props.playButton}>Play</button>
				<button onClick={this.props.pauseButton}>Pause</button>
				<button onClick={this.props.clearButton}>Clear</button>
				<button onClick={this.props.slowButton}>Slow</button>
				<button onClick={this.props.fastButton}>Fast</button>
				<button onClick={this.props.seedButton}>Seed</button>
			</div>
		)
	}
}

class Main extends React.Component {
	constructor() {
		super()

		this.speed = 250
		this.rows = 30
		this.columns = 50

		this.state = {
			generation: 0,
			gridFull: Array(this.rows)
				.fill()
				.map(() => Array(this.columns).fill(false))
		}
	}

	selectBox = (row, column) => {
		let gridCopy = arrayClone(this.state.gridFull)
		gridCopy[row][column] = !gridCopy[row][column]
		this.setState({
			gridFull: gridCopy
		})
	}

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull)
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		})
	}

	playButton = () => {
		clearInterval(this.intervalId)
		this.intervalId = setInterval(this.play, this.speed)
	}

	pauseButton = () => {
		clearInterval(this.intervalId)
	}

	slowButton = () => {
		this.speed = 750
		this.playButton()
	}

	fastButton = () => {
		this.speed = 100
		this.playButton()
	}

	seedButton = () => {
		this.pauseButton()
		this.seed()
	}

	clearButton = () => {
		this.pauseButton()
		let grid = Array(this.rows)
			.fill()
			.map(() => Array(this.columns).fill(false))
		this.setState({
			gridFull: grid,
			generation: 0
		})
	}

	play = () => {
		let g = this.state.gridFull
		let g2 = arrayClone(this.state.gridFull)
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				let count = 0
				if (i > 0) if (g[i - 1][j]) count++
				if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++
				if (i > 0 && j < this.columns - 1) if (g[i - 1][j + 1]) count++
				if (j < this.columns - 1) if (g[i][j + 1]) count++
				if (j > 0) if (g[i][j - 1]) count++
				if (i < this.rows - 1) if (g[i + 1][j]) count++
				if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++
				if (i < this.rows - 1 && j < this.columns - 1)
					if (g[i + 1][j + 1]) count++
				if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false
				if (!g[i][j] && count === 3) g2[i][j] = true
			}
		}
		this.setState({
			gridFull: g2,
			generation: this.state.generation + 1
		})
	}

	componentDidMount() {
		// Here anything which should run after the component mounts
	}

	render() {
		return (
			<div className="center">
				<h1>Game of Life</h1>
				<div className="center">
					<ul>
						<li>
							Select the squares you want to start with, by clicking on any cell{' '}
							<small>(Click "seed" for a random selection)</small>
						</li>
						<li>Press "play"</li>
						<li>Set speed using "slow" or "fast" buttons</li>
						<li>
							Check out some cool patterns to experiment with on{' '}
							<a
								href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns"
								target="_blank"
							>
								Conway's Game of Life - Wikipedia article
							</a>
						</li>
					</ul>
				</div>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slowButton={this.slowButton}
					fastButton={this.fastButton}
					clearButton={this.clearButton}
					seedButton={this.seedButton}
				/>

				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					columns={this.columns}
					selectBox={this.selectBox}
				/>
				<h2>Generations: {this.state.generation}</h2>
			</div>
		)
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr))
}

ReactDOM.render(<Main />, document.getElementById('root'))
