import React, { useContext } from 'react';
import Animated from 'react-native-reanimated';
import { Svg, Line } from 'react-native-svg';
import ChartContext from '../../helpers/ChartContext';
import withReanimatedFallback from '../../helpers/withReanimatedFallback';

function ChartLineFactory(orientation) {
  const isVertical = orientation == 'vertical';
  return function ChartLine({
    color = '#000000',
    thickness = 2,
    length,
    ...props
  }) {
    const {
      currentPositionVerticalLineStyle,
      openingPositionHorizontalLineStyle,
    } = useContext(ChartContext);
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          isVertical
            ? currentPositionVerticalLineStyle
            : openingPositionHorizontalLineStyle,
          {
            height: isVertical ? length + 20 : thickness,
            position: 'absolute',
            left: 0,
            top: 0,
            width: isVertical ? thickness : length,
            zIndex: -1,
          },
        ]}
      >
        <Svg>
          <Line
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={10}
            x1={0}
            y1={0}
            x2={isVertical ? 0 : length}
            y2={isVertical ? length + 20 : 0}
            {...props}
          />
        </Svg>
      </Animated.View>
    );
  };
}

export const CurrentPositionVerticalLine = withReanimatedFallback(
  ChartLineFactory('vertical')
);
export const OpeningPositionHorizontalLine = withReanimatedFallback(
  ChartLineFactory('horizontal')
);
