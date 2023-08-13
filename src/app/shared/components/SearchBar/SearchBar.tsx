import { FiFilter, FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.scss";
import { useState } from "react";

interface SearchBarProps {

    placeHolder: string
}

export default function SearchBar(props: SearchBarProps){
    const iconSize = 42;
    const [search, setSearch ] = useState<string>("");

    return <div className={styles.searchBar}>
        <input 
            type="search" 
            placeholder={props.placeHolder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}/>
        <FiSearch 
            className={styles.searchBar__icons} 
            size={iconSize} color="white"
            onClick={() => console.log(search)}/>
        <FiFilter 
            className={styles.searchBar__icons} 
            size={iconSize} color="white"/>
    </div>;
}