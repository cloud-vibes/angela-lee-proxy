require('newrelic');

const express = require('express');
const proxy = require('http-proxy-middleware');
// const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3001;

// app.use(morgan('dev'));
app.use('/scripts', express.static(path.resolve(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/musicplayer/*', proxy({ target: 'http://ec2-54-242-57-180.compute-1.amazonaws.com', changeOrigin: true }));
app.use('/api/description/*', proxy({ target: 'http://ec2-54-175-49-234.compute-1.amazonaws.com', changeOrigin: true }));
app.use('/api/comments/*', proxy({ target: 'http://ec2-54-80-244-244.compute-1.amazonaws.com', changeOrigin: true }));
app.use('/api/sidebar/*', proxy({ target: 'http://ec2-3-91-101-162.compute-1.amazonaws.com', changeOrigin: true }));
app.use('/graphql', proxy({ target: 'http://ec2-3-91-101-162.compute-1.amazonaws.com', changeOrigin: true }));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});