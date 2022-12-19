import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div style={{ margin: '30px 0px', textAlign: 'center' }}>
            Search: <input value={filter || ''} onChange={(event) => setFilter(event.target.value)} />
        </div>
    )
}


export default GlobalFilter;