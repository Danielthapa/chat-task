import React from "react";
import { Form, Input, Button } from "antd";

export default function ChatUi(props) {
  return (
    <div className="container">
      <div className="chatfeed-wrapper">
        <ChatFeed maxHeight={250} messages={this.state.messages} />

        <Form name="nest-messages" onFinish={onFinish}>
          <Form.Item name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
