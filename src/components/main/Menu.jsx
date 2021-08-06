import React from 'react'
import '../main/menu.css'
export default function Menu({filterItem}) {
    
    return (
        <>
            <div className="col-2" id="menu-main">
                <div className="row">
                    <button type="button" className="btn active" onClick={() => filterItem('all', 0)}>All</button>
                </div>
                <div className="row menu-btn mt-2">
                    <button type="button" className="btn" onClick={() => filterItem(true, 1)}>Peer Cases</button>
                </div>
                <div className="row menu-btn mt-2">
                    <button type="button" className="btn" onClick={() => filterItem(false, 2)}>Practice Cases</button>
                </div>
                
            </div>
        </>
    )
}
