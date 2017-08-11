import React, { PropTypes } from 'react';

function panelTrigger(i, fn) {
  return () => {
    fn(i);
  };
}

function headerClassName(i, index) {
  return (i == index) ? "current tab" : "tab";
}

const TabPanel = ({ index, labels = [], components, onSelectPanel }) => {
  const component = components[index];
  return (
    <div className="tabPanel">
      <header>
        {labels.map((label, i) => <a className={headerClassName(i, index)} key={i} onClick={panelTrigger(i, onSelectPanel)}>{label}</a>)}
      </header>
      <section>
        {component}
      </section>
    </div>
  );
};

TabPanel.propTypes = {
  labels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onSelectPanel: PropTypes.func.isRequired,
};

export default TabPanel;
