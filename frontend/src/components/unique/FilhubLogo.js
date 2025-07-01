import React from "react";
import {Image} from "react-native";

export default function FilhubLogo() {
    return (
        <Image
        source={require("../../../assets/logo-navbar.png")}
        style={{ height: '20%', width: "65%", paddingHorizontal: "38%", paddingTop: "14%" }}
        resizeMode="contain"
      />
    );
  }

