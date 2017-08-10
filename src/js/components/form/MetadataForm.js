import React, { PropTypes } from 'react';

import ValidInput from './form/ValidInput'
;
import UrlInput from './UrlInput';
import TagInput from './TagInput';
import LanguageInput from './LanguageInput';
import ValidTextarea from './form/ValidTextarea'
;
import ValidSelect from './ValidSelect';
import ValidLicenseInput from './ValidLicenseInput';
import ValidDateTimeInput from './ValidDateTimeInput';


// Required fields to pass POD spec:
// √ title
// √ description
// √ keyword
// modified - need time & TZ fields
// publisher
// contactPoint
// identifier
// √ accessLevel
// bureauCode
// programCode
// √ license

const MetadataForm = ({ data, validation, onChange, onCancel, onSubmit, showHelpText }) => {
  const meta = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data, e);
  };

  return (
    <div className="metadata form">
      <ValidInput
        name="title"
        label="Title"
        helpText="Human-readable name of the asset. Should be in plain English and include sufficient detail to facilitate search and discovery."
        showHelpText={showHelpText}
        value={meta.title}
        error={validation.title}
        onChange={onChange}
      />
      <ValidTextarea
        name="description"
        label="Description"
        helpText="Human-readable description (e.g., an abstract) with sufficient detail to enable a user to quickly understand whether the asset is of interest."
        showHelpText={showHelpText}
        value={meta.description}
        error={validation.description}
        onChange={onChange}
      />
      <ValidInput
        name="theme"
        label="Category"
        helpText="Main thematic category of the dataset"
        showHelpText={showHelpText}
        value={meta.theme}
        onChange={onChange}
      />
      <TagInput
        name="keyword"
        label="Tags"
        helpText="Tags (or keywords) help users discover this dataset; please include terms that would be used by technical and non-technical users"
        showHelpText={showHelpText}
        value={meta.keyword}
        onChange={onChange}
      />
      <div className="row">
        <ValidDateTimeInput
          name="modified"
          label="Last Update"
          className="col-md-6"
          helpText="Most recent date on which the dataset was changed, updated or modified."
          showHelpText={showHelpText}
          value={meta.modified}
          onChange={onChange}
        />
        <ValidDateTimeInput
          name="issued"
          label="Release Date"
          className="col-md-6"
          helpText="Most recent date on which the dataset was changed, updated or modified."
          showHelpText={showHelpText}
          value={meta.issued}
          onChange={onChange}
        />
      </div>
      <ValidInput
        name="identifier"
        label="Unique Identifier"
        helpText="A unique identifier for the dataset or API as maintained within an Agency catalog or database."
        showHelpText={showHelpText}
        value={meta.identifier}
        onChange={onChange}
      />
      <div className="row">
        <ValidSelect
          name="accessLevel"
          label="Public Access Level"
          className="col-md-6"
          helpText="The degree to which this dataset could be made publicly-available."
          showHelpText={showHelpText}
          value={meta.accessLevel}
          options={['public', 'restricted-public']}
          onChange={onChange}
        />
        <ValidLicenseInput 
          name="license"
          label="License"
          className="col-md-6"
          helpText="The license or non-license (i.e. Public Domain) status with which the dataset or API has been published."
          showHelpText={showHelpText}
          value={meta.license}
          onChange={onChange}
        />
      </div>
      <LanguageInput
        name="language"
        label="Language"
        helpText="The language of the dataset"
        showHelpText={showHelpText}
        value={meta.language}
        onChange={onChange}
      />
      <UrlInput
        name="landingPage"
        label="Landing Page"
        helpText="This field is not intended for an agency’s homepage (e.g. www.agency.gov), but rather if a dataset has a human-friendly hub or landing page that users can be directed to for all resources tied to the dataset."
        showHelpText={showHelpText}
        value={meta.landingPage}
        onChange={onChange}
      />
      <br />
      <button className="btn" onClick={onCancel}>Cancel</button>
      <input className="btn btn-primary" type="submit" value="Save" onClick={handleSubmit} />
    </div>
  );
};

MetadataForm.propTypes = {
  data: PropTypes.object.isRequired,
  validation: PropTypes.object,
  showHelpText: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MetadataForm.defaultProps = {
  validation: {},
  showHelpText: false,
};

export default MetadataForm;
