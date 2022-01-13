import { useState } from "react";
import "./App.css";
import MqttHandler from "./Mqtt/setup";
import SelectUserMenu from "./components/SelectUserMenu";
import { Input, Button, notification } from "antd";
import { MQTT_TOPICS } from "./utils/constants";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ChatUi from "./components/Chat";
import Connecting from "./components/Chat/Connecting";

export const mqttHandler = new MqttHandler();

function App() {
  const [mqttConnected, setMqttConnected] = useState(false);
  const [messages, setMessage] = useState([]);
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
    setMessage((prevState) => [...prevState, message]);
    localStorage.setItem("msg", JSON.stringify(messages));
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
  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/chat/:key"
            element={
              !mqttConnected ? (
                <Connecting />
              ) : (
                <ChatUi
                  sendMessage={sendMessage}
                  user={user}
                  message={messages}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              <SelectUserMenu
                startConnection={startMqttConnection}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
