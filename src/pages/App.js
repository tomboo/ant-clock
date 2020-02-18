import React from 'react';
import { Layout } from "antd";
import "./App.css";
import Timer from './timer'

const { Header, Footer, Content } = Layout;

function App(props) {
  return (
    <Layout className="App">
      <Header className="App-header">
        <h1>Clock</h1>
      </Header>
      <Content className="App-content">
        <Timer />        
      </Content>
      <Footer className="App-footer">&copy; HaptX Inc.</Footer>
    </Layout>
  );
}

export default App;