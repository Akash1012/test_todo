import React from 'react';
import EditableTable from './Compoments/UserData'
import './App.css';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Provider } from 'react-redux'
import Todo from './Compoments/Todo'
import store from './Redux/store'


const { TabPane } = Tabs;


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="User" key="1">
            <EditableTable />
          </TabPane>
          <TabPane tab="Todos" key="2">
            <Todo />
          </TabPane>

        </Tabs>
      </div>
    </Provider>
  );
}

export default App;
