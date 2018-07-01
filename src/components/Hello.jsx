import React, { Component } from "react";

class Hello extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Hello here!</h1>
        <p className="about-me">
          I am Kiril Abaskin, javascript developer located in Vilnius 🇱🇹, but
          available for working around 🌎 🌏 🌍.<br /> <br />
          I like to build modern web applications with <strong>node</strong>, <strong>react</strong>, <strong>relay</strong>{" "}
          & <strong>graphql</strong> & <strong>☕️/🍺</strong>.
        </p>
      </React.Fragment>
    );
  }
}

export default Hello;
