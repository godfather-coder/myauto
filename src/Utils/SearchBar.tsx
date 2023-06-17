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
    if (!index) {
      setmanustr([]);
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

    console.log(url);
  };

  const handelsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const man = searchvalues.make.join("-");
    const netaimushaos = `https://api2.myauto.ge/ka/products?Mans=${man}&PriceFrom=${searchvalues.Minprice}&PriceTo=${searchvalues.MaxPrice}`;
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
    <div className="searcmain">
      <span className="path">
        მთავარი &#62; ძიება &#62; <b style={{ color: "#fd4100" }}>იყიდება</b>
      </span>
      <div className="dfdd">
        <div className="type-btn">
          <Car method={fetchcarcat}></Car>
          <Bike method={fetchbikecat}></Bike>
          <Special method={fetchspecialcat}></Special>
        </div>
        <form className="search-bar" onSubmit={(e) => handelsubmit(e)}>
          <div className="fields">
            <label
              style={{
                color: "black",
                fontSize: "12px",
                fontWeight: "bold",
                marginLeft: "2%",
              }}
            >
              გარიგების ტიპი
            </label>
            <select
              onChange={(e) => handleDealTypeChange(e.target.value)}
              style={{ width: "95%" }}
              className="qiravdeba"
            >
              <option value="" disabled>
                {"გატიგრბის ტიპი"}
              </option>
              <option value={type.forrent.value}>{type.forrent.text}</option>
              <option value={type.forsale.value}>{type.forsale.text}</option>
            </select>
            <label
              style={{
                color: "black",
                fontSize: "12px",
                fontWeight: "bold",
                marginLeft: "2%",
              }}
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
                      onChange={() => {
                        handelMan(item);
                      }}
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
              <div className="fasihead">
                <label className="price">ფასი</label>
                <svg
                  className="kai"
                  viewBox="0 0 46 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="45"
                    height="23"
                    rx="11.5"
                    stroke="#E2E5EB"
                  ></rect>
                  <rect width="24" height="24" rx="12" fill="#272A37"></rect>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M34.4192 18V16.6784C35.236 16.6258 35.9421 16.446 36.5376 16.1392C37.5125 15.6395 38 14.8373 38 13.7326C38 12.8953 37.6443 12.2466 36.9329 11.7863C36.5007 11.5101 35.6576 11.1923 34.4033 10.8329V8.32767C34.9303 8.35836 35.2939 8.52932 35.4942 8.84055C35.6101 9.02027 35.6892 9.30521 35.7313 9.69534H37.8103C37.7787 8.64329 37.3176 7.88274 36.427 7.4137C35.9369 7.12 35.2623 6.94466 34.4033 6.88767V6H33.6524V6.87452C33.1149 6.90959 32.7065 6.96438 32.4272 7.0389C31.9687 7.15726 31.5524 7.37205 31.1782 7.68329C30.8884 7.92438 30.6631 8.21151 30.5024 8.54466C30.3416 8.87781 30.2613 9.24822 30.2613 9.65589C30.2613 10.274 30.4681 10.8022 30.8818 11.2405C31.2955 11.6789 32.0056 12.0208 33.0121 12.2663L33.6524 12.4241V15.2318C33.0516 15.1441 32.6485 14.9534 32.443 14.6597C32.3112 14.4712 32.2085 14.1008 32.1347 13.5485H30.0004C29.9846 14.7627 30.4273 15.6219 31.3284 16.126C31.8396 16.4066 32.6142 16.5951 33.6524 16.6915V18H34.4192ZM33.6524 10.6488C33.2677 10.5479 32.9831 10.4384 32.7987 10.32C32.4667 10.1052 32.3007 9.8137 32.3007 9.44548C32.3007 9.10794 32.4114 8.84164 32.6327 8.64657C32.854 8.45151 33.1939 8.34959 33.6524 8.34082V10.6488ZM34.4033 12.6411V15.2121C34.8197 15.1682 35.1227 15.0893 35.3124 14.9753C35.6444 14.7737 35.8104 14.4252 35.8104 13.9299C35.8104 13.5529 35.6549 13.2548 35.344 13.0356C35.1596 12.9085 34.846 12.777 34.4033 12.6411Z"
                    fill="#8C929B"
                  ></path>
                  <path
                    d="M11.9847 8.55309C11.8313 8.55309 11.6421 8.57119 11.4172 8.60741V12.1519H10.5276V8.82469C9.91411 9.10535 9.47444 9.52634 9.20859 10.0877C8.95297 10.6399 8.82515 11.328 8.82515 12.1519C8.82515 12.8218 8.96319 13.4239 9.23926 13.958C9.51534 14.4831 9.91411 14.8996 10.4356 15.2074C10.9571 15.5152 11.5808 15.6691 12.3067 15.6691H15.9264V17H7.64417V15.7235H9.14724V15.6691C8.66667 15.4337 8.26278 15.1078 7.93558 14.6914C7.61861 14.2749 7.38344 13.8222 7.23006 13.3333C7.07669 12.8354 7 12.351 7 11.8802C7 11.2012 7.14315 10.563 7.42945 9.96543C7.71575 9.35885 8.12474 8.83827 8.65644 8.4037C9.19836 7.96914 9.82209 7.66584 10.5276 7.49383V6H11.4172V7.33086C11.6421 7.31276 11.8313 7.3037 11.9847 7.3037C12.1074 7.3037 12.3016 7.31276 12.5675 7.33086V6H13.4571V7.49383C14.183 7.6749 14.8119 7.9963 15.3436 8.45803C15.8855 8.9107 16.2945 9.45844 16.5706 10.1012C16.8569 10.744 17 11.4276 17 12.1519H15.1748C15.1748 11.328 15.0419 10.6399 14.7761 10.0877C14.5102 9.52634 14.0706 9.10535 13.4571 8.82469V12.1519H12.5675V8.60741C12.3834 8.57119 12.1892 8.55309 11.9847 8.55309Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="ffggdd">
                <input
                  type="number"
                  className="Minprice"
                  onChange={(e) => handelminprice(Number(e.target.value))}
                  placeholder="-დან"
                ></input>
                <span className="pointer"></span>
                <input
                  type="number"
                  className="Maxprice"
                  placeholder="-მდე"
                  onChange={(e) => handelmaxprice(Number(e.target.value))}
                ></input>
              </div>
            </div>
          </div>
          <button className="submit" type="submit">
            ძებნა {length}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
