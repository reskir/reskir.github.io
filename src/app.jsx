import React from 'react';
import About from './about.jsx';
import First from './first.jsx';
import Work from './work.jsx';
import Contact from './contact.jsx';
import Qa from './qa.jsx';
import $ from 'jquery'; 
import 'fullpage.js';

export default class App extends React.Component {
    componentDidMount = () => {
          $('#fullpage').fullpage({
            anchors:['hero', 'about', 'experience', 'contact', 'qa'],
            scrollBar: false,
            navigation: true,
            dragAndMove: true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom right',
            fixedElements: '#header'
          });
    }
    render() {
        return (
          <div id="fullpage">
              <div id="header">
                <h1>hi</h1>
              </div>
              <div className="section">
                <First />
              </div>
              <div className="section">
                <About />
              </div>
              <div className="section">
                  <Work />
              </div>
              <div className="section">
                  <Contact />
              </div>
              <div className="section">
                  <Qa />
              </div>
          </div>
        )
    }
}
