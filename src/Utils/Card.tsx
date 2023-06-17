import React, { useEffect, useState } from "react";
import { CarData } from "../Stuff/CardInterface";
import { manu } from "./SearchBar";
import axios from "axios";
import Engine from "../Stuff/Engine";
import SterrinWhell from "../Stuff/SterrinWhell";
import Transmission from "../Stuff/Transmission";
import Wheel from "../Stuff/Wheel";
import USD from "../Stuff/USD";

interface CardI {
  car: CarData;
}

interface Model {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: number;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
}

const Card: React.FC<CardI> = ({ car }) => {

  const [make, setmake] = useState<manu[]>([]);

  const [models, setmodels] = useState<Model[]>([]);

  const findManuById = (manId: string): manu | undefined => {
    return make.find((manu: manu) => manu.man_id === manId);
  };

  const foundModel = models.find((model) => model.model_id === car.model_id);

  const fetchModel = async () => {
    try {
      const res = await axios.get(
        `https://api2.myauto.ge/ka/getManModels?man_id=${car.man_id}`
      );
      setmodels(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchcarsmake = async () => {
    try {
      const res = await axios.get("https://static.my.ge/myauto/js/mans.json");
      setmake(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [gear, setgear] = useState<String>("");

  useEffect(() => {
    fetchcarsmake();
    fetchModel();
    switch (car.gear_type_id) {
      case 1:
        setgear("მექანიკური");
        break;
      case 2:
        setgear("ავტომატური");
        break;
      case 3:
        setgear("ტიპტრონიკი");
        break;
      default:
        setgear("ტიპტრონიკი");
        break;
    }
  }, [car.gear_type_id]);

  return (
    <div className="container">
      <div className="nestedcontainer">
        <img
          className="item-img"
          src={`https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`}
          alt={car.car_desc}
        ></img>
        <div className="second-part">
          <div className="cardHeader">
            <div className="cardlabel">{!car.for_rent ? (
              ""
            ) : (
              <div className="forrentlabel">
                <span
                  style={{ fontSize: "14px", width: "80%", color: "white" }}
                >
                  ქირავდება
                </span>
              </div>
            )}
            <span className="carmake">
              {findManuById(String(car.man_id))?.man_name}{" "}
              <span className="model">{foundModel?.model_name} </span>
              <span className="prod-year">{car.prod_year} წ</span>
            </span></div>
          </div>
          <div className="order3">
          <div className="card_midle">
            <span>
              <span className="media"><Engine></Engine></span> {Number(car.engine_volume) / 1000}
              {Number(car.engine_volume) % 1000 === 0 && ".0"}
            </span>
            <div className="card-midle-midle-div">
              <span className="borbali">
                <span className="media"><Wheel /></span>
              </span>
              <span className="garbeni">{car.car_run_km} კმ</span>
            </div>{" "}
            <div className="fasi">
              {car.price_usd}{" "}
              <div className="valuta">
                <USD></USD>
              </div>
            </div>
          </div>
          <div className="cardfooter">
            <span className="karofka">
              <span className="media"><Transmission /></span>
              <span>{gear}</span>
            </span>
            <span className="sawe">
              <span className="media"><SterrinWhell></SterrinWhell></span>
              {car.right_wheel ? " მარჯვენა" : " მარცხენა"}
            </span>
          </div> <span className="naxvebi">{car.views} ნახვა</span>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Card;
