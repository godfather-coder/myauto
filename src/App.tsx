import List from "./Utils/List";
import MyAutoLogo from "./Stuff/MyAutoLogo";
import SearchBar, { searchState } from "./Utils/SearchBar";
import "./App.scss";
import { useState } from "react";

const App: React.FC = () => {

  const [searchdata, setseatch] = useState<searchState>();

  const [arg, setarg] = useState<string>('');

  const context = (state: searchState,url:string) => {
    setseatch(state);
    setarg(url);
  };

  return (
    <div className="main">
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <MyAutoLogo></MyAutoLogo>
      </div>
      <div className="mainneasteddiv">
        <SearchBar context={context}></SearchBar>
        <List searchstate={searchdata} str={arg} />
      </div>
    </div>
  );
};

export default App;
