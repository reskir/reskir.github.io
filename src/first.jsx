import React from 'react';
import bg from './images/bg.jpg'

const background = {
	backgroundImage: 'url(' + bg + ')'
}

export default class First extends React.Component {
  render() {
    return (
		<div className={ "hero "} style={background}>
			<div className="row hero__inner"> 
				<div className="col-lg-4 col-md-5 col-sm-6 col-xs-12 animate">
						<h1 className="animate">Crafting user experience<span className="hero__red">*</span></h1>
						<p className="animate"><span className="hero__red">*</span>meaningful and valuable aspects of human–computer interaction and product ownership</p>
				</div>
			</div>
		</div>
    )
  }
}