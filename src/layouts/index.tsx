import React from "react";
import { Link } from "umi";
import { Menu } from "antd";

function AppLayout(props: any) {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to="/user">用户页</Link>
        </Menu.Item>
      </Menu>
      {props.children}
    </div>
  );
}

export default AppLayout;
