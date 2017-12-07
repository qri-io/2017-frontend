import React from 'react'
import Handsontable from 'handsontable'

class SettingsMapper {
  constructor () {
    this.registeredHooks = Handsontable.hooks.getRegistered()
  }

  /**
   * Parse component settings into Handosntable-compatible settings.
   *
   * @param {Object} properties Object containing properties from the HotTable object.
   * @returns {Object} Handsontable-compatible settings object.
   */
  getSettings (properties) {
    let newSettings = {}

    if (properties.settings) {
      let settings = properties.settings
      for (const key in settings) {
        if (settings.hasOwnProperty(key)) {
          newSettings[this.trimHookPrefix(key)] = settings[key]
        }
      }
    }

    for (const key in properties) {
      if (key !== 'settings' && properties.hasOwnProperty(key)) {
        newSettings[this.trimHookPrefix(key)] = properties[key]
      }
    }

    return newSettings
  }

  /**
   * Trim the "on" hook prefix.
   *
   * @param {String} prop Settings property.
   * @returns {String} Handsontable-compatible, prefix-less property name.
   */
  trimHookPrefix (prop) {
    if (prop.indexOf('on') === 0) {
      let hookName = prop.charAt(2).toLowerCase() + prop.slice(3, prop.length)
      if (this.registeredHooks.indexOf(hookName) > -1) {
        return hookName
      }
    }

    // returns the string anyway, when we're sure all the hooks are registered, might be changed
    return prop
  }
}

/**
 * A Handsontable-ReactJS wrapper.
 *
 * To implement, use the `HotTable` tag with properties corresponding to Handsontable options.
 * For example:
 *
 * ```js
 * <HotTable root="hot" data={dataObject} contextMenu={true} colHeaders={true} width={600} height={300} stretchH="all" />
 *
 * // is analogous to
 * let hot = new Handsontable(document.getElementById('hot'), {
 *    data: dataObject,
 *    contextMenu: true,
 *    colHeaders: true,
 *    width: 600
 *    height: 300
 * });
 *
 * ```
 *
 * @class HotTable
 */
export default class HotTable extends React.Component {
  constructor () {
    super()

    this.hotInstance = null
    this.settingsMapper = new SettingsMapper()
    this.root = null
  }

  /**
   * Initialize Handsontable after the component has mounted.
   */
  componentDidMount () {
    const newSettings = this.settingsMapper.getSettings(this.props)
    this.hotInstance = new Handsontable(document.getElementById(this.root), newSettings)
  }

  /**
   * Call the `updateHot` method and prevent the component from re-rendering the instance.
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   * @returns {Boolean}
   */
  shouldComponentUpdate (nextProps, nextState) {
    this.updateHot(this.settingsMapper.getSettings(nextProps))

    return false
  }

  /**
   * Destroy the Handsontable instance when the parent component unmounts.
   */
  componentWillUnmount () {
    this.hotInstance.destroy()
  }

  /**
   * Render the table.
   *
   * @returns {XML}
   */
  render () {
    this.root = this.props.root || 'hot' + new Date().getTime()
    return <div ref={this.props.containerRef} id={this.root} />
  }

  /**
   * Call the `updateSettings` method for the Handsontable instance.
   * @param newSettings
   */
  updateHot (newSettings) {
    this.hotInstance.updateSettings(newSettings)
  }
}
