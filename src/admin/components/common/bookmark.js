import React, { useState, useEffect, useCallback } from 'react';
import { Star } from 'react-feather';
import { MENUITEMS } from '../../constant/menu';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';

const Bookmark = () => {
    const mainmenu = MENUITEMS;
    const tooltipOpen = false;
    const [openSearch, setOpenSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(false);
    const [bookmarkItems, setBookmarkItems] = useState([]);
    // eslint-disable-next-line
    const [targetName, setTargetName] = useState('');

    const toggle = targetName => {
        if (!targetName) {
            setTargetName({
                ...targetName,
                targetName: {
                    tooltipOpen: true
                }
            });
        } else {
            setTargetName({
                ...targetName,
                targetName: {
                    tooltipOpen: !targetName.tooltipOpen
                }
            });
        }
    };

    const escFunction = useCallback((event) => {
        // eslint-disable-next-line
        if (event.keyCode == 27) {
            //Do whatever when esc is pressed
            setSearchValue('')
            setSearchResult([])
            setOpenSearch(false)
            document.querySelector(".filled-bookmark").classList.remove('is-open');
            document.querySelector(".page-wrapper").classList.remove("offcanvas-bookmark");
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        mainmenu.filter(menuItems => {
            if (menuItems.bookmark) {
                setBookmarkItems(bookmarkItems => [...bookmarkItems, menuItems])
            }
            return 0;
        });

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction , mainmenu]);

    const handleSearchKeyword = (keyword) => {

        keyword ? addFix() : removeFix()
        const items = [];
        setSearchValue(keyword)
        // eslint-disable-next-line
        mainmenu.filter(menuItems => {
            if (menuItems.title.toLowerCase().includes(keyword) && menuItems.type === 'link') {
                items.push(menuItems);
            }
            if (!menuItems.children) return false
            // eslint-disable-next-line
            menuItems.children.filter(subItems => {
                if (subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link') {
                    subItems.icon = menuItems.icon
                    items.push(subItems);
                }
                if (!subItems.children) return false
                // eslint-disable-next-line
                subItems.children.filter(suSubItems => {
                    if (suSubItems.title.toLowerCase().includes(keyword)) {
                        suSubItems.icon = menuItems.icon
                        items.push(suSubItems);
                    }
                })
            })
            checkSearchResultEmpty(items)
            setSearchResult(items);
        });
    }

    const checkSearchResultEmpty = (items) => {
        if (!items.length) {
            document.querySelector(".empty-bookmark").classList.add('is-open');

        } else {
            document.querySelector(".empty-bookmark").classList.remove('is-open');
        }
    }

    const addFix = () => {
        document.querySelector(".filled-bookmark").classList.add('is-open');
        document.querySelector(".page-wrapper").classList.add("offcanvas-bookmark");
    }

    const removeFix = () => {
        setSearchValue('')
        setSearchResult([])
        document.querySelector(".filled-bookmark").classList.remove('is-open');
        document.querySelector(".page-wrapper").classList.remove("offcanvas-bookmark");
    }

    const addToBookmark = (event, items) => {
        const index = bookmarkItems.indexOf(items);
        // eslint-disable-next-line
        if (index == -1 && !items.bookmark) {
            items.bookmark = true;
            event.currentTarget.classList.add('starred');
            setBookmarkItems([...bookmarkItems, items])
        } else {
            event.currentTarget.classList.remove('starred');
            bookmarkItems.splice(index, 1);
            setBookmarkItems(bookmarkItems)
            items.bookmark = false;
        }
    }

    const removeOffcanvas = () => {
        if (openSearch) {
            setSearchValue('')
            setSearchResult([])
            document.querySelector(".filled-bookmark").classList.remove('is-open');
            document.querySelector(".page-wrapper").classList.remove("offcanvas-bookmark");
        }
        setOpenSearch(!openSearch)
    }

    return (
        <div>
            <div className="col">
                <div className="bookmark pull-right">
                    <ul>
                        {
                            bookmarkItems.map((items, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`${process.env.PUBLIC_URL}${items.path}`} className="realname">
                                            <items.icon id={`${items[index]}`} />
                                            <Tooltip placement="top" isOpen={tooltipOpen} target={`${items[index]}`} toggle={() => toggle(`${items[index]}`)}>
                                                {items.title}
                                            </Tooltip>
                                        </Link>
                                    </li>
                                )
                            })}

                        <li>
                         {/* eslint-disable-next-line */}
                         <a href="#" onClick={removeOffcanvas}>
                                <Star className="bookmark-search" />
                            </a>
                            <form className="form-inline search-form">
                                <div className={`form-group form-control-search ${openSearch ? 'open' : ''}`}>
                                    <input
                                        className="form-control-plaintext "
                                        type="text"
                                        placeholder="search"
                                        value={searchValue}
                                        onChange={(e) => handleSearchKeyword(e.target.value)}
                                    />
                                    <div className="Typeahead-menu filled-bookmark custom-scrollbar" id="search-outer">
                                        {searchValue ?
                                            searchResult.map((data, index) => {
                                                return (
                                                    <div className="ProfileCard u-cf" key={index}>
                                                        <div className="ProfileCard-avatar">
                                                            <data.icon />
                                                        </div>
                                                        <div className="ProfileCard-details">
                                                            <div className="ProfileCard-realName">
                                                                <Link to={`${process.env.PUBLIC_URL}${data.path}`} className="realname" onClick={() => removeFix()}>
                                                                    {data.title}
                                                                </Link>
                                                                <span className="pull-right">
                                                                    <a href="##">
                                                                        <i className="fa fa-star-o mt-1 icon-star" onClick={(e) => addToBookmark(e, data)}></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : ''}
                                    </div>
                                    <div className="Typeahead-menu empty-bookmark">
                                        <div className="tt-dataset tt-dataset-0">
                                            <div className="EmptyMessage">
                                                Opps!! There are no result found.
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;