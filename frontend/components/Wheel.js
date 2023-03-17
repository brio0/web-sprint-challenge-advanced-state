import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0, 1, 2, 3, 4, 5].map(idx => {
            return <div key={idx} className={`cog${idx === props.wheel ? ' active' : ''}`} style={{ "--i": idx }}>
              {idx === props.wheel ? 'B' : ''}
            </div>
          })
        }
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div> */}
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}
export default connect(st => st, actionCreators)(Wheel)