import React, { useMemo, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ChartContext, { useGenerateValues } from '../../helpers/ChartContext';

export default function ChartPathProvider({ data: providedData, children }) {
  const values = useGenerateValues();
  const proceededData = useSharedValue(null);
  const isActive = useSharedValue(false);
  const dotStyle = useAnimatedStyle(
    () => ({
      opacity: values.dotScale.value,
      transform: [
        { translateX: values.positionX.value },
        { translateY: values.positionY.value + 10 }, // TODO temporary fix for clipped chart
        { scale: values.dotScale.value },
      ],
    }),
    []
  );

  const currentPositionVerticalLineStyle = useAnimatedStyle(
    () => ({
      opacity: values.dotScale.value,
      transform: [{ translateX: values.positionX.value }],
    }),
    []
  );

  const openingPositionHorizontalLineStyle = useAnimatedStyle(() => {
    return {
      opacity: proceededData == null ? 0 : 1,
      transform: [
        {
          translateY: withTiming(
            proceededData?.value?.[0].y * values?.layoutSize?.value?.height +
              10 || 0
          ),
        },
      ],
    };
  }, [proceededData]);

  const [contextReanimatedValue, setContextValue] = useState({});
  const contextValue = useMemo(
    () => ({
      isActive,
      dotStyle,
      currentPositionVerticalLineStyle,
      openingPositionHorizontalLineStyle,
      ...values,
      ...contextReanimatedValue,
      providedData,
      proceededData,
      setContextValue,
    }),
    [
      isActive,
      dotStyle,
      currentPositionVerticalLineStyle,
      openingPositionHorizontalLineStyle,
      values,
      contextReanimatedValue,
      providedData,
      proceededData,
    ]
  );

  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
}
