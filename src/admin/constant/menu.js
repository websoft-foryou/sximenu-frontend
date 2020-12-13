import { Home, DollarSign, Settings, Server, Edit, Layers } from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', path: '/admin/dashboard', icon: Home, type: 'link'
    },
    {
        title: 'Data', icon: Server, type: 'sub', badgeType: 'primary', children: [
            { path: '/admin/category', title: 'Category', type: 'link' },
            { path: '/admin/product', title: 'Product', type: 'link' },
            { path: '/admin/restuarant', title: 'Restaurant Info', type: 'link' },
        ]
    },
    {
        title: 'History', path: '/admin/history', icon: Layers, type: 'link'
    },

    {
        title: 'Analytics', icon: Edit, type: 'sub', active: false, children: [
            { path: '/admin/user_analytics', title: 'User', type: 'link' },
            { path: '/admin/income_analytics', title: 'Income ', type: 'link' },
            // { path: '/admin/touch_analytics', title: 'Touch Analytics', type: 'link' },
        ]
    },
    {
        title: 'Membership', path: '/admin/membership', icon: DollarSign, type: 'link'
    },
    {
        title: 'Settings', icon: Settings, type: 'sub', active: false, children: [
            { path: '/admin/email_setting', title: 'Email Setting', type: 'link' },
            { path: '/admin/password_setting', title: 'Password Setting', type: 'link' },
            { path: '/admin/payment_setting', title: 'Payment Setting', type: 'link' },
        ]
    }
]
