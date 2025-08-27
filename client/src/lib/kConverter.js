import React from 'react'

const kConverter = (num) => {
    if (num < 1000) return num;
    else {
        return (num / 1000).toFixed(1) + 'k';
    }
}

export default kConverter

