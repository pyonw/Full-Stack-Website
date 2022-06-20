import React, { useState } from 'react';
import { Link } from "react-router-dom";

export const navigation = ({}) => {
    return (
        <nav>
            <h1>SwoleData</h1>
            <p>Keep track of your workout</p>
            <footer>2022 Woo Pyon</footer>
        <Link className ="home" to="/">HomePage</Link>
        <Link to="/create-exercise">Create Exercise</Link>
    </nav>
    );
}

export default navigation;