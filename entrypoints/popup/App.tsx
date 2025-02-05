import './App.css';

import Dashboard from '@/components/Dashboard';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ServicePanel from '@/components/ServicePanel';

function App() {
  return (
    <>
      <Stack>
        <Dashboard />
        <Divider variant="middle" />
        <ServicePanel />
      </Stack>
    </>
  );
}

export default App;
