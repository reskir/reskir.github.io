import React from 'react';
import bg from './images/bg.jpg'


export default class Qa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: '',
			items: ['1', '2', '3'],
			date: new Date().getSeconds().toString()
		};
		this.handleClock = this.handleClock.bind(this);
		this.handleClick = this.handleClick.bind(this);
  	}
	
	handleClock(event) {
		this.setState({
			date: new Date().getSeconds().toString()
		})
	}


	handleClick(event) {
		this.setState({
			active: event.target.id
		})

		if( this.state.items.includes(this.state.active)) {
			document.querySelectorAll('.accordeon__item').forEach(function(element) {
				element.classList.remove('accordeon__item--show', 'highlight')
			})
			event.target.classList.add('accordeon__item--show', 'highlight')
		}
	}
  render() {
    return (
		<div className={ "qa "}>
			<div className="row"> 
				<h1 className="animate"> Questions and answers </h1>
			</div>
			<div className="row">
				<div className="accordeon col-lg-4 col-md-6 col-sm-8 col-xs-12">
  					<div className="accordeon__item animate" id="1" onClick={ this.handleClick }>
						<div className="accordeon__item__title">
							Where are you from?
						</div>
						<div className="accordeon__item__content">
							I'm from beautiful city in eastern Europe - Vilnius.
						</div>
					</div>
					<div className="accordeon__item animate" id="2" onClick={ this.handleClick }>
						<div className="accordeon__item__title">
							What is your experience?
						</div>
						<div className="accordeon__item__content">
							I have 5 years experience in building interfaces and web projects. 
							My main scope is UI libraries, animations, design and interactions, frontend development, wireframing and sketching.
						</div>
					</div>
					<div className="accordeon__item animate" id="3" onClick={ this.handleClick }>
						<div className="accordeon__item__title">
							What is yours hourly rate?
						</div>
						<div className="accordeon__item__content">

							Usually it depends on complexity of interface and system.
							I prefer to work on long-term projects which usually are consisted of ui library, ui testing, prototypes/sketches and etc.
							As reference my hour rate would be <span className="red">$9</span>.
							<table className="qa__table">
								<thead>
									<tr>
										<th>
										 Product
										</th>
										<th className="numeric">
										 Estimated costs
										</th>
									</tr>
								</thead>
								<tbody>

									<tr>
										<td>Styleguides/UI library</td>
										<td className="numeric"> $3000 - $5000 </td>
									</tr>

									
									<tr>
										<td> Frontend consulting </td>
										<td className="numeric"> $1000 - $1500 </td>
									</tr>

									<tr>
										<td> Single Page </td>
										<td className="numeric"> $800 - $1600 </td>
									</tr>

								</tbody>
							</table>
								I also enjoy working with creative/marketing projects, 
								such as presentational pages or interactive banners. <a href="//localhost:8888/#contact">Contact</a> me for more information.
						</div>
					</div>
				</div>
			</div>
		</div>
    )
  }
}