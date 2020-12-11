import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { MENUITEMS } from '../../../constant/menu';
import { Link } from 'react-router-dom';
import { Search } from 'react-feather';

const SearchHeader = () => {
    const mainmenu = MENUITEMS;

    const [searchValue, setsearchValue] = useState('');
    const [searchOpen, setsearchOpen] = useState(false);

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            setsearchOpen(false)
            setsearchValue('')
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    });

    const handleSearchKeyword = (keyword) => {
        keyword ? addFix() : removeFix()
        const items = [];
        setsearchValue(keyword)
        // eslint-disable-next-line
        mainmenu.filter(menuItems => {
            if (menuItems.title.toLowerCase().includes(keyword) && menuItems.type === 'link') {
                items.push(menuItems);
            }
            if (!menuItems.children) return false
            // eslint-disable-next-line
            menuItems.children.filter(subItems => {
                // eslint-disable-next-line
                if (subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link') {
                    subItems.icon = menuItems.icon
                    items.push(subItems);
                    // eslint-disable-next-line
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
            setsearchValue(items);
        });
    }

    const checkSearchResultEmpty = (items) => {
        if (!items.length) {
            document.querySelector(".empty-menu").classList.add('is-open');
        } else {
            document.querySelector(".empty-menu").classList.remove('is-open');
        }
    }

    const addFix = () => {
        document.querySelector(".Typeahead-menu").classList.add('is-open');
        document.body.classList.add("offcanvas");
    }

    const removeFix = () => {
        setsearchValue('')
        document.querySelector(".Typeahead-menu").classList.remove('is-open');
        document.body.classList.remove("offcanvas");
    }

    const toggleBtn = () => {
        if (searchOpen) {
            setsearchOpen(!searchOpen);
            document.querySelector('.searchIcon').classList.add('open');
        } else {
            setsearchOpen(!searchOpen);
            document.querySelector('.searchIcon').classList.remove('open');
        }
    }


    return (
        <Fragment>
            <div>
                <form className="form-inline search-form">
                    <div className="form-group">
                        <input
                            className="form-control-plaintext searchIcon"
                            type="text"
                            placeholder="search"
                            defaultValue={searchValue}
                            onChange={(e) => handleSearchKeyword(e.target.value)}
                        />
                        <span className="d-sm-none mobile-search" onClick={toggleBtn}>
                            <Search />
                        </span>

                        <div className="Typeahead-menu custom-scrollbar" id="search-outer">
                            {searchValue ?
                                searchValue.map((data, index) => {
                                    return (
                                        <div className="ProfileCard u-cf" key={index}>
                                            <div className="ProfileCard-avatar">
                                                <data.icon />
                                            </div>
                                            <div className="ProfileCard-details">
                                                <div className="ProfileCard-realName">
                                                    <Link
                                                        to={`${process.env.PUBLIC_URL}${data.path}`}
                                                        className="realname"
                                                        onClick={removeFix}
                                                    >
                                                        {data.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                        <div className="Typeahead-menu empty-menu">
                            <div className="tt-dataset tt-dataset-0">
                                <div className="EmptyMessage">
                                    Opps!! There are no result found.
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default SearchHeader;