import React from "react";
import FacebookIcon from "./../images/facebook.png";
import InstagramIcon from "./../images/instagram.png";
import TwitterIcon from "./../images/twitter.png";
import LinkedInIcon from "./../images/linkedin.png";

export default class QuizComplete extends React.Component {
  copyLinkToClipboard = async () => {
    const { state } = await navigator.permissions.query({
      name: "clipboard-write"
    });
    if (state === "granted" || state === "prompt") {
      await navigator.clipboard.writeText("http://www.google.com");
    }
  };

  render() {
    return (
      <div className="green white-text">
        <div
          className="center"
          style={{
            fontSize: "24px",
            padding: "40px"
          }}
        >
          Quiz Created!
        </div>
        <h5 className="center">{"{Quiz Name here}"}</h5>
        <div
          className="center"
          style={{
            marginTop: "32px"
          }}
        >
          <p
            style={{
              fontSize: "20px"
            }}
          >
            Challange people to take your Quiz!
          </p>
          <div
            className="social-icon-container"
            style={{
              marginTop: "32px"
            }}
          >
            <img src={FacebookIcon} className="social-icon" alt="facebook" />
            <img src={InstagramIcon} className="social-icon" alt="instagram" />
            <img src={TwitterIcon} className="social-icon" alt="twitter" />
            <img src={LinkedInIcon} className="social-icon" alt="linkedin" />
          </div>
          <div
            style={{
              marginTop: "40px",
              fontSize: "18px"
            }}
            onClick={this.copyLinkToClipboard}
          >
            http://quizytime.com/takequiz/12njk3784
            <div
              style={{
                marginTop: "4px",
                fontSize: "14px"
              }}
            >
              (Tap the link to copy)
            </div>
          </div>
        </div>
      </div>
    );
  }
}
