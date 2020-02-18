import React from 'react';
import { useState } from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import Clock from './Clock'
import Stopwatch from './Stopwatch'
import Timer from './Timer'

const { Header, Footer, Content } = Layout;
// const { SubMenu } = Menu;

function App(props) {
  const [key, setKey] = useState("1");
  
  function onMenuSelect(item) {
    // function({ item, key, keyPath, selectedKeys, domEvent })
    // console.log(item);
    setKey(item.key);
  }

  const content = {
    "1": <Clock />,
    "2": <Stopwatch />,
    "3": <Timer />,
  };

  return (
    <Layout className="App">
      
      <Header className="App-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          onSelect={(item) => onMenuSelect(item)}
        >
          <Menu.Item key="1">Clock</Menu.Item>
          <Menu.Item key="2">Stopwatch</Menu.Item>
          <Menu.Item key="3">Timer</Menu.Item>
        </Menu>
      </Header>

      <Content className="App-content">
        {content[key]}
      </Content>

      <Footer className="App-footer">
        HaptX Inc. &copy; 2020
      </Footer>
    </Layout>
  );
}

export default App;