import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';

export default class Puzzle extends React.Component {
  render() {
	const image_url = "http://wx1.sinaimg.cn/mw690/648ac377gy1fkvqdcwfeij20zk0oldoy.jpg";
    return (
      <div className="puzzle">
	    <Square image_url={image_url} rows={4} cols={4} width={400} height={400} />
      </div>
    );
  }
}

