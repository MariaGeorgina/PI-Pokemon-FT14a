import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, getPokemonType } from "../../redux/actions";
import { Link } from "react-router-dom";


function Form() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);

  const [state, setState] = useState({
    name: "",
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log([name, value]);
    // console.log(target.value);
    if (name === "types") {
      const arr = state[name];
      // console.log(arr);
      setState({
        ...state,
        [name]: arr.concat(target.value),
      });
      // console.log(state[name]);
    } else {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  useEffect(() => {
    dispatch(getPokemonType());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const poke = {
      name: state.name,
      hp: state.hp,
      attack: state.attack,
      defense: state.defense,
      speed: state.speed,
      height: state.height,
      weight: state.weight,
      typeId: state.types[0],
      typeId2: state.types[1],
    };

    if (!poke.name) {
      alert("Please, enter a name");
      return;
    }
    if (!poke.hp) {
      alert("Please, give some health to your poke!");
      return;
    }
    if (!poke.attack) {
      alert("Please, give some attack to your poke!");
      return;
    }
    if (!poke.defense) {
      alert("Please, give some defense to your poke!");
      return;
    }
    if (!poke.speed) {
      alert("Please, give some speed to your poke!");
      return;
    }
    if (!poke.height) {
      alert("Please, give some height to your poke!");
      return;
    }
    if (!poke.weight) {
      alert("Please, give some weight to your poke!");
      return;
    }
    if (!poke.typeId) {
      alert("Dont forget to add a type to your poke!");
      return;
    }

    dispatch(addPokemon(poke));
    e.target.reset();
    alert("Pokemon created successfully!");

    setState({
      name: "",
      hp: null,
      attack: null,
      defense: null,
      speed: null,
      height: null,
      weight: null,
      types: [],
    });
  };

  return (
    <>
      <div>
        <header>
          <h1 id="title">Create your pokemon!</h1>
        </header>
        <form
          id="survey-form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <div>
              <label>NAME</label>
              <input
                type="text"
                name="name"
                value={state.name}
              ></input>
            </div>
            <div>
              <label>HP</label>
              <input
                type="number"
                name="hp"
                value={state.hp}
              ></input>
            </div>
            <div>
              <label>ATTACK</label>
              <input
                type="number"
                name="attack"
                value={state.attack}
              ></input>
            </div>
            <div>
              <label>DEFENSE</label>
              <input
                type="number"
                name="defense"
                value={state.defense}
              ></input>
            </div>
            <div>
              <label>SPEED</label>
              <input
                type="number"
                name="speed"
                value={state.speed}
              ></input>
            </div>
            <div>
              <label>HEIGHT</label>
              <input
                type="number"
                name="height"
                value={state.height}
              ></input>
            </div>
            <div>
              <label>WEIGHT</label>
              <input
                type="number"
                name="weight"
                value={state.weight}
              ></input>
            </div>
            <div>
              <label>TYPES</label>
              <div>
                <ul>
                  {types.map((t) => (
                    <li key={t.typeId}>
                      <input
                        type="checkbox"
                        name="types"
                        value={t.name}
                      ></input>
                      <label name={t}>{t.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <button type="submit">
                Create Pokemon
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;