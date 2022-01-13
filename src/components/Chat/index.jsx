import React from "react";
// import ChatFeed from "react-chat-ui";/
import { ChatFeed, Message } from "react-chat-ui";
import "./styles.css";
import MqttHandler from "../../Mqtt/setup";
import { MQTT_TOPICS } from "../../utils/constants";
const styles = {
  button: {
    backgroundColor: "#fff",
    borderColor: "#1D2129",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 2.1,
    color: "#1D2129",
    fontSize: 18,
    fontWeight: "300",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    outline: "none",
  },
  selected: {
    color: "#fff",
    backgroundColor: "#0084FF",
    borderColor: "#0084FF",
  },
};

const mqttHandler = new MqttHandler();

class ChatUi extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        // new Message({ id: "Mark", message: "Hey guys!", senderName: "Mark" }),
        new Message({
          // id: 2,
          message: (
            <p>
              <span>11:50:</span>Hey! Sudip here. This is demo by sudip
              bhattarai.
            </p>
          ),
          senderName: "Sudip",
        }),
      ],
      useCustomBubble: false,
      curr_user: 0,
    };
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }

    mqttHandler.publish(MQTT_TOPICS.CHAT);
    this.props.sendMessage(input.value);
    this.pushMessage(this.state.curr_user, input.value);
    input.value = "";
    return true;
  }
  pushMessage(recipient, message) {
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      // senderName: users[recipient],
    });
    prevState.messages.push(newMessage);
    this.setState(this.state);
  }

  render() {
    // let message = localStorage.getItem("msg");
    return (
      <div className="container">
        <div className="chatfeed-wrapper">
          {/* {JSON.stringify(this.props.user)} */}
          <ChatFeed
            // chatBubble={this.state.useCustomBubble && customBubble}
            maxHeight={250}
            messages={this.state.messages} // Boolean: list of message objects
            // showSenderName
          />

          <form onSubmit={(e) => this.onMessageSubmit(e)}>
            <input
              ref={(m) => {
                this.message = m;
              }}
              placeholder="Type a message and press enter..."
              className="message-input"
            />
          </form>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              // block
              style={{
                ...styles.button,
                ...(this.state.curr_user === 0 ? styles.selected : {}),
              }}
              onClick={(e) => this.onMessageSubmit(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatUi;
