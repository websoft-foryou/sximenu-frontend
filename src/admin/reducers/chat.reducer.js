import {
    GET_MEMBERS,
    GET_MEMBERS_SUCCESS,
    GET_CHATS,
    GET_CHATS_SUCCESS,
    SEARCH_MEMBER,
    CHANGE_CHAT,
    CREATE_CHAT,
    SEND_MESSAGE,
    UPDATE_STATUS,
    UPDATE_SELECTED_USER,
    REPLY_BY_SELECTED_USER
} from '../constant/actionTypes';

import contactsData from '../data/chat/chatMember'
import chatsData from "../data/chat/chat.chats.json";

const initial_state = {
    allMembers: null,
    members: null,
    chats: chatsData,
    error: '',
    searchKeyword: '',
    loading: false,
    currentUser: null,
    selectedUser: null,
    online: true,
    updateSelectedUser: null
};

export default (state = initial_state, action) => {
    switch (action.type) {

        case GET_MEMBERS:
            return { ...state, loading: true };

        case GET_MEMBERS_SUCCESS:
            const members = contactsData;
            const currentUser = members[0];
            return { ...state, loading: false, allMembers: members, members: members, currentUser: currentUser };

        case GET_CHATS:
            return { ...state, loading: true };

        case GET_CHATS_SUCCESS:
            return { ...state, loading: false, chats: action.payload.chats, selectedUser: state.allMembers.find(x => x.id === action.payload.selectedUser) };

        case UPDATE_SELECTED_USER:
            return { ...state, updateSelectedUser: state.allMembers.find(x => x.id === action.payload.selectedUser) }

        case CHANGE_CHAT:
            return { ...state, selectedUser: state.allMembers.find(x => x.id === action.payload) };

        case SEARCH_MEMBER:
            if (action.payload === '') {
                return { ...state, members: state.allMembers };
            } else {
                const keyword = action.payload.toLowerCase();
                const searchedMembers = state.allMembers.filter((member) => member.name.toLowerCase().indexOf(keyword) > -1);
                return { ...state, members: searchedMembers }
            }

        case SEND_MESSAGE:
            return { ...state };

        case REPLY_BY_SELECTED_USER:
            return { ...state };

        case CREATE_CHAT:
            return { ...state };

        case UPDATE_STATUS:
            return { ...state, currentUser: { ...state.currentUser, status: action.payload } };

        default: return { ...state };
    }
}
