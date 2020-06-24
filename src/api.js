const React = require('react');
const ReactDOM = require('react-dom');
//    var filename = `/audio/${data}.mp3`;
//    api.emit('my other event', { my: 'data' }, refreshPage();

const api = io.connect('http://localhost:5000/');

api.on('news',refresh);

function refresh(data){
//    ReactDOM.render(<Music url={data}/>, document.getElementById('music'));
    return data;
}

export default refresh;



