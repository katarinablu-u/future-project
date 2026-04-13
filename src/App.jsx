import { BrowserRouter, Route } from "react-router-dom";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
      <Route path="/" element={<Main />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;