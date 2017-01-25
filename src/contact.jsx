import React from 'react';

export default class Contact extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
				valid: 'hide',
				name: '',
				email: '',
				company: '',
				budget: '',
				comment: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleInputChange(event) {
    const name = event.target.id;
    this.setState({
				[name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
	  this.setState({
			valid: event.target.checkValidity() ? '' : 'hide'
		})
  }

  render() {
    return (
			<div className={ 'contact '} >
					<div className="row">
						<h1 className="animate col-lg-12 contact__header"> Let's create something together</h1>
					</div>
					
					<h3 className={ this.state.valid }> Thank you, your message is sent </h3>
					<form className="row col-lg-4 animate" onSubmit={this.handleSubmit} autoComplete="false">
						<div className="col-lg-10 col-xs-12 contact__control animate">
							<input required onChange={ this.handleInputChange } name="name"  value={ this.state.name } autoFocus className="contact__input" type="text" id="name" placeholder="Your name" />
						</div>

						<div className="col-lg-10 col-xs-12 contact__control animate">
							<input required onChange={ this.handleInputChange }  value={ this.state.email } className="contact__input" type="email" id="email" placeholder="Email" />
						</div>
						
						<div className="col-lg-10 col-xs-12 contact__control animate">
							<input onChange={ this.handleInputChange }  value={ this.state.company } className="contact__input" type="text" id="company" placeholder="Company" />
						</div>

						<div className="col-lg-10 col-xs-12 contact__control animate">
							<select className="contact__input" id="budget" value={ this.state.budget } onChange={ this.handleInputChange }>
								<option value="0">Estimated budget</option>
								<option value="$1500 - 2000">$1500 - 2000</option>
								<option value="$2000 - 2500">$2000 - 2500</option>
								<option value="$2500 - 5000">$2500 - 5000</option>
							</select>
						</div>

						<div className="col-lg-10 col-xs-12 contact__control animate">
							<textarea value={ this.state.comment } onChange={ this.handleInputChange }  className="contact__input contact__input--textarea" type="text" id="comment" placeholder="Describe your project" />
						</div>

						<div className="col-lg-10 animate contact__control">
							<button className="contact__submit" type="submit"> Send request </button>
						</div>
					</form>
			</div>
    )
  }
}

