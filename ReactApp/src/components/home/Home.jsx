import React from 'react';
import Counter from '../Counter';
import { Parent } from '../ParentComponent';

const HomePage = () => {
    return (<div>
        <h1>Redux Counter Example</h1>
        <Counter />
        <Parent />
    </div>);
}

export default HomePage;