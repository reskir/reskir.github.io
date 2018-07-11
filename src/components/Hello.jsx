import React, { Component } from "react";

class Hello extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="text-secondary">Hello there!</p>
        <p className="about-me">
          Welcome to my website. I am frontend developer with focus on design,
          performance and maintainability. I like building products from scratch
          using modern web development tools.
        </p>
        <p className="text-secondary">Some random facts</p>
        <ul>
          <li> located in beautiful city Vilnius, Lithuania 🇱🇹</li>
          <li> currently working at 1stdibs.com </li>
          <li> sometimes writing about cities, infrastructure and urbanism on <a href="https://urbanistas.lt">urbanistas.lt</a> (LTU language) </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Hello;
