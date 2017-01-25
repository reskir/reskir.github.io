import React from 'react';
import About from './about.jsx';
import First from './first.jsx';
import Work from './work.jsx';
import $ from 'jquery'; 
import 'fullpage.js';

export default class App extends React.Component {
    componentDidMount = () => {
          $('#fullpage').fullpage({
            anchors:['hero', 'about', 'experience'],
            scrollBar: false,
            navigation: true,
            dragAndMove: true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom right'
          });
    }
    render() {
        return (
          <div id="fullpage">
              <div className="section">
                <First />
              </div>
              <div className="section">
                <About />
              </div>
              <div className="section">
                  <Work />
              </div>
          </div>
        )
    }
}
