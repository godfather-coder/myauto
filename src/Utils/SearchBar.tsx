import React from "react";
import { useEffect, useState, MouseEventHandler, useRef } from "react";
import SerchIcon from "./SerchIcon";
import Up from "../Stuff/Up";
import { Gel } from "../Stuff/GEL";
import USD from "../Stuff/USD";
import axios from "axios";
const type = {
  forrent: { text: "ქირავდება", value: 0 },
  forsale: { text: "იყიდება", value: 1 },
};

interface searchState  {
  dealtype: Number,
  make: Number,
  category: Number,
  Minprice: Number,
  MaxPrice: Number,
};

interface Manufacturer {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

const SearchBar: React.FC = () => {

  const [searchvalues, setsearchvalues] = useState<searchState>({
    dealtype: 0,
  make: 0,
  category: 0,
  Minprice: 0,
  MaxPrice: 0,
  });

  const [data, setData] = useState<any[]>([]);

  const [category, setcategory] = useState<any[]>([]);

  useEffect(() => {
    fetchDataman();
    fetchDatcat();
    fetchproductlistlength();
  }, []);

  const[length, setlength]= useState<any[]>();

  const fetchproductlistlength = async () => {
    try{
        const res = await axios.get('https://api2.myauto.ge/ka/products/');
        setlength(res.data.data.items.length);
        
    }catch(error){
      console.log(error)
    }
  }
  const fetchDataman = async () => {
    try {
      const response = await fetch("https://static.my.ge/myauto/js/mans.json");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDatcat = async () => {
    try {
      const response = await fetch("https://api2.myauto.ge/ka/cats/get");
      const jsonData = await response.json();
      setcategory(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [index, setindex] = useState(false);

  const handleDivClick: MouseEventHandler<HTMLDivElement> = () => {
    setindex(!index);
  };

  const [categoryindex, setcategoryindex] = useState(false);

  const handelCategoy: MouseEventHandler<HTMLDivElement> = () => {
    setcategoryindex(!categoryindex);
  };
  const handelsubmit =()=>{
    console.log("heheh")
  }

  return (
    <div>
      <span className="path">
        მთავარი &#62; ძიება &#62; <b style={{ color: "#fd4100" }}>იყიდება</b>
      </span>
      <SerchIcon />
      <form className="search-bar" onSubmit={handelsubmit}>
        <div className="fields">
          <label
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            გარიგების ტიპი
          </label>
          <select style={{ width: "100%" }}>
            <option value="" disabled>
              {"გატიგრბის ტიპი"}
            </option>
            <option value={type.forrent.text}>{type.forrent.text}</option>
            <option value={type.forsale.text}>{type.forsale.text}</option>
          </select>
          <label
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            მწარმოებელი
          </label>

          <div className="dropdown" onClick={handleDivClick}>
            <span className="ddspan">მწარმოებელი</span>
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
            მწარმოებელი
          </label>
          <div className="dropdown" onClick={handelCategoy}>
            <span className="ddspan">ყველა კატეგორია</span>
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
              <input type="text" className="usd"></input>
              <span className="pointer"></span>
              <input type="text" className="usd"></input>
            </div>
          </div>
        </div>
        <button type="submit" >ძებნა {length}</button>
      </form>
    </div>
  );
};

export default SearchBar;
