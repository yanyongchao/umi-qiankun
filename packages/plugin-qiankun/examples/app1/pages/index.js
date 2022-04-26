import React, { useState, useRef } from 'react';
import { useModel, MicroAppWithMemoHistory, history } from 'umi';
import { Drawer } from 'antd';
import { loadMicroApp } from 'qiankun';

export default function () {
  const { testProp1, globalState } = useModel('@@qiankunStateFromMaster') || {};
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  return (
    <div>
      <h1>Dashboard 1</h1>
      <p>testProp1: {testProp1}</p>
      <p>globalState: {JSON.stringify(globalState)}</p>

      <h1>MicroAppWithMemoHistory</h1>
      {/* <MicroAppWithMemoHistory name="app3" url="/home"></MicroAppWithMemoHistory> */}
      <div ref={ref}></div>
      <button
        onClick={() => {
          // setVisible(true);
          const d = loadMicroApp({
            name: 'app3',
            entry: 'http://localhost:8003/app3/home',
            container: ref.current,
          });
        }}
      >
        打开 app2
      </button>

      <Drawer
        title="嵌入 app2"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        width={800}
      >
        <MicroAppWithMemoHistory
          name="app2"
          url="/user"
          current={2}
          pageSize={5}
        />
      </Drawer>
    </div>
  );
}
