import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { dummyAccount } from "../../utils/dummyData";
import { useNavigate } from "react-router-dom";

const SelectUserMenu = ({ startConnection, setUser }) => {
  const navigate = useNavigate();
  const handleUserSelected = (e) => {
    console.log("USER SELECTED", e);
    setUser(e.key);
    startConnection(dummyAccount[e.key]);
    // console.log(e.key);
    navigate(`/chat/${e.key}`);
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
    <>
      <span>Please Select User In Menu</span>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button size="large">Select User</Button>
      </Dropdown>
    </>
  );
};

export default SelectUserMenu;
