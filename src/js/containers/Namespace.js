import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router';

import { loadDatasets } from '../actions/dataset'
import { selectionTypes, select, deselect } from '../actions/selection'
import { showSidebar, hideSidebar } from '../actions/layout'

import { treeNodes, treeConnections, selectDatasetTree, selectDatasetByAddress } from '../selectors/dataset'

// import ForceGraph from '../components/ForceGraph';
import InteractiveForceGraph from '../components/InteractiveForceGraph'
import ForceGraphNode from '../components/ForceGraphNode'
import ForceGraphLink from '../components/ForceGraphLink'
import DatasetSummary from '../components/DatasetSummary'

class Namespace extends Component {
  constructor (props) {
    super(props);

    [
      'handleSelectNode',
      'handleDeselect',
      'renderDatasetInfo'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadDatasets()
  }

  handleSelectNode (e, node) {
    // browserHistory.push("/" + node.address.replace(/\./gi, "/"));
    e.stopPropagation()
    this.props.showSidebar()
    this.props.select(selectionTypes.DATASET, node.address)
  }

  handleDeselect (e) {
    e.preventDefault()
    this.props.deselect()
    this.props.hideSidebar()
  }

  renderDatasetInfo () {
    const { dataset, layout } = this.props
    const sidebar = layout.sidebar

    if (!dataset) {
      return undefined
    }

    return (
      <div style={Object.assign({ position: 'absolute' }, sidebar)}>
        <DatasetSummary dataset={dataset} />
      </div>
    )
  }

  render () {
    const { nodes, connections, layout, dataset } = this.props

    function nodeForAddress (adr) {
      return nodes.find(n => n.address === adr)
    }

    return (
      <div className='namespace' onClick={this.handleDeselect}>
        <div
          className='main'
          style={{
            position: 'absolute',
            width: layout.main.w,
            height: layout.main.h,
            top: layout.main.t,
            left: layout.main.l
          }}
        >
          {/* <hr className="green" /> */}
          <InteractiveForceGraph
            labelOffset={{
              x: () => 17,
              y: () => 6
            }}
            onSelectNode={this.handleSelectNode}
            selectedNode={dataset ? nodeForAddress(dataset.address) : undefined}
            simulationOptions={{ height: layout.main.height, width: layout.main.width, animate: true, strength: { charge: -1000 } }}
          >
            {nodes.map((node, i) => {
              return (<ForceGraphNode key={`node-${i}`} node={node} fill='#C3E88D' labelClass='label' labelStyle={{ fontSize: 14, fill: '#C3E88D' }} />)
            })}
            {connections.map((c, i) => {
              return (<ForceGraphLink key={`link-${i}`} link={c} />)
            })}
          </InteractiveForceGraph>
        </div>
        {this.renderDatasetInfo()}
      </div>
    )
  }
}

Namespace.propTypes = {
  nodes: PropTypes.array
  // connections:
  // layout:
  // dataset:
}

Namespace.defaultProps = {
}

function mapStateToProps (state) {
  const tree = selectDatasetTree(state)

  let dataset
  if (state.selection.type === selectionTypes.DATASET) {
    dataset = selectDatasetByAddress(state, state.selection.value)
  }

  return {
    nodes: treeNodes(tree),
    dataset,
    connections: treeConnections(tree),
    layout: state.layout
  }
}

export default connect(mapStateToProps, {
  loadDatasets,
  select,
  deselect,
  showSidebar,
  hideSidebar
})(Namespace)
