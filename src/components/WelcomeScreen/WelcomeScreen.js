import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { defaultData } from "../../config/emptyData";

import ApiServiceContext from "../api-service-context/api-service-context";

const WelcomeScreen = () => {
  const apiService = useContext(ApiServiceContext);

  const [catName, setCatName] = useState([]);

  // ---подгрузить список всех коллекций-котов---
  useEffect(() => {
    getListCats();
  }, []);

  const getListCats = () => {
    apiService.getListCats("/listcatname").then(data => setCatName(data));
  };

  const [nameValue, setNameValue] = useState("");

  const handleInput = e => {
    setNameValue(e.target.value);
  };

  const sendTemplateData = nameValue => {
    fetch(`/things`, {
      // пробую пока сюда
      // fetch(`/${nameValue}`, {
      method: "post",
      body: JSON.stringify(defaultData), //тут отпраить default data
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    }).catch(err => {
      console.error(err);
    });
  };

  // добавить кота в общий список
  const handleCreate = () => {
    fetch(`/listcatname`, {
      method: "post",
      body: JSON.stringify({ name: nameValue }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(sendTemplateData(nameValue)) // вызвать ф-ю к-я отправит пустой шаблон-массив
      .then(setNameValue("")) // сбросить имя в поле ввода
      .then(getListCats()) // обновить список
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <div>
        <h3>Выберите кота или создайте нового</h3>
        <div>
          <h4>Список котов:</h4>
          <ul>
            {catName.map(el => (
              <li key={el._id}>
                {/* <a href={"http://localhost:3001"}>{el.name}</a> */}
                <Link to={'/felix'}>{el.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form
            onSubmit={event => {
              handleCreate();
              event.preventDefault();
            }}
          >
            <label>
              <input
                type="text"
                name="name"
                placeholder="Имя кота"
                value={nameValue}
                encType="application/json"
                onChange={handleInput}
              />
            </label>

            {/* <input
              type="date"
              name="birthday"
              placeholder="День рождения кота"
              // value={this.state.surname}
              // onChange={this.handleInput}
            /> */}
            {/* <input 
              type="submit"
              value="Добавить"
            /> */}
            <button
              // className="add-new-employee__send-btn"
              type="submit"
            >
              Создать нового кота
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
