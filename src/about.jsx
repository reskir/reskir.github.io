import React from 'react';
import bemLogo from './images/bem.svg';
import smacssLogo from './images/jack-smacks.png';



export default class About extends React.Component {

  render() {

    return (
		<div className={ 'about '} >
				<div className="row">
						<div className='about__block col-lg-4 start-lg'>
							<p className="animate about__desc">
							My name is Kiril and I like crafting scalable, fast, reliable and maintanable interfaces for people.
							I am developer with good sense of design, especially UI/UX. I say to my friends that I'm frontend developer, but usually this means that I am working on
							</p>
							<ul className="about__list animate">
								<li className="animate">UX/UI</li>
								<li className="animate">Styleguides</li>
								<li className="animate">HTML/CSS/JS</li>
								<li className="animate">Project Management, Business Development</li>
								<li className="animate">Webpack, Grunt, Gulp</li>
								<li className="animate">React + Redux</li>
							</ul>
						</div>
				</div>
				<div className="row end-lg">
					<h4 className='about__title animate col-lg-3'>
						<blockquote className="about__quote">“Design is not primarily supposed to entertain or to be nice or to aesthetically please. It’s supposed to perform.” - Oliver Reichenstein</blockquote>
					</h4>
				</div>
			</div>
    )
  }
}

