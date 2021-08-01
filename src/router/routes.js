// import Home from "@/pages/Home";
const Home = () => import("@/pages/Home");
// import Search from "@/pages/Search";
const Search = () => import("@/pages/Search");
// import Login from "@/pages/Login";
const Login = () => import("@/pages/Login");
// import Register from "@/pages/Register";
const Register = () => import("@/pages/Register");
// import Detail from "@/pages/Detail";
const Detail = () => import("@/pages/Detail");
// import AddCart from "@/pages/AddCart";
const AddCart = () => import("@/pages/AddCart");
// import Cart from "@/pages/Cart";
const Cart = () => import("@/pages/Cart");
// import Pay from "@/pages/Pay";
const Pay = () => import("@/pages/Pay");
// import PaySuccess from "@/pages/PaySuccess";
const PaySuccess = () => import("@/pages/PaySuccess");
// import Trade from "@/pages/Trade";
const Trade = () => import("@/pages/Trade");
// import Order from "@/pages/Order";
const Order = () => import("@/pages/Order");
// import MyOrder from "@/pages/Order/MyOrder";
const MyOrder = () => import("@/pages/Order/MyOrder");
// import GroupOrder from "@/pages/Order/GroupOrder";
const GroupOrder = () => import("@/pages/Order/GroupOrder");

// import from 这种方式引入组件，在打包的时候将会把所有的组件全部打包到一个包中，当调用某一个组件时，必须加载整个包
// 这样的方式效率太低，使用路由懒加载可以将每一个组件单独打包成一个函数，当用户第一次使用这个组件的时候才会调用这个函数，
// 加载函数对应的组件，当再次使用这个组件时不会重新加载，因为已经加载好了

export default [
  {
    path: "/order",
    component: Order,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade" || from.path === "/paysuccess") {
        next();
      } else {
        if (sessionStorage.getItem("REFRESH_VALUE")) {
          next();
        } else {
          next("/");
        }
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay" || from.path === "/order") {
        next();
      } else {
        if (sessionStorage.getItem("REFRESH_VALUE")) {
          next();
        } else {
          next(false);
        }
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === "/cart" || from.path === "/pay") {
        next();
      } else {
        if (sessionStorage.getItem("REFRESH_VALUE")) {
          next();
        } else {
          next(false);
        }
      }
    },
  },
  {
    path: "/detail/:goodsId",
    component: Detail,
  },
  {
    path: "/cart",
    component: Cart,
    name: "cart",
  },
  {
    path: "/addcart",
    component: AddCart,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum;
      let shopInfo = sessionStorage.getItem("SHOP_INFO");
      if (skuNum && shopInfo) {
        next();
      } else {
        next(false);
      }
    },
  },
  { path: "/home", component: Home },
  {
    path: "/search/:keyword?",
    component: Search,
    name: "search",
    meta: {
      isNav: false,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHidden: true,
    },
  },
  { path: "/", component: Home },
  {
    path: "/communication",
    component: () => import("@/pages/Communication/Communication"),
    children: [
      {
        path: "event",
        component: () => import("@/pages/Communication/EventTest/EventTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "model",
        component: () => import("@/pages/Communication/ModelTest/ModelTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "sync",
        component: () => import("@/pages/Communication/SyncTest/SyncTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "attrs-listeners",
        component: () =>
          import("@/pages/Communication/AttrsListenersTest/AttrsListenersTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "children-parent",
        component: () =>
          import("@/pages/Communication/ChildrenParentTest/ChildrenParentTest"),
        meta: {
          isHideFooter: true,
        },
      },
      {
        path: "scope-slot",
        component: () =>
          import("@/pages/Communication/ScopeSlotTest/ScopeSlotTest"),
        meta: {
          isHideFooter: true,
        },
      },
    ],
  },
];
