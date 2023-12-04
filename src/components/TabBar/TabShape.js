import { line } from "d3-shape";
import React, { useMemo } from "react";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { CONSTANTS } from "../../constants/constants";
const { NAVIGATION_BOTTOM_TABS_HEIGHT } = CONSTANTS;
const { width: wWidth } = Dimensions.get("window");
const lineGenerator = line()
    .x(({ x }) => x)
    .y(({ y }) => y);

function TabsShape({ tabWidth }) {
    const d = useMemo(() => {
        const left = lineGenerator([
            { x: 0, y: 0 },
            { x: tabWidth * 2, y: 0 },
        ]);
        const right = lineGenerator([
            { x: tabWidth * 3, y: 0 },
            { x: wWidth, y: 0 },
            { x: wWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
            { x: 0, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
            { x: 0, y: 0 },
        ]);

        return `${left} ${right}`;
    }, [tabWidth]);

    return (
        <Svg width={wWidth} {...{ height: NAVIGATION_BOTTOM_TABS_HEIGHT }}>
            <Path fill="#F2F5FC" {...{ d }} />
        </Svg>
    );
}

export default TabsShape;
