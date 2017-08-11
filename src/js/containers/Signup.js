import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../actions/session';
import { selectSessionUser } from '../selectors/session';
import ValidInput from '../components/form/ValidInput';
import validateInvite from '../validators/invite';

// TODO - add validation logic
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      showValidation: true,
      validation: {
        username: "",
        name: "",
        email: "",
        password: "",
      },
    };

    [
      'handleChange',
      'handleSignupSubmit',
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    if (this.props.user != null) {
      browserHistory.push('/browse');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null) {
      browserHistory.push('/browse');
    }
  }

  handleSignupSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password);
  }

  handleChange(name, value) {
    const inv = Object.assign({}, this.state, { [name]: value });
    inv.validation = validateInvite(inv);

    this.setState(inv);
  }

  render() {
    const { inviteId } = this.props;
    const { username, name, email, password, validation, showValidation } = this.state;

    /*
    <div id="login">
      <div className="container">
        <form onSubmit={this.handleSignupSubmit} className="form col-md-4 offset-md-4">
          <h3>Signup:</h3>
          <ValidInput type="text" label="Username" name="username" value={username} error={validation.username} showError={false} onChange={this.handleChange} />
          <ValidInput type="password" label="Password" name="password" value={password} error={validation.username} showError={false} onChange={this.handleChange} />
          <input className="login btn btn-standard" type="submit" value="login" />
          <a href="/login/forgot">I forgot my password</a>
        </form>
      </div>
    </div>
    */

    return (
      <div id="signup">
        <div className="container">
          <form className="yellow form col-md-4 offset-md-4" method="POST" action={`/invites/${inviteId}/accept`}>
            <hr className="yellow" />
            <h3>Welcome!</h3>
            <p>Accept Your Invite:</p>
            <ValidInput name="username" type="text" label="Username" value={username} error={validation.username} showError={showValidation} onChange={this.handleChange} />
            <ValidInput name="name" type="text" label="Name (optional)" value={name} error={validation.name} showError={showValidation} onChange={this.handleChange} />
            <ValidInput name="email" type="text" label="Email" value={email} error={validation.email} showError={showValidation} onChange={this.handleChange} />
            <ValidInput name="password" type="password" label="Password" value={password} error={validation.password} showError={false} onChange={this.handleChange} />
            <input className="signup btn btn-primary" type="submit" name="submit" value="Signup" disabled={!validation.isValid} />
            <hr className="yellow" />
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
};

Signup.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  return ({
    inviteId: ownProps.params.id,
    user: selectSessionUser(state),
  });
}

export default connect(mapStateToProps, {
  loginUser,
})(Signup);
