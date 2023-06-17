import React, { useEffect, useState, MouseEventHandler } from "react";
import Card from "./Card";
import { CarData } from "../Stuff/CardInterface";
import { searchState } from "./SearchBar";


interface List{
   searchstate : searchState | undefined,
   str : string
}

const List: React.FC<List> = ({searchstate,str}) => {

  const [products, setProducts] = useState([]);

  const [priodindex, setperiodindex] = useState<boolean>(false);

  const[searchdata, setdata ] = useState<searchState |undefined>(searchstate);

  const[url,seturl] = useState<string>('https://api2.myauto.ge/ka/products')

  const fetchfilter = async ()=>{
    try {
      seturl(str)
      const response = await fetch(str);
      const data = await response.json();
      setProducts(data.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(()=>{
    fetchfilter();
  },[setProducts,searchstate,searchdata])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api2.myauto.ge/ka/products");
        const data = await response.json();
        setProducts(data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);

  const handleDivClick: MouseEventHandler<HTMLDivElement> = () => {
    setperiodindex(!priodindex);
  };

  const [sortindex, setsortindex] = useState<boolean>(false);

  const handelsort: MouseEventHandler<HTMLDivElement> = () => {
    setsortindex(!sortindex);
  };

  const[sortiswarwera,setsortiswarwera] = useState('თარიღი კლებადი')

  const sort = async(e:Number,b:string) => {
    setsortiswarwera(b);
    try{
      const response = await fetch(`${url}&SortOrder=${e}`);
      const data = await response.json();
      setProducts(data.data.items);
     }catch (error){
      console.log(error)
     }
  }


  const sorrtProductByPeriod = async (e:String) =>{
    try{
    const response = await fetch(`${url}&${e}h`);
    const data = await response.json();
    setProducts(data.data.items);
   }catch (error){
    console.log(error)
   }
  }

  return (
    <div className="my-component">
      <span className="header">{products.length} განცხადება</span>
      <div className="dropdowns">
        <div>
          <div className="dropdown" onClick={handleDivClick}>
            <div className="dropdown-label">
              პერიოდი
              <span className="toggle-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 11-3 3-3-3"
                    stroke="#6F7383"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          {priodindex && (
            <div className="period">
              <span className="periodspan" onClick={() => sorrtProductByPeriod('1')}>1 საათი</span>
              <span className="periodspan" onClick={() => sorrtProductByPeriod('2')}>2 საათი</span>
              <span className="periodspan" onClick={() => sorrtProductByPeriod('3')}>3 საათი</span>
              <span className="periodspan" onClick={() => sorrtProductByPeriod('4')}>4 საათი</span>
            </div>
          )}
        </div>
        <div>
          <div className="dropdown">
            <div className="dropdown-label" onClick={handelsort}>
              {sortiswarwera}
              <span className="toggle-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 11-3 3-3-3"
                    stroke="#6F7383"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          {sortindex && (
            <div className="sort">
              <span className="periodspan" onClick={() => sort(1,'თარიღი კლებადი')}>
                თარიღი კლებადი
              </span>
              <span className="periodspan" onClick={() => sort(2,'თარიღი ზრდადი')}>
              თარიღი ზრდადი
              </span>
              <span className="periodspan"onClick={() => sort(3,'ფასი კლებადი')}>
                ფასი კლებადი
              </span>
              <span className="periodspan" onClick={() => sort(4,'ფასი ზრდადი')}>
                ფასი ზრდადი
              </span>
              <span className="periodspan" onClick={() => sort(5,'გარბენი კლებადი')}>
                გარბენი კლებადი
              </span>
              <span className="periodspan" onClick={() => sort(6,'გარბენი ზრდადი')}>
                გარბენი ზრდადი
              </span>
            </div>
          )}
        </div>
      </div>
      {products.map((item: CarData) => (
        <Card key={item.car_id} car={item}></Card>
      ))}
    </div>
  );
};

export default List;
