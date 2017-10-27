import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';
import css from './puzzle.css';

export default class Square extends React.Component {
  constructor(props) {
    super(props);

	this.make_blocks = this.make_blocks.bind(this);
	this.make_pos = this.make_pos.bind(this);
	this.shuffle = this.shuffle.bind(this);
	this.block_width = this.block_width.bind(this);
	this.block_height = this.block_height.bind(this);

	this.state = {pos: this.make_pos()};
  }

  block_width() {
    return (this.props.width-this.props.cols-1) / this.props.cols;
  }

  block_height() {
    return (this.props.height-this.props.rows-1) / this.props.rows;
  }


  shuffle() {
    let block_number = this.props.rows * this.props.cols;
	let pos = this.state.pos.slice(0);
    for(let i=0; i<100; i++) {
		let a = Math.ceil(Math.random()*10*block_number) % block_number;
		let b = Math.ceil(Math.random()*10*block_number) % block_number;
		let t = {};
		t.top = pos[a].top;
		t.left = pos[a].left;
		pos[a].top = pos[b].top;
		pos[a].left = pos[b].left;
		pos[b].top = t.top;
		pos[b].left = t.left;
	}
	this.setState({pos: pos});
  }

  make_pos() {
	let pos = [];
    for(let i=0; i<this.props.rows; i++) {
      for(let j=0; j<this.props.cols; j++) {
		let top = i*(this.block_height()+1)+1;
		let left = j*(this.block_width()+1)+1;
		pos.push({top: top, left: left, img_top: top, img_left: left});
      }
    }
	return pos;
  }

  make_blocks() {
	let blocks = this.state.pos.map((pos, index) => {
		           return (
                     <Block key={index} image_url={this.props.image_url}
	                        pos={{top: pos.top, left: pos.left}}
	                        img_pos={{top: pos.img_top, left: pos.img_left}}
	                  	    width={this.block_width()} height={this.block_height()}
	                  	    square={{width: this.props.width, height: this.props.height}} />
				   );
	             });
	/*
	let blocks = [];
    for(let i=0; i<this.props.rows; i++) {
      for(let j=0; j<this.props.cols; j++) {
		let index = i*this.props.cols+j;
		let top = i*(this.block_height()+1)+1;
		let left = j*(this.block_width()+1)+1;
		blocks.push(<Block key={index} image_url={this.props.image_url}
	                       pos={{top: top, left: left}}
	                       img_pos={{top: top, left: left}}
	                  	   width={this.block_width()} height={this.block_height()}
	                  	   square={{width: this.state.width, height: this.state.height}} />);
      }
    }
    */
	return blocks;
  }

  render() {
    return (
    <div>
      <div className={css.square} style={{width: this.props.width, height: this.props.height}}>
	    {this.make_blocks()}
      </div>
	  <input type="button" value="shuffle" onClick={this.shuffle} />
	</div>
    );
  }
}

