import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>Movie</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">
            <a href="/movie">Home</a>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <a href="/favorite">Favorite</a>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
