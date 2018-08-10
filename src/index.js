import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'My Component';
  }

  render() {
    return (
      <h1>Hello {this.name}</h1>
    );
  }
}

export default MyComponent;
