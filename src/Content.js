import React, { Component, Fragment } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import { grey50, grey800 } from "material-ui/styles/colors";
import categories from "./categories";
import RatingControl from "./RatingControl";

const tabStyle = {
  backgroundColor: grey50,
  color: grey800,
};

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: {},
    };

    this.updateRatingValue = this.updateRatingValue.bind(this);
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
              keys[item.id] = 5;
            }
            return keys;
          }, {});
          return ratings;
        }, {}),
      };
    }

    return null;
  }

  updateRatingValue(croissantId, itemId, value) {
    const ratings = Object.assign({}, this.state.ratings);
    ratings[croissantId][itemId] = value;

    this.setState({
      ratings: ratings,
    });
  }

  render() {
    return (
      <Tabs>
        {this.props.croissants.map((c, index) => (
          <Tab style={tabStyle} label={c.label} key={c.id}>
            <div style={{ padding: 12 }}>
              <Paper zDepth={1} style={{ padding: 12 }}>
                {c.image && <img src={c.image} alt={c.label} />}
                <h1>{c.label}</h1>
                <h2>{c.price.toFixed(2)} kr. </h2>
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
            </div>
          </Tab>
        ))}
      </Tabs>
    );
  }
}
