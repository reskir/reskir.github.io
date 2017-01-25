import React from 'react';
import AdformLogo from './images/adform_logo.png';
import App from './images/App.png';

export default class Work extends React.Component {

  render() {

    return (
			<div className={ 'work '}>
				<div className="row">
					<h1 className="col-lg-12"> Proudly worked with</h1>
				</div>
				<div className="row start-lg">
					<blockquote className="col-lg-6 col-xs-12 animate work__blockquote">
						Implemented styleguide driven development, maintained and scaled across ~23 products in leading Adtech company.
						<div className="animate work__logo">
							<img src={AdformLogo} width="150" />
						</div>
					</blockquote>
				</div>
			</div>
    )
  }
}

