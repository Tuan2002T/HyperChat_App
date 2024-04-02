import React, {useRef, useMemo, useEffect} from 'react';
import {View, Animated, Dimensions, StyleSheet} from 'react-native';
import SvgIcons from '../../assets/SvgIcons';

const {width, height} = Dimensions.get('window');
const circleWidth = width / 2;

const AnimatedCircle = () => {
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const animation = useMemo(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            delay: 100,
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: 500,
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
  }, []);

  useEffect(() => {
    animation.start();
    return () => {
      animation.stop();
    };
  }, [animation]);

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: height / 3,
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: textOpacity,
        }}>
        <SvgIcons name="logo" width={circleWidth} height={circleWidth} />
      </Animated.View>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: exhale,
        }}>
        <SvgIcons name="logo" width={circleWidth} height={circleWidth} />
      </Animated.View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });
        return (
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: 'black',
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFill,
              transform: [
                {
                  rotateZ: rotation,
                },
                {translateX: translate},
                {translateY: translate},
              ],
            }}></Animated.View>
        );
      })}
    </View>
  );
};

export default AnimatedCircle;
