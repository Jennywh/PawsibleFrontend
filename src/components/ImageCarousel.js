import React, { useRef, useState } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const images = [require('../../assets/andrew.jpeg'), require('../../assets/sammy.png')];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={true}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.4
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.4
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.4,
    resizeMode: 'cover'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)'
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});

export default ImageCarousel;
