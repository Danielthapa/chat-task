import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { dummyAccount } from "../../utils/dummyData";

const SelectUserMenu = ({ startConnection }) => {
  const handleUserSelected = (e) => {
    console.log("USER SELECTED", e);
    startConnection(dummyAccount[e.key]);
  };

  const menu = (
    <Menu onClick={handleUserSelected}>
      <Menu.Item key="DANIEL_THAPA">
        <div>Daniel Thapa</div>
      </Menu.Item>
      <Menu.Item key="SUJATA_DONGOL">
        <div>Sujata Dongol</div>
      </Menu.Item>
      <Menu.Item key="KSHITIJ_DHAKAL">
        <div>kshitij Dhakal</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <Button size="large">Select User</Button>
    </Dropdown>
  );
};

export default SelectUserMenu;
