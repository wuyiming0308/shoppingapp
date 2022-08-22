import React from "react";

class BuggyCounter extends React.Component {
  state = {
    click: false,
  };

  handleClick = () => {
    this.setState({
      click: true,
    });
  };

  render() {
    if (this.state.click === true) {
      // Simulate an error!
      throw new Error("Oops! Something went wrong!");
    }
    return (
      <div>
        <h1
          onClick={this.handleClick}
          style={{ cursor: "pointer" }}
          className="HomePageTitle"
        >
          Products
        </h1>
      </div>
    );
  }
}

export default BuggyCounter;
