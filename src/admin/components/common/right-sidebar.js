import React from 'react';
import one from '../../assets/images/user/1.jpg';
import two from '../../assets/images/user/2.png';
import eight from '../../assets/images/user/8.jpg';
import four from '../../assets/images/user/4.jpg';
import five from '../../assets/images/user/5.jpg';
import six from '../../assets/images/user/6.jpg';
import seven from '../../assets/images/user/7.jpg';
import {Link} from 'react-router-dom'

const RightSidebar = () => {
        return (
            <div>
                <div className="right-sidebar" id="right_side_bar">
                    <div className="container p-0">
                        <div className="modal-header p-l-20 p-r-20">
                            <div className="col-sm-8 p-0">
                                <h6 className="modal-title font-weight-bold">FRIEND LIST</h6>
                            </div>
                            <div className="col-sm-4 text-right p-0"><i className="mr-2" data-feather="settings"></i></div>
                        </div>
                    </div>
                    <div className="friend-list-search mt-0">
                        <input type="text" placeholder="search friend" /><i className="fa fa-search"></i>
                    </div>
                    <div className="chat-box custom-scrollbar">
                        <div className="people-list friend-list">
                            <ul className="list">
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={one} alt="" />
                                        <div className="status-circle online"></div>
                                        <div className="about">
                                            <div className="name">Vincent Porter</div>
                                            <div className="status"> Online</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={two} alt="" />
                                        <div className="status-circle away"></div>
                                        <div className="about">
                                            <div className="name">Ain Chavez</div>
                                            <div className="status"> 28 minutes ago</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={eight} alt="" />
                                        <div className="status-circle online"></div>
                                        <div className="about">
                                            <div className="name">Kori Thomas</div>
                                            <div className="status"> Online</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={four} alt="" />
                                        <div className="status-circle online"></div>
                                        <div className="about">
                                            <div className="name">Erica Hughes</div>
                                            <div className="status"> Online</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={five} alt="" />
                                        <div className="status-circle offline"></div>
                                        <div className="about">
                                            <div className="name">Ginger Johnston</div>
                                            <div className="status"> 2 minutes ago</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={six} alt="" />
                                        <div className="status-circle away"></div>
                                        <div className="about">
                                            <div className="name">Prasanth Anand</div>
                                            <div className="status"> 2 hour ago</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="clearfix">
                                    <Link to="/chat-app/chat">
                                        <img className="rounded-circle user-image" src={seven} alt="" />
                                        <div className="status-circle online"></div>
                                        <div className="about">
                                            <div className="name">Hileri Jecno</div>
                                            <div className="status"> Online</div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default RightSidebar; 