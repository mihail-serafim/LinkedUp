import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'

import spacemap0 from '../../assets/spacemap0.png'
import spacemap1 from '../../assets/spacemap1.png'
import spacemap2 from '../../assets/spacemap2.png'
import spacemap3 from '../../assets/spacemap3.png'
import spacemap4 from '../../assets/spacemap4.png'

var sectionStyle = (picture) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url(${picture})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  });


function SpaceMap(props) {
    const { numberOfRelays } = props

    // remove bottom two blocks and use number of relays instead of Val
    const [val, setVal] = useState(0)
    const incrementVal = () => {
        if (val == 4) {
            setVal(0)
        } else {
            setVal((val) => val + 1)
        }
    }
    
    let pictures = [spacemap0, spacemap1, spacemap2, spacemap3, spacemap4]
    let picture = pictures[val] // replace with numberOfRelays

    return (
        <>
            <Row style={{ height: '640px' }}>
                <section style={ sectionStyle(picture) }>
                    <button onClick={() => incrementVal()}>Increment</button>
                </section>
            </Row>
            <div style={{ width: 0}}> {/* Code just for loading pics and no render flash */}
                {pictures.map((picture) => <section style={ sectionStyle(picture) }></section>)}
            </div>
        </>
    );
}

export { SpaceMap }