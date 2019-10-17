import React from "react";
import PrimaryInput from "./primary_input/PrimaryInput";

export default class OptionsBuilder extends React.Component {
  render() {
    const optionsLength = Object.keys(this.props.options).length;
    const options = Object.keys(this.props.options).map((key, index) => {
      const option = this.props.options[key];
      return (
        <OptionItem
          key={key}
          placeholder={`Option ${index + 1}`}
          onChange={text => this.props.onOptionChange(key, text)}
          value={option.text}
          onRemoveClick={() => this.props.onOptionDelete(key)}
          canRemove={optionsLength !== 1}
        />
      );
    });

    return (
      <div>
        {options}
        <button
          className="btn"
          onClick={this.props.onOptionAdd}
          style={{ marginTop: "20px" }}
          disabled={optionsLength >= 4}
        >
          Add Option
        </button>
      </div>
    );
  }
}

class OptionItem extends React.Component {
  render() {
    const { canRemove } = this.props;
    const onRemoveClick = canRemove
      ? () => this.props.onRemoveClick()
      : undefined;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <PrimaryInput
          hideBorder={false}
          placeholder={this.props.placeholder}
          classes="white-text"
          onChange={this.props.onChange}
          value={this.props.value}
        />
        <i
          className="material-icons"
          style={{
            marginLeft: "20px",
            opacity: `${canRemove ? 1.0 : 0.5}`
          }}
          onClick={onRemoveClick}
        >
          remove_circle
        </i>
      </div>
    );
  }
}
