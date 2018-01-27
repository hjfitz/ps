import React from 'react';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  // todo: figure this out
  submit(ev) {
    ev.preventDefault();
    this.form.submit();
  }

  render() {
    return (
      <form
        id="uploadForm"
        action="/api/images/upload"
        method="post"
        encType="multipart/form-data"
        ref={form => this.form = form}
      >
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" name="image" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          <div className="row" />
        </div>
        <input type="submit" onClick={this.submit} value="Send Request" />
      </form>
    );
  }
}
