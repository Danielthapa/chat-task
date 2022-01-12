import { useState } from "react";
import "./App.css";
import MqttHandler from "./Mqtt/setup";
import SelectUserMenu from "./components/SelectUserMenu";
import { Input, Button, notification } from "antd";
import { MQTT_TOPICS } from "./utils/constants";

export const mqttHandler = new MqttHandler();

function App() {
  const [mqttConnected, setMqttConnected] = useState(false);
  const [message, setMessage] = useState("");
  const newMessageArrivedFunc = (message) => {
    const messagePayload = JSON.parse(message.payloadString);
    console.log("NEW MESSAGE ARRIVED", messagePayload);
    openNotification(messagePayload);
  };

  const connectionLostFunc = () => {
    console.log("MQTT CONNECTION LOST");
  };

  const mqttConnectedFunc = () => {
    console.log("Mqtt connected successfully");
    setMqttConnected(true);
  };

  mqttHandler.loadEventActions(
    newMessageArrivedFunc,
    connectionLostFunc,
    mqttConnectedFunc
  );

  const startMqttConnection = (account) => {
    mqttHandler.userName = account.accountId;
    mqttHandler.token = account.token;
    try {
      mqttHandler.startConnection();
    } catch (error) {
      console.log("ERROR CONNECTING MQTT", error);
    }
  };

  const sendMessage = (message) => {
    mqttHandler.publish(MQTT_TOPICS.CHAT, message);
    setMessage("");
  };

  const openNotification = (message) => {
    notification.open({
      message: "New Message",
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <div className="App">
      <SelectUserMenu startConnection={startMqttConnection} />
      {mqttConnected && (
        <>
          <div> MQTT CONNECTED</div>
          <Input.Group compact>
            <Input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              style={{ width: "200px" }}
              placeholder="Enter a message"
              onPressEnter={() => sendMessage(message)}
            />
            <Button
              onClick={() => {
                sendMessage(message);
              }}
              type="primary"
            >
              Send
            </Button>
          </Input.Group>
        </>
      )}
    </div>
  );
}

export default App;
