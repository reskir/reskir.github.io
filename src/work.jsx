import React from 'react';
import AdformLogo from './images/adform_logo.png';
import App from './images/App.png';
const background = {
	backgroundImage: 'url(' + App + ')'
}

export default class Work extends React.Component {

  render() {

    return (
			<div className={ 'work '} style={background}>
				<div className="row">
					<h1 className="col-lg-12"> Proudbly worked with</h1>
				</div>
				<div className="row start-lg">
					<blockquote className="col-lg-6 animate work__blockquote">
						"Kiril showed great results, exclusive attention to details and great collaboration with other collegues" 
						<div className="col-lg-12 animate work__logo">
							<div className="work__blockquote--author italic">- Mykolas Šaučiūnas Podkeeper at UX team</div>
							<img src={AdformLogo} width="100" />
						</div>
					</blockquote>
				</div>
			</div>
    )
  }
}

