import React from "react";
import "../App.css";

export function Square({value, chooseSquare}){
    return (
        <div className="square" onClick={chooseSquare}>
            {value}
        </div>
    )
}