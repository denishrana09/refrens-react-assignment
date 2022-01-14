import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "react-click-outside-hook";
import axios from "axios";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";

import { useDebounce } from "../hooks/debounceHook";
import {
  placeholderText,
  containerVariants,
  containerTransition,
  dummyResponse,
} from "../constant";
import { Card } from "../card";

export const SearchInput = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [noUsersData, setNoUsersData] = useState(false);

  const isEmpty = !usersData || usersData.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoUsersData(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoUsersData(false);
    setUsersData([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const searchTvShow = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoUsersData(false);

    const test = await axios.get("/api").catch((err) => {
      console.log("Error: ", err);
    });
    console.log(test)

    const response = dummyResponse;
    if (response) {
      console.log("Response: ", response.data);
      if (response.data && response.data.length === 0) setNoUsersData(true);

      setUsersData(response.data);
    }
    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchTvShow);

  return (
    <motion.div
      className="search-bar-container"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <div className="search-input-container">
        <span className="search-icon">
          <IoSearch />
        </span>
        <input
          className="search-input"
          placeholder={placeholderText}
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="close-icon"
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isExpanded && <div className="line-separator" />}
      {isExpanded && (
        <div className="search-content">
          {isLoading && (
            <div className="loading-wrapper">
              <MoonLoader loading color="#000" size={20} />
            </div>
          )}
          {!isLoading && isEmpty && !noUsersData && (
            <div className="loading-wrapper">
              <span className="warning-message">Start typing to Search</span>
            </div>
          )}
          {!isLoading && noUsersData && (
            <div className="loading-wrapper">
              <span className="warning-message">
                No Tv Shows or Series found!
              </span>
            </div>
          )}
          {!isLoading && !isEmpty && (
            <>
              {usersData.map((user) => (
                <Card key={user.id} name={user.name} address={user.address} />
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};
