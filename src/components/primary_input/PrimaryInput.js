import React from "react";
import "./PrimaryInput.css";

export default class PrimaryInput extends React.Component {
  render() {
    const classes = this.props.classes || "";
    const hideBorderCSS =
      this.props.hideBorder === undefined
        ? "input-hide-underline"
        : this.props.hideBorder
        ? "input-hide-underline"
        : "";

    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        className={`${classes} white-text input-text-primary ${hideBorderCSS}`}
        value={this.props.value}
        onChange={e => this.props.onChange(e.target.value)}
      />
    );
  }
}
