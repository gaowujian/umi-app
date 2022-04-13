import React from "react";
import { Link } from "umi";
import { Menu } from "antd";
import "./style.less";
function AppLayout(props: any) {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to={"/common"}>普通表单</Link>
        </Menu.Item>
        <Menu.Item key="pro">
          <Link to={"/pro"} style={{ marginLeft: "20px" }}>
            高级表单
          </Link>
        </Menu.Item>
        <Menu.Item key="workflow">
          <Link to={"/workflow"} style={{ marginLeft: "20px" }}>
            工作流卡片
          </Link>
        </Menu.Item>
        <Menu.Item key="inter">
          <Link to={"/inter"} style={{ marginLeft: "20px" }}>
            国际化组件使用
          </Link>
        </Menu.Item>
      </Menu>

      <div className="app">
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
