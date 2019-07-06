import React from 'react'

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

export default Buttons