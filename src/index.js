import ReactDOM from 'react-dom/client';
import React from 'react';

import { GHPageStatus } from './github-page-status';

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<GHPageStatus />);
