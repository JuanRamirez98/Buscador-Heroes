import React from "react";
import axios from "axios";
import "../components/App.css";
import { MD5 } from "../components/MD5";

/* 
let ts = Date.now();
const publicKey = "885d1840d7317b9714d75ddf95394c91";
 */

var url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=hulk&apikey=885d1840d7317b9714d75ddf95394c91&ts=1589417013197&hash=010ae61dd7043c0aa0c1b9e5d8311b05`;
var search = "";
export default class FetchHero extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentWillMount() {
    axios.get(url).then((response) => {
      this.setState({ data: response.data.data.results });
      console.log(response.data.data.results);
    });
  }

  updateInfo() {
    const endpoint =
      "https://gateway.marvel.com/v1/public/characters?nameStartsWith";
    let ts = Date.now();
    const publicKey = "885d1840d7317b9714d75ddf95394c91";
    const privateKey = "b6bffb21bf3fff3490c292dcd5ebb00629bab60f";
    const convert = ts + privateKey + publicKey;
    let hash = MD5(convert);

    /* var url2 = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&apikey=885d1840d7317b9714d75ddf95394c91&ts=1589417013197&hash=010ae61dd7043c0aa0c1b9e5d8311b05`; */
    var url2 = `${endpoint}=${search}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    axios.get(url2).then((response) => {
      this.setState({ data: response.data.data.results });
      console.log(response.data.data.results);
    });
    console.log(url2);
  }

  handleChange(event) {
    search = event.target.value;
    console.log(search);
  }
  clear = () => {
    this.setState({
      data: [],
    });
  };

  render() {
    return (
      <div className="o-father">
        <div className="o-bar">
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              onChange={this.handleChange}
              id="search-input"
              placeholder="Search a hero..."
            />
            <button onClick={this.updateInfo}>buscar</button>
            <button
              onClick={() => {
                this.clear([]);
              }}
            >
              Limpiar
            </button>

            <i className="fa fa-search search-icon" />
          </label>
        </div>
        <ul className="o-big-one">
          {this.state.data.map((hero) => (
            <div className="o-images">
              <li>{hero.name}</li>
              <div className="o-thumbnail">
                <img
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
