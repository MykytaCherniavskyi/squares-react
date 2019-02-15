import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

ReactDOM.render(
  <Table initialWidth={4} initialHeight={4} cellSize={50} />,
  document.getElementById('root')
);
