import { ReactNode } from "react";
import MenuBar from "./MenuBar/MenuBar";

interface IProp {
    children: ReactNode
}

const Layout = ({children}: IProp) => {
    return (    <div>
        <MenuBar/>
        <div className="container px-5 py-5">
         {children}
        </div>
       
      </div>)
}

export default Layout;