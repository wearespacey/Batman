import React, { useState } from 'react';
import BoxLocation from 'models/boxLocation';

function PopupDetailsPage(props: BoxLocation) {
    const[box, setBox] = useState(props);
    return (
        <h1>{box.siteName}</h1>
    );
}

export default PopupDetailsPage;