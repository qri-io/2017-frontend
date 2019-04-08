import React from 'react'
import PropTypes from 'prop-types'
import ValidInput from './ValidInput'

import UrlInput from './UrlInput'
import TagInput from './TagInput'
import LanguageInput from './LanguageInput'
import ValidTextarea from './ValidTextarea'

import ValidLicenseInput from './ValidLicenseInput'
import ValidCitationsInput from './ValidCitationsInput'
import ValidContributorsInput from './ValidContributorsInput'
import ValidPeriodicityInput from './ValidPeriodicityInput'

// import { MetaProps } from '../../propTypes/datasetRefProps'

// Fields taken from http://github.com/qri-io/dataset/meta.go

export default class MetadataForm extends React.PureComponent {
  render () {
    const { meta, validation, onChange, showHelpText } = this.props

    return (
      <div className='metadata form' style={{ marginTop: 20 }}>
        <div className='form-wrap'>
          <ValidInput
            name='title'
            label='Title'
            helpText='Human-readable name of the asset. Should be in plain English and include sufficient detail to facilitate search and discovery.'
            showHelpText={showHelpText}
            value={meta.title}
            error={validation.title}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <ValidTextarea
            name='description'
            label='Description'
            helpText='Human-readable description (e.g., an abstract) with sufficient detail to enable a user to quickly understand whether the asset is of interest.'
            showHelpText={showHelpText}
            value={meta.description}
            error={validation.description}
            onChange={onChange}
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <TagInput
            name='keywords'
            label='Tags'
            helpText='Tags (or keywords) help users discover this dataset; please include terms that would be used by technical and non-technical users. Please use commas to seperate'
            showHelpText={showHelpText}
            value={meta.keywords}
            onChange={onChange}
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <UrlInput
            name='downloadPath'
            label='Download Page'
            helpText='Url that should lead directly to the data itself.'
            showHelpText={showHelpText}
            value={meta.downloadPath}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <ValidCitationsInput
            helpText='The list of assets used to build this dataset.'
            showHelpText={showHelpText}
            value={meta.citations}
            onChange={onChange}
          />
        </div>
        <div className='form-wrap'>
          <ValidContributorsInput
            helpText='The list of people who have contributed to this dataset.'
            showHelpText={showHelpText}
            value={meta.contributors}
            onChange={onChange}
          />
        </div>
        <div className='form-wrap'>
          <ValidPeriodicityInput
            name='accrualPeriodicity'
            label='Periodicity'
            helpText='How often the dataset is expected to change. This is how often Qri will automatically look for updated data.'
            showHelpText={showHelpText}
            value={meta.accrualPeriodicity}
            error={validation.accrualPeriodicity}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <ValidInput
            name='identifier'
            label='Unique Identifier'
            helpText='A unique identifier for the dataset or API as maintained within an Agency catalog or database.'
            showHelpText={showHelpText}
            value={meta.identifier}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <ValidInput
            name='version'
            label='Version'
            helpText='The semantic version of this dataset'
            showHelpText={showHelpText}
            value={meta.version}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <LanguageInput
            name='language'
            label='Language'
            helpText='The language of the dataset'
            showHelpText={showHelpText}
            value={meta.language}
            onChange={onChange}
            className='col-md-12'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <TagInput
            name='theme'
            label='Category'
            helpText='Main thematic categories of the dataset, use commas to seperate'
            showHelpText={showHelpText}
            value={meta.theme}
            onChange={onChange}
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <ValidLicenseInput
            name='license'
            label='License'
            className='col-md-12'
            helpText='The license or non-license (i.e. Public Domain) status with which the dataset or API has been published.'
            showHelpText={showHelpText}
            value={meta.license}
            onChange={onChange}
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <UrlInput
            name='accessPath'
            label='Landing Page'
            helpText='This field is not intended for an agency’s homepage (e.g. www.agency.gov), but rather if a dataset has a human-friendly hub or landing page that users can be directed to for all resources tied to the dataset.'
            showHelpText={showHelpText}
            value={meta.accessPath}
            onChange={onChange}
            className='col-md-12'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <UrlInput
            name='readmePath'
            label='Readme Page'
            helpText='Path to the readme file associated with this dataset.'
            showHelpText={showHelpText}
            value={meta.readmePath}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
        <div className='form-wrap'>
          <UrlInput
            name='homePath'
            label='Home Page'
            helpText='HomePath is a path to a "home" resource, either a url or d.web path.'
            showHelpText={showHelpText}
            value={meta.homePath}
            onChange={onChange}
            className='col-md-6'
            labelTop
          />
        </div>
      </div>
    )
  }
}

MetadataForm.propTypes = {
  // meta: MetaProps,
  showHelpText: PropTypes.bool,

  onChange: PropTypes.func.isRequired
  // onCancel: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired
}

MetadataForm.defaultProps = {
  validation: {
    title: '',
    description: ''
  },
  showHelpText: false
}
