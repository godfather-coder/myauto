import List from "./List";
import MyAutoLogo from "./Utils/MyAutoLogo";
import SearchBar from "./Utils/SearchBar";
import "./App.scss";
const App: React.FC = () => {
  return (
    <div className="main">
      <div style={{ backgroundColor: "white", width: "90%" }}>
        <MyAutoLogo></MyAutoLogo>
      </div>
      <div className="mainneasteddiv">
        <SearchBar></SearchBar> <List />
      </div>
    </div>
  );
};

export default App;
