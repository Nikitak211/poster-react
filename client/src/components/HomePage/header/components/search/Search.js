
import './search.css'

const Search = (props) => {

    return ( 
        <li>
            <input onChange={e => props.setSearching(e.target.value)} type="search" className="search_bar" placeholder="search posts"></input>
        </li>
     );
}
 
export default Search;