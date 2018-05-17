import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Content from "./Content";
import firebase from "./firebase";
import "./App.css";

// Create anonymous Firebase user
firebase.auth().signInAnonymously();
window.fb = firebase;

// Initialize Firestore
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

class App extends Component {
  constructor() {
    super();
    this.state = {
      croissants: [],
    };
  }

  componentDidMount() {
    db
      .collection("croissants")
      .orderBy("index")
      .get()
      .then(snapshot => {
        const croissants = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            label: data.label,
            pictureUrl: data.pictureUrl,
          };
        });
        this.setState({
          croissants: croissants,
        });
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Fragment>
          <AppBar title="👍 Rate My Croissant 👎" />
          <Content croissants={this.state.croissants} db={db} />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
