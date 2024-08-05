declare module 'react-native-snap-carousel' {
  import * as React from 'react';
  import { ViewStyle, StyleProp, FlatListProps, ScrollViewProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

  export type CarouselLayout = 'default' | 'stack' | 'tinder';

  export interface CarouselProps<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
    data: T[];
    renderItem: (info: { item: T; index: number }) => React.ReactNode;
    itemWidth?: number;
    itemHeight?: number;
    sliderWidth: number;
    sliderHeight?: number;
    activeSlideAlignment?: 'start' | 'center' | 'end';
    activeSlideOffset?: number;
    apparitionDelay?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    callbackOffsetMargin?: number;
    containerCustomStyle?: StyleProp<ViewStyle>;
    contentContainerCustomStyle?: StyleProp<ViewStyle>;
    enableMomentum?: boolean;
    enableSnap?: boolean;
    firstItem?: number;
    hasParallaxImages?: boolean;
    inactiveSlideOpacity?: number;
    inactiveSlideScale?: number;
    inactiveSlideShift?: number;
    layout?: CarouselLayout;
    layoutCardOffset?: number;
    lockScrollTimeoutDuration?: number;
    lockScrollWhileSnapping?: boolean;
    loop?: boolean;
    loopClonesPerSide?: number;
    scrollEnabled?: boolean;
    scrollInterpolator?: () => void;
    slideInterpolatedStyle?: () => void;
    slideStyle?: StyleProp<ViewStyle>;
    snapOnAndroid?: boolean;
    swipeThreshold?: number;
    useScrollView?: boolean | ((props: ScrollViewProps) => React.ReactNode);
    vertical?: boolean;
    onBeforeSnapToItem?: (index: number) => void;
    onSnapToItem?: (index: number) => void;
    onScrollIndexChanged?: (index: number) => void;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    onTouchStart?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onTouchEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  }

  export default class Carousel<T> extends React.Component<CarouselProps<T>> {}
}
