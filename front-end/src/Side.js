import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
export const Side = [
  {
    title: "Home",
    path: "/Home",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Dashbord",
    path: "/Dashbord",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Add",
    path: "/Ajout",
    icon: <FaIcons.FaCartPlus />,
  },

  {
    title: "search",
    path: "/Recherche",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
