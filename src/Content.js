import React, { Component, Fragment } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import { grey50, grey800 } from "material-ui/styles/colors";
import categories from "./categories";
import RatingControl from "./RatingControl";
import RaisedButton from "material-ui/RaisedButton";
import { GridList, GridTile } from "material-ui/GridList";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";

const tabStyle = {
  backgroundColor: grey50,
  color: grey800,
};

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = { ratings: {}, selectedTab: 0, submittedRatings: [] };

    this.updateRatingValue = this.updateRatingValue.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      Object.keys(prevState.ratings).length === 0 &&
      nextProps.croissants.length > 0
    ) {
      return {
        ratings: nextProps.croissants.reduce((ratings, croissant) => {
          ratings[croissant.id] = categories.reduce((keys, cat) => {
            for (const item of cat.items) {
              keys[item.id] = item.id === "vfm" ? 12 : 5;
            }
            return keys;
          }, {});
          ratings[croissant.id].id = croissant.id;
          return ratings;
        }, {}),
      };
    }

    return null;
  }

  updateRatingValue(croissantId, itemId, value) {
    const ratings = Object.assign({}, this.state.ratings);
    ratings[croissantId][itemId] = value;

    this.setState({ ratings: ratings });
  }

  handleNext() {
    this.setState({ isLoading: true });
    const { db } = this.props;

    const croissantId = this.props.croissants[this.state.selectedTab].id;
    const rating = this.state.ratings[croissantId];

    db
      .collection("ratings")
      .add(rating)
      .then(() => {
        // window.scrollTo(0, 0);
        this.setState(prevState => ({
          isLoading: false,
          selectedTab: prevState.selectedTab + 1,
          submittedRatings: prevState.submittedRatings.concat([croissantId]),
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          error: true,
        });
      });
  }

  handleTabChange(value) {
    this.setState({ selectedTab: value });
  }

  render() {
    const { isLoading, error } = this.state;

    if (isLoading) {
      return (
        <CircularProgress
          size={80}
          thickness={5}
          style={{ margin: "50% auto", display: "block" }}
        />
      );
    }

    return (
      <div className="container">
        <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
          {this.props.croissants.map((c, index) => (
            <Tab style={tabStyle} label={c.label} key={c.id} value={index}>
              <div style={{ padding: 12 }}>
                <Paper zDepth={1} style={{ padding: 12 }}>
                  <h1>{c.label}</h1>
                  {c.pictureUrl && (
                    <GridList cellHeight={180}>
                      <GridTile>
                        <img src={c.pictureUrl} alt={c.label} />
                      </GridTile>
                    </GridList>
                  )}
                  {categories.map(category => {
                    return (
                      <Fragment key={category.id}>
                        <Subheader>{category.label}</Subheader>
                        <div>
                          {category.items.map(i => (
                            <RatingControl
                              key={i.id}
                              item={i}
                              croissantId={c.id}
                              value={this.state.ratings[c.id][i.id]}
                              updateRatingValue={this.updateRatingValue}
                            />
                          ))}
                        </div>
                        <Divider />
                      </Fragment>
                    );
                  })}
                </Paper>
                <RaisedButton
                  label={
                    index === this.props.croissants.length - 1
                      ? "Submit last rating"
                      : "Submit and go to next"
                  }
                  disabled={this.state.submittedRatings.includes(c.id)}
                  primary
                  style={{
                    position: "absolute",
                    right: 0,
                    margin: "24px 12px",
                  }}
                  onClick={this.handleNext}
                />
              </div>
            </Tab>
          ))}
        </Tabs>
        <Snackbar
          open={Boolean(error)}
          message={"Oops, something broke :/"}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default Content;
