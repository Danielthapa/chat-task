import { CreateUUID } from "../utils/helper";
import Paho from "paho-mqtt";
import { MQTT_TOPICS } from "../utils/constants";

const port = 443;
const host = "ws.anydone.net";

class MqttHandler {
  constructor() {
    this.port = port;
    this.clientId = CreateUUID();
    this.client = new Paho.Client(host, port, this.clientId);
    this.userName = null;
    this.token = null;
    this.messageArrivedFunc = null;
    this.connectionLostFunc = null;
    this.mqttCredentialData = null;
    this.connectionData = null;
    this.isConnectedFunc = null;
    this.roomId = null;
  }

  static GenerateNewClientId() {
    this.client.isConnected() && this.client.disconnect();
    const newId = CreateUUID();
    this.client = new Paho.Client(host, port, newId);
  }

  loadEventActions(messageArrivedFunc, connectionLostFunc, isConnectedFunc) {
    this.messageArrivedFunc = messageArrivedFunc;
    this.isConnectedFunc = isConnectedFunc;
    this.connectionLostFunc = connectionLostFunc;
  }

  onConnect() {
    if (this.client.isConnected()) {
      this.isConnectedFunc(true);
      this.subscribeChat();
    } else {
      this.isConnectedFunc(false);
    }
  }

  onFailure() {
    console.log("ON MQTT CONNECTION FAILURE");
    this.startConnection();
  }

  startConnection() {
    console.log(this);
    if (!this.client.isConnected()) {
      this.client.connect({
        onSuccess: () => this.onConnect(),
        onFailure: () => this.onFailure(),
        useSSL: true,
        userName: this.userName,
        password: this.token,
        reconnect: true,
        // timeout: 3, //  time duration for reconnection
        // keepAliveInterval: 30,
        // mqttVersion: 4,
      });
    }

    // this.client.isConnected();
    this.client.onMessageArrived = this.messageArrivedFunc;
    this.client.onConnectionLost = this.connectionLostFunc;
  }

  subscribeMsg(topic) {
    console.log("subscribing to :", topic);
    this.client.isConnected() && this.client.subscribe(topic);
  }

  unsubscribeMsg(topic) {
    this.client.isConnected() && this.client.unsubscribe(topic);
  }

  subscribeChat() {
    console.log("Subscribe to chat events: ");
    this.subscribeMsg(MQTT_TOPICS.CHAT);
  }

  unSubscribeChat() {
    console.log("Unsubscribe to chat events:");

    this.unsubscribeMsg(MQTT_TOPICS.CHAT);
  }

  publish(topic, msg) {
    if (this.client.isConnected()) {
      try {
        console.log("Publishing to:", topic);
        const serializedMessage = this.serializeMessage(msg);
        const message = new Paho.Message(serializedMessage);
        message.destinationName = topic;
        this.client.send(message);
      } catch (error) {
        console.log(error);
      }
    } else console.log("COULD NOT PUBLISH: MQTT NOT CONNECTED");
  }

  serializeMessage(message) {
    const serialized = JSON.stringify(message);
    return serialized;
  }

  desirializeMessage(message) {
    const deserialized = JSON.parse(message);
    return deserialized;
  }
}

export default MqttHandler;
