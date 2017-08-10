import React, { PropTypes } from 'react';

import KeyValueInput from './KeyValueInput';

export default class KeyValueForm extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleAddField",
      "handleRenameField",
      "handleRemoveField",
      "handleSubmit",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  handleAddField() {
    const change = { meta: Object.assign({}, this.props.data.meta, { new_field: "" }) };
    // this.props.updateMetadata({ meta: Object.assign({}, this.props.data, change) });
  }

  handleRenameField(prevName, newName) {
    const change = { meta: Object.assign({}, this.props.data.meta, { [newName]: this.props.data.meta[prevName] }) };
    delete change.meta[prevName];
    // this.props.updateMetadata(Object.assign({}, this.props.data, change));
  }

  handleRemoveField(field) {
    const change = { meta: Object.assign({}, this.props.data.meta) };
    delete change.meta[field];
    // this.props.updateMetadata(Object.assign({}, this.props.data, change));
  }

  handleSubmit(e) {
    e.preventDefault();
    onSubmit(data, e);
  }

  render() {
    const { data, onChangeValue, onCancel, onSubmit, onChangeKey, onAddField, onRemove } = this.props;
    

    return (
      <div className="data">
        <div className="col-md-12">
          {Object.keys(data).map((key, i) => {
            return (
              <KeyValueInput
                key={i}
                name={key}
                value={data[key]}
                onChangeKey={this.onChangeKey}
                onRemove={this.onRemove}
                onChangeValue={this.onChangeValue}
              />);
          })}
          <button className="btn" onClick={this.onAddField}>Add Field</button>
        </div>
      </div>
    );
  }
}

KeyValueForm.propTypes = {
  data: PropTypes.object.isRequired,
  validation: PropTypes.object,

  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
