import React, { Fragment, Component } from "react";
import Slider from "material-ui/Slider";

class RatingControl extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e, newValue) {
    const { updateRatingValue, croissantId, item } = this.props;

    updateRatingValue(croissantId, item.id, newValue);
  }

  render() {
    const { item, value } = this.props;
    return (
      <Fragment key={item.label}>
        {item.label} ({value})
        <span>
          <Slider
            step={1}
            value={value}
            min={0}
            max={10}
            onChange={this.handleOnChange}
          />
        </span>
      </Fragment>
    );
  }
}

export default RatingControl;
