import React from 'react';
import ReactDOM from 'react-dom';
import css from './puzzle.css';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className={css.block} style={{top: this.props.pos.top, left: this.props.pos.left, width: this.props.width, height: this.props.height}}>
	    <div className={css.inner}>
	      <img src={this.props.image_url} title="Puzzle image" style={{top: this.props.img_pos.top*-1, left: this.props.img_pos.left*-1, width: this.props.square.width, height: this.props.square.height}} />
		</div>
      </div>
    );
  }
}
