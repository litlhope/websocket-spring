import {Route, Routes} from 'react-router-dom';

import Chatting from "./pages/Chatting";

const Router = () => {
  return (
    <Routes>
      <Route path="/chatting" element={<Chatting />} />
    </Routes>
  );
};

export default Router;
