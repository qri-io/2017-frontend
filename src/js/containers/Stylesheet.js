import React from 'react';

import List from '../components/List';
import DatasetItem from '../components/item/DatasetItem';
import UserItem from '../components/item/UserItem';
// import RoleItem from '../components/item/RoleItem';

import ValidInput from '../components/form/ValidInput';
import FieldsList from '../components/FieldsList';

const Stylesheet = () => {
  return (
    <div id="stylesheet">
      <div className="container">
        <div className="row">
          <header className="blue col-md-12">
            <hr className="blue" />
            <h1>Le Styles</h1>
          </header>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Heading One</h1>
            <h2>Heading Two</h2>
            <h3>Heading Three</h3>
            <h4>Heading Four</h4>
            <h5>Heading Five</h5>
            <h6>Heading Six</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a dui at enim sodales gravida.
            Donec imperdiet sagittis libero, a egestas nisl rhoncus nec. Proin massa elit, commodo a rutrum eget, condimentum ac lectus.
            Phasellus eget pulvinar tellus. Aliquam nec mi malesuada, feugiat augue molestie, viverra mi. Fusce non arcu venenatis, aliquam arcu eget, blandit risus. Ut id dui a turpis tristique luctus. Etiam dui risus, tincidunt eget elit id, lacinia molestie velit. Phasellus eleifend nunc vel vestibulum dapibus. Phasellus auctor et lectus sit amet fermentum. In eget ex ut dolor egestas tempor. Nam semper libero a elementum bibendum.
            Phasellus cursus, felis eu aliquet maximus, neque lorem egestas est, eu varius nulla sapien vitae tellus.</p>
          </div>
          <div className="col-md-6">
            <ValidInput type="text" name="input" label="valid input" value="input" showValidation={false} validation="blah" />
            <ValidInput type="text" name="input" label="invalid input" value="input" showValidation error="blah" />
            <button className="btn btn-primary">Primary Button</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <hr className="red" />
            <h2>Palette</h2>
          </header>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="swatch bg-green" style={{ width: 100, height: 100 }}></div>
            <label>Green</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-blue" style={{ width:100, height: 100 }}></div>
            <label>Blue</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-purple" style={{width: 100, height: 100}}></div>
            <label>Purple</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-red" style={{ width: 100, height: 100 }}></div>
            <label>Red</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-yellow" style={{ width: 100, height: 100 }}></div>
            <label>Yellow</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-orange" style={{width:100, height:100}}></div>
            <label>Orange</label>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <hr className="yellow" />
            <h2 className="yellow">Users</h2>
          </header>
          <List data={this.props.users} component={UserItem} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <hr className="green" />
            <h2 className="green">Datasets</h2>
          </header>
          <List data={this.props.datasets} component={DatasetItem} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="blue col-md-12">
            <hr className="blue" />
            <h2>Fields</h2>
          </header>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FieldsList fields={this.props.fields} />
          </div>
        </div>
      </div>
    </div>
  );
}

Stylesheet.propTypes = {
};

Stylesheet.defaultProps = {
  fields: [
    { name: "field_one", type: "string" },
    { name: "field_two", type: "integer" },
    { name: "field_three", type: "float" },
    { name: "field_four", type: "object" },
    { name: "field_five", type: "array" },
    { name: "field_six", type: "date" },
  ],
  users : [
    {"id": "4254923e-a3a3-4d6f-ae1d-f6af177215db", "created": 1484086940, "updated": 1484086940, "username": "steve", "type": "none", "email": "steve@qri.io", "name": "Steven", "description": "", "home_url": "" },
    {"id": "9080d2c6-4e2a-4f5c-a49f-97dc1c6e1ecb", "created": 1484080475, "updated": 1484080475, "username": "test_one", "type": "none", "email": "brendanobrienesq@gmail.com", "name": "brendan", "description": "", "home_url": "" },
    {"id": "23c09b51-5048-4150-a85e-73d53f11d066", "created": 1475804702, "updated": 1475804702, "username": "us_fbi", "type": "organization", "email": "fbi@qri.io", "name": "", "description": "", "home_url": "" },
    {"id": "0873e951-41e7-4f34-840b-07109f093b90", "created": 1475611466, "updated": 1475682997, "username": "b6", "type": "none", "email": "b@qri.io", "name": "brendan", "description": "some bro from canada, eh.", "home_url": "" },
    {"id": "48e7bafe-cf79-4b78-9f8f-9af846abd6a3", "created": 1475508601, "updated": 1475508601, "username": "billboard", "type": "organization", "email":"billboard@qri.io", "name": "","description": "", "home_url": "" },
    {"id": "4c9b6bca-6764-462c-a560-d47a037c05bd", "created": 1474667377, "updated": 1474667377, "username": "forbes", "type": "organization", "email": "forbes@qri.io", "name": "","description": "The United States Census", "home_url": "" },
    {"id": "1b674f47-d0f4-4b3c-b25d-c49521b5599a", "created": 1464282748, "updated": 1464282748, "username": "ca_census", "type": "organization", "email": "ca_census@qri.io", "name": "Canadian Census","description": "Les Census Canadien", "home_url":"" },
    {"id": "57013bf0-2366-11e6-b67b-9e71128cae77", "created": 1464282748, "updated": 1464282748, "username": "us_census", "type": "organization", "email": "us_census@qri.io", "name": "United States Census","description": "The United States Census", "home_url": ""} ,
    {"id": "3fe7d2cc-a8dc-4da0-ac37-c3061d067ae7", "created": 1464282748, "updated": 1474918993, "username": "b5", "type": "user", "email": "brendan@qri.io", "name": "Brendan O'Brien","description": "", "home_url": "" },
    {"id": "e591aff2-f092-4fc3-813d-c4aad7ce58b5", "created": 1464282748, "updated": 1464282748, "username": "us_atf", "type": "organization", "email": "us_atf@qri.io", "name": "United States Census", "description": "The United States Bureau of Alcohol, Tobacco \u0026 Firearms", "home_url": "" },
    {"id": "54b80e91-cae0-423d-b5d8-c9acbb5e2536", "created": 1463687282, "updated": 1463687793, "username": "janelle", "type": "user", "email": "test_user_janelle@qri.io", "name": "Janelle (test user)","description":"","home_url":"" }
  ],
  datasets : [
    { "name": "brendan", "address": "qri.brendan" },
    { "address": "qri.brendan.hours", "file": "hours.csv", "format": "csv","fields": [{ "name": "datestamp", "type": "date" },{ "name": "hours", "type": "float" },{ "name": "category", "type": "string" },{ "name": "description", "type": "string" }]},
    { "name": "qri", "address": "qri", "file": "stats.csv", "fields":[{ "name": "name", "type": "string" },{ "name": "value", "type": "float" }], "description": "a service for coordinating datasets"}
  ],
};
