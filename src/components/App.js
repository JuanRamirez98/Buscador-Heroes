import React from "react";
import axios from "axios";

const endpoint =  "https://gateway.marvel.com/v1/public/characters?nameStartsWith";
let ts = Date.now();
const publicKey = "885d1840d7317b9714d75ddf95394c91";


export default class FetchHero extends React.Component {
  
  constructor() {
    super();
    this.state = {
     
      url:
        "https://gateway.marvel.com/v1/public/characters?nameStartsWith=hulk&apikey=885d1840d7317b9714d75ddf95394c91&ts=1589417013197&hash=010ae61dd7043c0aa0c1b9e5d8311b05",
      data: [],
    };
  }

  componentWillMount() {
    axios.get(this.state.url).then((response) => {
      this.setState({ data: response.data.data.results });
      console.log(response.data.data.results);
    });
  }

  render() {
    return (
      <ul>
        <label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value=""
						id="search-input"
						placeholder="Search..."
					/>
					<i className="fa fa-search search-icon"/>
				</label>
        {this.state.data.map((hero) => (
          <div>
            <li>{hero.name}</li>
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
          </div>
        ))}
      </ul>
    );
  }
}
