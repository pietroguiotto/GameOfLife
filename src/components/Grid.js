import React from 'react'
import Box from './Box'

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

export default Grid