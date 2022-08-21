import React, { useEffect, useState } from "react";
import "./style.css";
import { Avatar, Badge, Drawer } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { getUserCart } from "../../../redux/actions/cart";
import CartContent from "./carcontent";
import { useDispatch, useSelector } from "react-redux";

const CartButton = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const showDrawer = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserCart);
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <Badge count={count}>
        <Avatar
          shape="square"
          size="small"
          icon={<ShoppingCartOutlined />}
          style={{
            backgroundColor: "black",
          }}
        />
      </Badge>
      <button className="CustomerSigninButton" onClick={showDrawer}>
        Cart
      </button>
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        width={500}
        visible={visible}
      >
        <CartContent />
      </Drawer>
    </div>
  );
};

export default CartButton;
