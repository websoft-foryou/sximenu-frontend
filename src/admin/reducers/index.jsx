import { combineReducers } from 'redux';
import TodoApp from './todos.reducer';
import EmailApp from './email.reducer';
import ChatApp from './chat.reducer';
import EcommerceApp from './ecommerce.reducer';
import WishlistApp from './wishlist.reducer';
import Filters from './filters.reducer';
import Customizer from './customizer.reducer';

const reducers = combineReducers({
    TodoApp,
    EmailApp,
    ChatApp,
    data: EcommerceApp,
    WishlistApp,
    filters: Filters,
    Customizer
});

export default reducers;