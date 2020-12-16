import "./App.css";
import { DataProvider } from "./StateHandler";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
