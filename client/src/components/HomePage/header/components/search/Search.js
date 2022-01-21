import {useEffect} from 'react'

import './search.css'

const Search = (props) => {

    useEffect(() => {
      
    })
    return ( 
        <li>
            <input onChange={e => props.props.setSearch(e.target.value)} type="search" className="search_bar" placeholder="search posts"></input>
        </li>
     );
}
 
export default Search;