import {FiHome, FiLogOut, FiCoffee, FiSettings} from "react-icons/fi";

const navItems = [
  {
    id: 1,
    text: 'Dashboard',
    url: '/admin',
    icon: FiHome,
    hasSubItems: false
  },
  {
    id: 2,
    text: 'Restaurant Owner',
    icon: FiCoffee,
    hasSubItems: true,
    subItems: {
      isOpen: false,
      items: [
        {
          id: 1,
          text: 'Add Restaurant Owner',
          url: '/admin/restaurant-owner/add'
        },
        {
          id: 2,
          text: 'Restaurant Owner List',
          url: '/admin/restaurant-owner-list'
        }
      ]
    }
  },
  /*{
    id: 3,
    text: 'Menu',
    icon: FiList,
    hasSubItems: true,
    subItems: {
      isOpen: false,
      items: [
        {
          id: 1,
          text: 'Add Menu',
          url: '/admin/menu/add'
        },
        {
          id: 2,
          text: 'Menu List',
          url: '/admin/menu-list'
        }
      ]
    }
  },
  {
    id: 4,
    text: 'Product',
    icon: FiFeather,
    hasSubItems: true,
    subItems: {
      isOpen: false,
      items: [
        {
          id: 1,
          text: 'Add Product',
          url: '/admin/product/add'
        },
        {
          id: 2,
          text: 'Product List',
          url: '/admin/product-list'
        }
      ]
    }
  },*/
  {
    id: 6,
    text: 'Settings',
    url: '#',
    icon: FiSettings,
    hasSubItems: false
  },
  {
    id: 7,
    text: 'Logout',
    url: '/admin/login',
    icon: FiLogOut,
    hasSubItems: false
  }
];

export default navItems;