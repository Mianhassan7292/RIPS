import { FaHome, FaWarehouse, FaBoxOpen, FaShoppingCart, FaRegListAlt, FaUsers, FaBuilding, FaUser, FaSignOutAlt } from 'react-icons/fa';

export const routes=[
    {
        title: "Dashboard",
        path: "/",
        icon: <FaHome />,
      },
      {
        title: "Inventory",
        path: "/inventory",
        icon: <FaWarehouse />,
      },
      {
        title: "Available Stock",
        path: "/available-stock",
        icon: <FaBoxOpen />,
      },
      {
        title: "Purchase Item",
        path: "/purchase-item",
        icon: <FaShoppingCart />,
      },
      {
        title: "Request Item",
        path: "/request-item",
        icon: <FaRegListAlt />,
      },
     
      {
        title: "Departments",
        path: "/departments",
        icon: <FaBuilding />,
      },
      {
        title: "Sellers",
        path: "/sellers",
        icon: <FaUsers />,
      },
      {
        title: "Profile",
        path: "/profile",
        icon: <FaUser />,
        
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <FaSignOutAlt/>,
       
      },
]