import React from "react";
import { useEffect, useState, MouseEventHandler } from "react";
import Up from "../Stuff/Up";
import { Gel } from "../Stuff/GEL";
import USD from "../Stuff/USD";
import axios from "axios";
import Bike from "../Stuff/Bike";
import Car from "../Stuff/Car";
import Special from "../Stuff/Special";

const type = {
  forrent: { text: "ქირავდება", value: 0 },
  forsale: { text: "იყიდება", value: 1 },
};

export interface searchState {
  dealtype: Number;
  make: Array<Number>;
  category: Array<Number>;
  Minprice: Number;
  MaxPrice: Number;
}
export interface manu {
  man_id: String;
  man_name: String;
  is_car: String;
  is_spec: String;
  is_moto: String;
}

interface category {
  category_id: Number;
  category_type: Number;
  has_icon: Number;
  title: String;
  seo_title: String;
  vehicle_types: Array<Number>;
}
interface SearchBar {
  context: (state: searchState, url: string) => void;
}

const SearchBar: React.FC<SearchBar> = ({ context }) => {
  const [searchvalues, setsearchvalues] = useState<searchState>({
    dealtype: 0,
    make: [],
    category: [],
    Minprice: 0,
    MaxPrice: 999999999999999,
  });

  const [manu_str, setmanustr] = useState<String[]>([]);

  const [data, setData] = useState<any[]>([]);

  const [category, setcategory] = useState<any[]>([]);

  useEffect(() => {
    fetchDataman();
    fetchDatcat();
    fetchproductlistlength();
  }, []);

  const [length, setlength] = useState<any[]>();

  const fetchproductlistlength = async () => {
    try {
      const res = await axios.get("https://api2.myauto.ge/ka/products/");
      setlength(res.data.data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataman = async () => {
    try {
      const response = await fetch("https://static.my.ge/myauto/js/mans.json");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [allcat, setallcat] = useState<any[]>([]);

  const fetchDatcat = async () => {
    try {
      const response = await fetch("https://api2.myauto.ge/ka/cats/get");
      const jsonData = await response.json();
      setallcat(jsonData.data);
      setcategoryindex(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [index, setindex] = useState(false);

  const [url, seturl] = useState<string>("");

  const handleDivClick: MouseEventHandler<HTMLDivElement> = () => {
    setindex(!index);
    if(!index){
      setmanustr([])
      setsearchvalues((prevState) => ({
        ...prevState,
        make: [],
      }));
     
    } 
  };

  const [categoryindex, setcategoryindex] = useState(false);

  const handleDealTypeChange = (newValue: String) => {
    if (newValue === "1") {
      setsearchvalues((prevState) => ({
        ...prevState,
        dealtype: 1,
      }));
    } else if (newValue === "0") {
      setsearchvalues((prevState) => ({
        ...prevState,
        dealtype: 0,
      }));
    }
  };

  const handelCategoy: MouseEventHandler<HTMLDivElement> = () => {
    setcategoryindex(!categoryindex);
  };

  const handelMan = (e: manu) => {
    if (!searchvalues.make.includes(Number(e.man_id))) {
      setsearchvalues((prevState) => ({
        ...prevState,
        make: [...prevState.make, Number(e.man_id)],
      }));
      setmanustr([...manu_str, e.man_name]);
    } else {
      setsearchvalues((prevstate) => ({
        ...prevstate,
        make: prevstate.make.filter((item) => Number(e.man_id) !== item),
      }));
      setmanustr(manu_str.filter((item) => item !== e.man_name));
    }
  };

  const [cat_str, setcatstr] = useState<String[]>([]);

  const handelCategory = (e: category) => {
    if (!searchvalues.category.includes(e.category_id)) {
      setsearchvalues((prevState) => ({
        ...prevState,
        category: [...prevState.category, e.category_id],
      }));
      setcatstr([...cat_str, e.title]);
    } else {
      setsearchvalues((prevstate) => ({
        ...prevstate,
        category: prevstate.category.filter((item) => e.category_id !== item),
      }));
      setcatstr(cat_str.filter((item) => item !== e.title));
    }
    
  };

  const handelminprice = (e: Number) => {
    setsearchvalues((prev) => ({
      ...prev,
      Minprice: e,
    }));
   
  };

  const handelmaxprice = (e: Number) => {
    setsearchvalues((prev) => ({
      ...prev,
      MaxPrice: e,
    }));
   
    console.log(url)
  };
  
  const handelsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const man = searchvalues.make.join('-')
    const netaimushaos = `https://api2.myauto.ge/ka/products?Mans=${man}&PriceFrom=${searchvalues.Minprice}&PriceTo=${searchvalues.MaxPrice}`
    seturl(netaimushaos);
    context(searchvalues, netaimushaos);
  };

  const fetchcarcat = () => {
    setcategory(allcat.filter((item) => item.category_type === 0));
    setcategoryindex(false);
  };

  const fetchbikecat = () => {
    setcategory(allcat.filter((item) => item.category_type === 2));
    setcategoryindex(false);
  };

  const fetchspecialcat = () => {
    setcategory(allcat.filter((item) => item.category_type === 1));
    setcategoryindex(false);
  };

  return (
    <div>
      <span className="path">
        მთავარი &#62; ძიება &#62; <b style={{ color: "#fd4100" }}>იყიდება</b>
      </span>
      <div className="type-btn">
        <Car method={fetchcarcat}></Car>
        <Bike method={fetchbikecat}></Bike>
        <Special method={fetchspecialcat}></Special>
      </div>
      <form className="search-bar" onSubmit={(e) => handelsubmit(e)}>
        <div className="fields">
          <label
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            გარიგების ტიპი
          </label>
          <select
            onChange={(e) => handleDealTypeChange(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="" disabled>
              {"გატიგრბის ტიპი"}
            </option>
            <option value={type.forrent.value}>{type.forrent.text}</option>
            <option value={type.forsale.value}>{type.forsale.text}</option>
          </select>
          <label
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            მწარმოებელი
          </label>

          <div className="dropdown" onClick={handleDivClick}>
            <span className="ddspan">
              {searchvalues.make.length === 0
                ? "მწაროებელი"
                : manu_str.join(", ")}
            </span>
            <span className="arrow">
              <div className={` ${index ? "rotated" : ""}`}>
                <Up></Up>
              </div>
            </span>
          </div>
          {index && (
            <div className="dropdown-menu">
              {data.map((item) => (
                <div key={item.man_id} className="dropdown-item">
                  <label className="manu_item"></label>
                  <input
                    type="checkbox"
                    className="empty"
                    value={item.man_id}
                    onChange={() => {handelMan(item)}}
                  ></input>
                  <div className="divv">
                    <span className="empty"></span>
                    <span className="sec-span">{item.man_name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <label
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            კატეგორია
          </label>
          <div className="dropdown" onClick={handelCategoy}>
            <span className="ddspan">
              {searchvalues.category.length === 0
                ? "კატეგორია"
                : cat_str.join(", ")}
            </span>
          </div>
          {categoryindex && (
            <div className="dropdown-menu">
              {category.map((item) => (
                <div key={item.category_id} className="dropdown-item">
                  <label className="manu_item"></label>
                  <input
                    type="checkbox"
                    className="empty"
                    value={item.category_id}
                    onChange={() => handelCategory(item)}
                  ></input>
                  <div className="divv">
                    <span className="empty"></span>
                    <span className="sec-span">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="price-div">
            <label className="price">ფასი</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                width: "30px",
              }}
            >
              <div className="currencies">
                <span className="usd-span">
                  <USD></USD>
                </span>
              </div>
              <span>
                <Gel></Gel>
              </span>
              <input
                type="number"
                className="Minprice"
                onChange={(e) => handelminprice(Number(e.target.value))}
              ></input>
              <span className="pointer"></span>
              <input
                type="number"
                className="Maxprice"
                onChange={(e) => handelmaxprice(Number(e.target.value))}
              ></input>
            </div>
          </div>
        </div>
        <button type="submit">ძებნა {length}</button>
      </form>
    </div>
  );
};

export default SearchBar;
