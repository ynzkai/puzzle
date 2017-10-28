import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';
import css from './puzzle.css';

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
	this.max_width = 800;
	this.min_width = 100;
	this.max_height = 800;
	this.min_height = 100;
	this.max_cols = 100;
	this.min_cols = 3;
	this.max_rows = 100;
	this.min_rows = 3;
	this.state = {image_url: "image.jpg", width: 400, height: 400, cols: 3, rows: 3, show_seq: "N"};

	this.handleChange = this.handleChange.bind(this);
	this.changeImg = this.changeImg.bind(this);
	this.changeSize = this.changeSize.bind(this);
	this.changeGrid = this.changeGrid.bind(this);
  }

  changeSize(e) {
	let name = e.target.getAttribute("name");
	var width = this.state.width;
	var height = this.state.height;
	if(name == "addwidth") {
		width  = this.state.width + 50;
	} else if(name == "subwidth") {
		width  = this.state.width - 50;
	} else if(name == "addheight") {
		height  = this.state.height + 50;
	} else if(name == "subheight") {
		height  = this.state.height - 50;
	}
	width = Math.max(Math.min(width, this.max_width), this.min_width);
	height = Math.max(Math.min(height, this.max_height), this.min_height);
	var state = {width: width, height: height};
	this.setState(state);
  }

  changeGrid(e) {
	let name = e.target.getAttribute("name");
	var cols = this.state.cols;
	var rows = this.state.rows;
	if(name == "addcols") {
		cols  = this.state.cols + 1;
	} else if(name == "subcols") {
		cols  = this.state.cols - 1;
	} else if(name == "addrows") {
		rows  = this.state.rows + 1;
	} else if(name == "subrows") {
		rows  = this.state.rows - 1;
	}
	cols = Math.max(Math.min(cols, this.max_cols), this.min_cols);
	rows = Math.max(Math.min(rows, this.max_rows), this.min_rows);
	var state = {cols: cols, rows: rows};
	this.setState(state);
  }

  handleChange(e) {
	let name = e.target.getAttribute("name");
	switch(name) {
	case "image_url":
		if(e.keyCode == 13) {
		  var state = {image_url: e.target.value};
		  this.setState(state);
		}
		break;
	case "show_seq":
		var state = this.state.show_seq == "Y" ? {show_seq:"N"} : {show_seq:"Y"}
		this.setState(state);
		break;
	}
  }

  changeImg(e) {
	let image_url =  e.target.getAttribute("src") || this.state.image_url;
	this.setState({image_url: image_url});
  }



  render() {
	let img_urls = [ "image.jpg",
		             "https://wx2.sinaimg.cn/mw690/648ac377gy1fkp3pz88udj20xc0pnwom.jpg",
				     "https://wx1.sinaimg.cn/mw690/648ac377gy1fkshfc5zemj20sg0sg45d.jpg",
				     "https://wx3.sinaimg.cn/mw690/648ac377gy1fkp3aen3qdj20zk0nwaha.jpg",
					 "https://wx2.sinaimg.cn/mw690/648ac377gy1fkuouv6iwzj20rs0n57k0.jpg" ];
	let imgs = img_urls.map((url, index) => {
		         return <div key={index} className={css.imgs}><img src={url} onClick={this.changeImg} /></div>
		       });

    return (
      <div className={css.puzzle}>
	    <div className={css.header}>
		  <h3>拼图游戏</h3>
		</div>
		<div className={css.sidebar}>
		  <div className={css.rowButton}>
		    <input type="button" disabled={this.state.width<=this.min_width ? true : false} name="subwidth" value="-50" onClick={this.changeSize}  />
			<span>{this.state.width}</span>
		    <input type="button" disabled={this.state.width>=this.max_width ? true : false} name="addwidth" value="+50" onClick={this.changeSize}  />
		  </div>
		  <div className={css.rowButton}>
		    <input type="button" disabled={this.state.height<=this.min_height ? true : false} name="subheight" value="-50" onClick={this.changeSize}  />
			<span>{this.state.height}</span>
		    <input type="button" disabled={this.state.height>=this.max_height ? true : false} name="addheight" value="+50" onClick={this.changeSize}  />
		  </div>
		  <div className={css.rowButton}>
		    <input type="button" disabled={this.state.cols<=this.min_cols ? true : false} name="subcols" value="-1" onClick={this.changeGrid}  />
			<span>{this.state.cols}</span>
		    <input type="button" disabled={this.state.cols>=this.max_cols ? true : false} name="addcols" value="+1" onClick={this.changeGrid}  />
		  </div>
		  <div className={css.rowButton}>
		    <input type="button" disabled={this.state.rows<=this.min_rows ? true : false} name="subrows" value="-1" onClick={this.changeGrid}  />
			<span>{this.state.rows}</span>
		    <input type="button" disabled={this.state.rows>=this.max_rows ? true : false} name="addrows" value="+1" onClick={this.changeGrid}  />
		  </div>
		  <div className={css.row}><input type="button" name="show_seq" value={this.state.show_seq=="Y" ? "hide pos" : "show pos"} onClick={this.handleChange} placeholder={this.state.show_seq} /></div>
		  <div className={css.image_url}><input type="text" name="image_url" onKeyDown={this.handleChange} placeholder="输入图片链接按回车" /></div>
		  {imgs}
		</div>
		<div className={css.thumb}>
		  <img src={this.state.image_url} />
		</div>
	    <Square image_url={this.state.image_url} rows={this.state.rows} cols={this.state.cols} width={this.state.width} height={this.state.height} show_seq={this.state.show_seq} />
      </div>
    );
  }
}

