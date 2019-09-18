import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { email: "", name: "", password: ""};
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        // window.location.href = "http://localhost:3000/#/register";
        this.props.closeModal();
        if(this.props.formType === "Signup"){
            // this.state.password2 = this.state.password; //TODO: the field is confirm password
            this.props.signup(this.state).then(() => this.props.history.push('/'));
            
            }
        else{
            this.props.login(this.state).then(() => this.props.history.push('/'));
            
        }
    }

    handleClose(e) {
        e.preventDefault();
        this.props.closeModal();
    }
    
    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    render(){

        let  {formType, errors} = this.props;
        errors = errors || [];
        const errorsLi = errors.map(error => {
            return <li>{error}</li>
        })
        let sessionFormHeader;
        let optionalInputField;
        let sessionFormFooter;
        let buttonText;
        let password2Input;
        if (formType === 'Login'){
            sessionFormHeader = (
            //   <div className="login-form-container">
                <header className="form-header">
                  <h1 className="form-heading">Welcome back.</h1>
                  <p className="form-bio">Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.</p>
                </header>
            //   </div>
            );

            optionalInputField = '';

            password2Input = '';

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p>No account?</p>
                    <div> &nbsp; </div>
                    {this.props.otherForm}
                </footer>
            );
            buttonText = "Log In";

        } else {
            sessionFormHeader = (
                <heading className="signup-form-header">
                  <h1 className="form-heading">Join Medium.</h1>
                  <p className="form-bio">Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
                </heading>
                // <header className="signup-form-header">
                //   <h1 className="form-header">Join Medium.</h1>
                //   <p className="form-description">Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
                // </header>
            );

            optionalInputField = (
                    <div className="login">
                    {/* <label className="login-label" htmlFor="name">Name</label> */}
                    <input 
                        className="login-input" 
                        type="text" 
                        value={this.state.name} 
                        id="name" 
                        onChange={this.update('name')} 
                        placeholder="Fullname"
                        required/>
                    </div>
            );

            password2Input = (
                <div className="login">
                    {/* <label className="login-label" htmlFor="password2">Confirm password</label> */}
                    <input 
                        className="login-input" 
                        type="password" 
                        value={this.state.password2} 
                        id="password2" 
                        onChange={this.update('password2')} 
                        placeholder="Confirm Password"
                        required />
                </div>
            )

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p className="footer-bio">Already have an account? </p>
                    <div> &nbsp; </div>
                    {this.props.otherForm}
                </footer>
            );
            buttonText = "Sign Up";
        }
        return (
            <form className="session-form" onSubmit={this.handleSubmit}>
                <a className='modal-close-button' onClick={this.handleClose}>{String.fromCharCode(10005)}</a>
                {sessionFormHeader}

                <div className="session-form-inputs">
                    {errorsLi}
                    <div className="login">
                        {/* <label className="login-label" htmlFor="email">Email</label> */}
                        <input 
                            className="login-input" 
                            type="email" 
                            value={this.state.email} 
                            id="email" 
                            onChange={this.update('email')} 
                            placeholder="Email"
                            required />
                    </div>

                    {optionalInputField}


                    <div className="login">
                        {/* <label className="login-label" htmlFor="password">Password</label> */}
                        <input 
                            className="login-input" 
                            type="password" 
                            value={this.state.password} 
                            id="password" 
                            onChange={this.update('password')} 
                            placeholder="Password"
                            required/>
                    </div>

                    {password2Input}
                    
                    {/* <button className="session-submit" onClick={this.handleSubmit} >{buttonText}</button> */}
                    <button className="session-submit">{buttonText}</button>
                    
                </div>

                {sessionFormFooter}
            </form>
        )
    }
}

export default withRouter(SessionForm);