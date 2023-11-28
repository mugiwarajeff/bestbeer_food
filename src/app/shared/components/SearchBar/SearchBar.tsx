import { FiFilter, FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.scss";
import { useState } from "react";
import { SetterOrUpdater } from "recoil";

interface SearchBarProps {
    value: string,
    setValue: SetterOrUpdater<string>
    placeHolder: string
}

export default function SearchBar(props: SearchBarProps) {
    const iconSize = 42;


    return <div className={styles.searchBar}>
        <input
            type="search"
            placeholder={props.placeHolder}
            value={props.value}
            onChange={(event) => props.setValue(event.target.value)} />
        <FiSearch
            className={styles.searchBar__icons}
            size={iconSize} color="white"
            onClick={() => console.log(props.value)} />
        <FiFilter
            className={styles.searchBar__icons}
            size={iconSize} color="white" />
    </div>;
}