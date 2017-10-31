import React from 'react';
import ReactDOM from 'react-dom';
import css from './puzzle.css';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
	this.state = {seq: props.seq, img_top: props.pos.top*-1, img_left: props.pos.left*-1};
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className={css.block} onClick={(e) => {this.props.handleClick(e, this.props.pos.cell)}} style={{top: this.props.pos.top, left: this.props.pos.left, width: this.props.width, height: this.props.height}}>
	    <div className={css.inner} style={{opacity: (this.props.empty_cell ? .05 : 1)}}>
	      <img src={this.props.image_url} style={{top: this.state.img_top, left: this.state.img_left, width: this.props.square.width, height: this.props.square.height}} />
		  {this.props.show_seq=="Y" ?  <span>{this.props.seq}</span> : "" }
		</div>
      </div>
    );
  }
}
