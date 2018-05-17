import React, { Fragment, Component } from "react";
import Slider from "material-ui/Slider";
import IconButton from "material-ui/IconButton";
import HelpIcon from "material-ui/svg-icons/action/help-outline";

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
    const step = item.id === "vfm" ? 0.5 : 1;
    const min = item.id === "vfm" ? 10 : 0;
    const max = item.id === "vfm" ? 30 : 10;
    return (
      <Fragment key={item.label}>
        {item.helpText && (
          <IconButton tooltip={item.helpText} touch tooltipPosition="top-right">
            <HelpIcon />
          </IconButton>
        )}
        {item.label} ({value})
        <Slider
          step={step}
          value={value}
          min={min}
          max={max}
          onChange={this.handleOnChange}
        />
      </Fragment>
    );
  }
}

export default RatingControl;
