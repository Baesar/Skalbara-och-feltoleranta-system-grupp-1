import React from 'react'
import BoxBasic from "../Components/boxes/BoxBasic";
import BoxSystemProps from "../Components/boxes/BoxSystemProps";
const TestingGround = () => {
    return(
        <div>
            <BoxBasic content = "hello this is admin page" />
            <BoxSystemProps>
                nerds
            </BoxSystemProps>
        </div>
    )
}
export default TestingGround;