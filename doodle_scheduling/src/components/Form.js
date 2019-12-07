import React from 'react';
import { db } from './firebase'
export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = { contentList: [], emailList: [], };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit =
			this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// db
		// 	.collection("users")
		// 	.doc(JSON.parse(localStorage.getItem("currentUser")))
		// 	.get()
		// 	.then((data) => {
		// 		if (data.exists) {
		// 			this.setState({ emailList: data.data().contacts, contentList: data.data().events })
		// 		}
		// 	})
	}

	render() {
		return (
			<form className="test-mailing">
				<h1>Let's see if it works</h1>
				<div>
					<textarea
						id="test-mailing"
						name="test-mailing"
						onChange={this.handleChange}
						placeholder="Send event"
						required
						value={this.state.feedback}
						style={{ width: '100%', height: '150px' }}
					/>
				</div>
				<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
			</form>
		)
	}

	handleChange(event) {
		this.setState({ feedback: event.target.value })
	}

	handleSubmit(event) {
		const templateId = 'yes';

		this.sendFeedback(templateId, { message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email })
		this.props.handleDisplay();
	}

	sendFeedback(templateId, variables) {
		window.emailjs.send("gmail", templateId, { "send_to": this.state.emailList, "content": this.state.contentList })   // insert custom emails for send_to
			.then(res => {
				console.log('Email successfully sent!');
				console.log(variables);
			})
			// Handle errors here however you like, or use a React error boundary
			.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
	}
}