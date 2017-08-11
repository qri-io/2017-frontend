/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import ProgressBar from '../chrome/ProgressBar';

export default class DropFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'Pick',
      progress: 0,
      error: '',
      message: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.uploader = new S3Upload(this.fileInput, {
    //   username: 'didyouaddyour',
    //   password: 'metadata',
    //   s3_sign_put_url: S3_SIGNING_SERVER_PUT_URL,
    //   dir: this.props.dir,
    //   onProgress: this.handleProgress.bind(this),
    //   onFinishS3Put: this.handleSuccess.bind(this),
    //   onError: this.handleError.bind(this),
    // });
    this.setState({ stage: 'Upload' });
  }

  handleProgress(percent) {
    this.setState({ progress: percent });
  }

  handleError(error) {
    this.setState({ stage: 'Error', error });
  }

  handleSuccess(url) {
    this.props.onSuccess(url);
    this.setState({ stage: 'Success', message: 'Upload Complete!' });
  }

  handleReset() {
    this.setState({
      stage: 'Pick',
      file: undefined,
      progress: 0,
      error: '',
      message: '',
    });
  }

  renderPick() {
    const { disabled } = this.props;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          name="file"
          type="file"
          disabled={disabled}
          className="form-control"
          ref={(input) => { this.fileInput = input; }}
        />
        <br />
        <button className="btn btn-primary" disabled={disabled}> Upload</button>
      </form>
    );
  }

  renderUpload() {
    return <ProgressBar progress={this.state.progress} />;
  }

  renderSuccess() {
    return (
      <div>
        <h5>File Successfully Uploaded!</h5>
        <button className="btn btn-primary" onClick={this.handleReset.bind(this)}>Choose Another</button>
      </div>
    );
  }

  renderError() {
    return (
      <div>
        <h5 className="error">Error Uploading file:</h5>
        <p>{this.state.error}</p>
        <button className="btn btn-primary" onClick={this.handleReset.bind(this)}>Choose Another</button>
      </div>
    );
  }

  render() {
    return (
      <div className="uploader">
        {this[`render${this.state.stage}`]()}
      </div>
    );
  }
}

DropFile.propTypes = {
  // dir: PropTypes.string,
  // onUpload: PropTypes.func,
  // onError: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
};

DropFile.defaultProps = {
  dir: '',
};
