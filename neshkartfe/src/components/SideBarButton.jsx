import React from "react";

const SideBarButton = (props) => {
    return (
        <>
            <button className="bg-blue-300 border h-10 w-4/5 m-2 border-blue-700 rounded-sm">{props.category}</button>
        </>
    )
}

export default SideBarButton;