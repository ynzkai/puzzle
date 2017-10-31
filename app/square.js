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
	this.handleClick = this.handleClick.bind(this);
	this.getValidGridAroundBlank = this.getValidGridAroundBlank.bind(this);
	this.getIndexByGrid = this.getIndexByGrid.bind(this);
	this.win = this.win.bind(this);

	this.state = {moves: 0, empty_cell: this.props.cols*this.props.rows-1, start: false, pos: this.make_pos()};
  }

  block_width() {
    return (this.props.width-this.props.cols-1) / this.props.cols;
  }

  block_height() {
    return (this.props.height-this.props.rows-1) / this.props.rows;
  }

  componentDidMount() {
	this.wincontainer = document.getElementById(css.win);
	this.shuffle();
  }

  componentDidUpdate() {
	if(!this.state.start) return;

	let win = true;
	this.state.pos.forEach((pos, index) => {
	  if(pos.cell != index) {
		win = false;
	  }
	});
	if(win) {
	  this.setState({start: false});
	  this.win();
	}
  }

  componentWillReceiveProps(nextProps) {
	if(this.props.width != nextProps.width || this.props.height != nextProps.height || this.props.cols != nextProps.cols || this.props.rows != nextProps.rows) {
	  let pos = [];
      let width = (nextProps.width-nextProps.cols-1) / nextProps.cols;
      let height = (nextProps.height-nextProps.rows-1) / nextProps.rows;
      for(let i=0; i<nextProps.rows; i++) {
        for(let j=0; j<nextProps.cols; j++) {
	  	let top = i*(height+1)+1;
	  	let left = j*(width+1)+1;
	  	pos.push({top: top, left: left, img_top: top, img_left: left});
        }
      }
	  this.setState({moves: 0, empty_cell: nextProps.cols*nextProps.rows-1, start: false, pos: pos});
	}
  }

  win() {

	let blocks = ReactDOM.findDOMNode(this.refs.square).childNodes;
	let number = this.props.cols*this.props.rows;
	// 动画
	let flag = false;
	for(let i=0; i<4*number; i++) {
	  let pos = i%number;
	  if(pos == 0) flag = !flag;
	  let opacity = flag ? 0 : 1;
	  setTimeout(() =>{
	    blocks[pos].style.opacity = opacity;
	  }, 50*i);
	}

	let cong = <h1>你赢了!</h1>;
	ReactDOM.render(cong, this.wincontainer);
	this.wincontainer.style.display = "block";
  }

  handleClick(e, cell) {
	if(!this.state.start) return;
	
	let empty_cell = this.state.empty_cell;
	if((cell==empty_cell-1 && (empty_cell%this.props.cols != 0))
	   || (cell==empty_cell+1 && (empty_cell%this.props.cols != this.props.cols-1))
	   || cell==empty_cell-this.props.cols || cell==empty_cell+this.props.cols) {
	  let pos = this.state.pos.slice(0);
	  let p = this.getIndexByGrid(cell, pos);
	  let q = this.getIndexByGrid(empty_cell, pos);
	  let t = pos[p];
	  pos[p] = pos[q];
	  pos[q] = t;
	  this.setState({moves: this.state.moves+1, empty_cell: cell, pos: pos});
	}
  }

  getValidGridAroundBlank(empty_cell) {
	let ps = [];
	let p = empty_cell-1;
	if(p>=0 && empty_cell%this.props.cols != 0) ps.push(p);
	p = empty_cell+1;
	if(p<this.state.pos.length && empty_cell%this.props.cols != this.props.cols-1) ps.push(p);
	p = empty_cell+this.props.cols;
	if(p<this.state.pos.length) ps.push(p);
	p = empty_cell-this.props.cols;
	if(p>=0) ps.push(p);

	let i = Math.ceil(Math.random()*10) % ps.length;
	return ps[i];
  }

  getIndexByGrid(cell, pos) {
	for(let i=0; i<pos.length; i++) {
	  if(pos[i].cell == cell) {
	  	return i;
	  }
	}
  }

  shuffle() {
	this.wincontainer.style.display = "none";
	if(this.state.start) {
	  this.setState({moves: 0, empty_cell: this.props.cols*this.props.rows-1, start: false, pos: this.make_pos()});
	} else {
	  let pos = this.state.pos.slice(0);
	  let empty_cell = this.state.empty_cell;
      for(let i=0; i<10000; i++) {
		let a = this.getValidGridAroundBlank(empty_cell);
	    let p = this.getIndexByGrid(a, pos);
	    let q = this.getIndexByGrid(empty_cell, pos);
		let t = pos[p];
		pos[p] = pos[q];
		pos[q] = t;
		empty_cell = a;
	  }
	  this.setState({moves: 0, start: true, empty_cell: empty_cell, pos: pos});
	}
  }

  make_pos() {
	let pos = [];
    for(let i=0; i<this.props.rows; i++) {
      for(let j=0; j<this.props.cols; j++) {
		let top = i*(this.block_height()+1)+1;
		let left = j*(this.block_width()+1)+1;
		pos.push({cell: i*this.props.cols+j, top: top, left: left});
      }
    }
	return pos;
  }

  make_blocks() {
	let blocks = this.state.pos.map((pos, index) => {
		           return (
                     <Block key={index} image_url={this.props.image_url}
					        empty_cell={pos.cell==this.state.empty_cell ? true : false}
							handleClick={this.handleClick}
	                        pos={pos}
	                  	    width={this.block_width()} height={this.block_height()}
							seq={index} show_seq={this.props.show_seq}
	                  	    square={{width: this.props.width, height: this.props.height}} />
				   );
	             });
	return blocks;
  }

  render() {
    return (
      <div className={css.squarewraper}>
        <div className={css.square} ref="square" style={{width: this.props.width, height: this.props.height}}>
	      {this.make_blocks()}
		  <div id={css.win}></div>
        </div>
        <div className={css.squarebuttons}>
		  <h3>moves: {this.state.moves}</h3>
	      <input type="button" ref="shuffle" value={this.state.start ? "重来" : "开始"} onClick={this.shuffle} />
	    </div>
		<div className={css.foot} ref="win">
          Designed by zk 2017.10.28 <a href="https://github.com/ynzkai/puzzle">github</a>
		</div>
	  </div>
    );
  }
}

