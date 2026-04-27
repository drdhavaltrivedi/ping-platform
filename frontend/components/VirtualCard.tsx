import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Radii } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import demoData from '../constants/demo-data.json';

const { width } = Dimensions.get('window');

export default function VirtualCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.container}>
      <Animated.View style={[styles.card, styles.cardFront, { transform: [{ rotateY: frontInterpolate }], opacity: frontOpacity }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardBrand}>Ping</Text>
          <MaterialCommunityIcons name="contactless-payment" size={24} color="#fff" />
        </View>
        <View style={styles.chipContainer}>
          <MaterialCommunityIcons name="integrated-circuit-chip" size={36} color="#FFEAA7" />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.cardHolder}>LUIPA MONDOKA</Text>
          <MaterialCommunityIcons name="cc-visa" size={40} color="#fff" />
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }], opacity: backOpacity }]}>
        <View style={styles.magStripe} />
        <View style={styles.cvvStrip}>
          <Text style={styles.cvvText}>CVV {demoData.cvv}</Text>
        </View>
        <View style={styles.backDetails}>
          <Text style={styles.cardNumber}>{demoData.pan}</Text>
          <Text style={styles.cardExpiry}>EXP {demoData.expMonth.toString().padStart(2, '0')}/{demoData.expYear.toString().slice(-2)}</Text>
        </View>
        <View style={styles.cardFooterBack}>
           <MaterialCommunityIcons name="cc-visa" size={32} color="#fff" />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 200,
    alignSelf: 'center',
    marginVertical: 16,
    perspective: 1000,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: Radii.xl,
    padding: 24,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: Colors.brand,
    justifyContent: 'space-between',
  },
  cardBack: {
    backgroundColor: '#1E293B',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  chipContainer: {
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardHolder: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  magStripe: {
    backgroundColor: '#000',
    height: 40,
    width: '120%',
    marginLeft: -24,
    marginTop: 10,
  },
  cvvStrip: {
    backgroundColor: '#cbd5e1',
    height: 30,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  cvvText: {
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  backDetails: {
    marginTop: 16,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: 4,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cardFooterBack: {
    position: 'absolute',
    bottom: 16,
    right: 24,
  }
});
