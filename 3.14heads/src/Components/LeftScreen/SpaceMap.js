import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import spacemap00 from '../../assets/spacemap0-0.png'
import spacemap0e from '../../assets/spacemap0-e.png'
import spacemap0m from '../../assets/spacemap0-m.png'
import spacemap0s from '../../assets/spacemap0-s.png'
import spacemap10 from '../../assets/spacemap1-0.png'
import spacemap1e from '../../assets/spacemap1-e.png'
import spacemap1m from '../../assets/spacemap1-m.png'
import spacemap1s from '../../assets/spacemap1-s.png'
import spacemap20 from '../../assets/spacemap2-0.png'
import spacemap2e from '../../assets/spacemap2-e.png'
import spacemap2m from '../../assets/spacemap2-m.png'
import spacemap2s from '../../assets/spacemap2-s.png'
import spacemap40 from '../../assets/spacemap4-0.png'
import spacemap4e from '../../assets/spacemap4-e.png'
import spacemap4m from '../../assets/spacemap4-m.png'
import spacemap4s from '../../assets/spacemap4-s.png'
import spacemap30 from '../../assets/spacemap3-0.png'
import spacemap3e from '../../assets/spacemap3-e.png'
import spacemap3m from '../../assets/spacemap3-m.png'
import spacemap3s from '../../assets/spacemap3-s.png'

var sectionStyle = (picture) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url(${picture})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  });


function SpaceMap(props) {
    const { numberOfRelays, linkMarginEM, linkMarginME } = props

    let lasersIndex // not actual number of laser
    if (linkMarginEM === '' || linkMarginEM === 'N/A') {
        lasersIndex = 0
    } else if (linkMarginEM <= 0) {
        lasersIndex = 1
    } else if (linkMarginME <= 0) {
        lasersIndex = 2
    } else {
        lasersIndex = 3
    }

    let pictures = [
        [spacemap00, spacemap0e, spacemap0m, spacemap0s],
        [spacemap10, spacemap1e, spacemap1m, spacemap1s],
        [spacemap20, spacemap2e, spacemap2m, spacemap2s],
        [spacemap30, spacemap3e, spacemap3m, spacemap3s],
        [spacemap40, spacemap4e, spacemap4m, spacemap4s],
    ]

    let picture = pictures[numberOfRelays][lasersIndex] // replace with numberOfRelays

    return (
        <>
            <Row style={{ height: '640px' }}>
                <section style={ sectionStyle(picture) }>
                </section>
            </Row>
            <div style={{ width: 0}}> {/* Code just for loading pics and no render flash */}
                {[...pictures[0], ...pictures[1], ...pictures[2], ...pictures[3]].map((picture) => 
                    <section style={ sectionStyle(picture) }></section>
                )}
            </div>
        </>
    );
}

export { SpaceMap }