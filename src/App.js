import React from 'react';
import './style.css';
import { Tabs } from 'antd';

import { GlobalProvider } from './Components/Context/GlobalContext';
import PageSearch from './Components/PageSearch/PageSearch';
import PageRated from './Components/PageRated/PageRated';

const items = [
  {
    key: 'Search',
    label: 'Search movies',
    children: <PageSearch />,
  },
  {
    key: 'Rated',
    label: 'Rated movies',
    children: <PageRated />,
  },
];
function App() {
  return (
    <GlobalProvider>
      <Tabs defaultActiveKey="1" items={items} style={{ alignItems: 'center' }} />
    </GlobalProvider>
  );
}

export default App;
