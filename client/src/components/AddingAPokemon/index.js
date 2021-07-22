import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, getPokemonType } from "../../redux/actions";
import s from './index.module.css';

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

  function handleCheck(e) {
    if(e.target.value) {
      console.log(e.target.value)
      setState({ ...state, types:
      [...state.types, e.target.value]});
    } else {
      setState({ ...state, types:
      state.types.filter((pokemon) => pokemon !== e.target.value)})
    };
  };

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
  
    if (name === "types") {
      const arr = state[name];
     
      setState({
        ...state,
        [name]: arr.concat(target.value),
      });
  
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
      types: state.types,
      
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
    if (!poke.types) {
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
    <div className={s.back}>
      <div className={s.containerForm}>
        <header>
          <h1 className={s.title}>Create your pokemon!</h1>
        </header>
        <form
          id="survey-form"
          className={s.form}
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={s.divform}>
          <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>NAME</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="text"
                name="name"
                value={state.name}
              ></input>
          </div>
          </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>HP</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="hp"
                value={state.hp}
              ></input>
              </div>
            </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>ATTACK</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="attack"
                value={state.attack}
              ></input>
              </div>
            </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>DEFENSE</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="defense"
                value={state.defense}
              ></input>
              </div>
            </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>SPEED</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="speed"
                value={state.speed}
              ></input>
              </div>
            </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>HEIGHT</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="height"
                value={state.height}
              ></input>
              </div>
            </div>
            <div className={s.formItems}>
              <div className={s.formItems1}>
              <label>WEIGHT</label>
              </div>
              <div>
              <input
                className={s.btm}
                type="number"
                name="weight"
                value={state.weight}
              ></input>
              </div>
            </div>
            <div>
              <label>TYPES</label>
              <div className={s.inputTypes}>
                  {types.map((t) => (
                    <div key={t.typeId} className={s.type}>
                      <input
                        classname={s.input}
                        type="checkbox"
                        name="types"
                        value={t.name}
                        onChange={(e) => handleCheck(e)}/>
                      <label name={t}>{t.name}</label>
                    </div>
                  ))}
              </div>
              <button className={s.submitForm} type="submit">
                Create Pokemon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;