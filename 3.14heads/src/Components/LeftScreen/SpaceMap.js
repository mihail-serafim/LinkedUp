import React from 'react';
import { Row, Col } from 'react-bootstrap'
import spacemap from '../../assets/spacemap.png'

var sectionStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${spacemap})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

// Turn this function in the one that hold relays
function Sometext({ heightRatio, children }) {
    return <><div style={{ height: `${heightRatio * 60 + 15}%` }}>
    </div>
    <div className="text-white text-center">{children}</div></>
}

function SpaceMap(props) {
    const { numberOfRelays } = props
    
    // narrows down col to needed ones
    let activeCols
    if (numberOfRelays == 1) {
        activeCols = [1]
    } else if (numberOfRelays == 2) {
        activeCols = [1, 2]
    } else if (numberOfRelays == 3) {
        activeCols = [0, 1, 2]
    } else if (numberOfRelays >= 4) { // capping number of cols at 4
        activeCols = [0, 1, 2, 3]
    }
    
    const coloumns = [1, 2, 3, 4].map((v,i) => // making all the middle cols
    <Col sm={2} style={{ height: '100%' }}>
        {activeCols.includes(i) && <Sometext heightRatio={(4 - (i + 1))/4} key={i}>
            Blah
        </Sometext>}
    </Col>)

    return (
        <section style={ sectionStyle }>
            <Row style={{ height: '100%' }}>
                <Col sm={2}></Col>
                    {coloumns}
                <Col sm={2}></Col>
            </Row>
        </section>
      );
}

export { SpaceMap }