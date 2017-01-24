import React from 'react';
import bg from './images/bg.jpg'

const background = {
	backgroundImage: 'url(' + bg + ')'
}

export default class First extends React.Component {
  render() {
    return (
		<div className="hero" style={background}>
			<div className="row"> 
				<div className="col-lg-4 col-md-5 col-sm-6 col-xs-10">
						<h1>Crafting meaningful experience</h1>
						<p>
							<span className="hero__red">*</span>
							the knowledge or mastery of an event or subject gained through involvement in or exposure to it.
						</p>
				</div>
			</div>
		</div>
    )
  }
}
