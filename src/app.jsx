import React from 'react';
import About from './about.jsx';
import First from './first.jsx';

import {SectionsContainer, Section} from 'react-fullpage';

let options = {
  activeClass: 'act', // the class that is appended to the sections links
  anchors: ['main', 'about', 'contact'],
  arrowNavigation: true, // use arrow keys
  className:  'wrapper', // the class name for the section container
  delay: 800, // the scroll animation speed
  navigation: true, // use dots navigatio
  scrollBar: false, // use the browser default scrollbar
  sectionClassName: 'section', // the section class name
  sectionPaddingTop: '0', // the section top padding
  sectionPaddingBottom: '0', // the section bottom padding
  verticalAlign: false // align the content of each section vertical
}

export default class App extends React.Component {
  render() {
    return (
    <SectionsContainer {...options}>
      <Section>
        <First />
      </Section>
      <Section>
        <About />
      </Section>
      <Section>
        <About />
      </Section>
    </SectionsContainer>
    )
  }
}
