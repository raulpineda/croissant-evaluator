import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Content from "./Content";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      croissants: [],
    };
  }

  componentDidMount() {
    // TODO: Initialize Firebase
    const croissants = [
      { id: 1, label: "🥐1", price: 1.0, pictureUrl: null },
      { id: 2, label: "🥐2", price: 2.0, pictureUrl: null },
      { id: 3, label: "🥐3", price: 3.0, pictureUrl: null },
      { id: 4, label: "🥐4", price: 4.0, pictureUrl: null },
      { id: 5, label: "🥐5", price: 5.0, pictureUrl: null },
      { id: 6, label: "🥐6", price: 6.0, pictureUrl: null },
      { id: 7, label: "🥐7", price: 7.0, pictureUrl: null },
      { id: 8, label: "🥐8", price: 8.0, pictureUrl: null },
    ];
    this.setState({
      croissants: croissants,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Fragment>
          <AppBar title="🥐 Croissant Evaluation" />
          <Content croissants={this.state.croissants} />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
