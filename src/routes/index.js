import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContex";
import { View } from "react-native";
import Auth from "./Auth";
import NoAuth from "./NoAuth";

function index() {
  const { signed } = useContext(AuthContext);

  return signed ? <Auth /> : <NoAuth />;
}

export default index;
