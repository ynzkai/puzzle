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
	this.getValidPosRoundBlank = this.getValidPosRoundBlank.bind(this);
	this.win = this.win.bind(this);

	this.state = {moves: 0, blank: this.props.cols*this.props.rows-1, start: false, pos: this.make_pos()};
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
	  this.setState({moves: 0, blank: nextProps.cols*nextProps.rows-1, start: false, pos: pos});
	}
  }

  componentDidUpdate() {
	if(!this.state.start) return;

	let win = true;
	this.state.pos.forEach((pos) => {
	  if(pos.top != pos.img_top || pos.left != pos.img_left) {
		win = false;
	  }
	});
	if(win) {
	  this.setState({start: false});
	  this.win();
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

  handleClick(e, seq) {
	if(!this.state.start) return;
	
	let blank = this.state.blank;
	if((seq==blank-1 && (blank%this.props.cols != 0))
	   || (seq==blank+1 && (blank%this.props.cols != this.props.cols-1))
	   || seq==blank-this.props.cols || seq==blank+this.props.cols) {
	  let pos = this.state.pos.slice(0);
	  let t = {}
	  t.img_top = pos[seq].img_top;
	  t.img_left = pos[seq].img_left;
	  pos[seq].img_top = pos[blank].img_top;
	  pos[seq].img_left = pos[blank].img_left;
	  pos[blank].img_top = t.img_top;
	  pos[blank].img_left = t.img_left;
	  this.setState({moves: this.state.moves+1, blank: seq, pos: pos});
	}
  }

  getValidPosRoundBlank(blank) {
	let ps = [];
	let p = blank-1;
	if(p>=0 && blank%this.props.cols != 0) ps.push(p);
	p = blank+1;
	if(p<this.state.pos.length && blank%this.props.cols != this.props.cols-1) ps.push(p);
	p = blank+this.props.cols;
	if(p<this.state.pos.length) ps.push(p);
	p = blank-this.props.cols;
	if(p>=0) ps.push(p);

	let i = Math.ceil(Math.random()*10) % ps.length;
	return ps[i];
  }

  shuffle() {
	this.wincontainer.style.display = "none";
	if(this.state.start) {
	  this.setState({moves: 0, blank: this.props.cols*this.props.rows-1, start: false, pos: this.make_pos()});
	} else {
      let block_number = this.props.rows * this.props.cols;
	  let pos = this.state.pos.slice(0);
	  let blank = this.state.blank;
      for(let i=0; i<100000; i++) {
		/*
	  	let a = Math.ceil(Math.random()*10*block_number) % block_number;
	  	let b = Math.ceil(Math.random()*10*block_number) % block_number;
	  	if(a == blank) {
	  		blank = b;
	  	} else if(b == blank) {
	  		blank = a;
	  	}
	  	let t = {};
	  	t.img_top = pos[a].img_top;
	  	t.img_left = pos[a].img_left;
	  	pos[a].img_top = pos[b].img_top;
	  	pos[a].img_left = pos[b].img_left;
	  	pos[b].img_top = t.img_top;
	  	pos[b].img_left = t.img_left;
		*/
		let a = this.getValidPosRoundBlank(blank);
	  	let t = {};
	  	t.img_top = pos[a].img_top;
	  	t.img_left = pos[a].img_left;
	  	pos[a].img_top = pos[blank].img_top;
	  	pos[a].img_left = pos[blank].img_left;
	  	pos[blank].img_top = t.img_top;
	  	pos[blank].img_left = t.img_left;
		blank = a;
	  }
	  this.setState({moves: 0, start: true, blank: blank, pos: pos});
	}
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
                     <Block key={index} seq={index} image_url={this.props.image_url}
					        blank={index==this.state.blank ? true : false}
							handleClick={this.handleClick}
	                        pos={{top: pos.top, left: pos.left}}
	                        img_pos={{top: pos.img_top, left: pos.img_left}}
	                  	    width={this.block_width()} height={this.block_height()}
							show_seq={this.props.show_seq}
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

