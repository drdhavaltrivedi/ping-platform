import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Animated, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDemo } from '../context/DemoContext';
import * as Haptics from 'expo-haptics';

export default function LoadMoneyModal() {
  const router = useRouter();
  const { loadMoney } = useDemo();
  const [amount, setAmount] = useState('5000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Hardcoded for demo: 5000 MXN -> 290 USD
  const exchangeRate = 0.058; // 1 MXN = 0.058 USD
  const fee = 0.00; // No fee for demo
  const parsedAmount = parseFloat(amount) || 0;
  const usdAmount = parsedAmount * exchangeRate - fee;

  const handleConfirm = async () => {
    if (parsedAmount <= 0) return;
    
    // Face ID simulation
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsProcessing(true);

    try {
      // Real Stripe API call to test mode
      const amountInCents = Math.round(parsedAmount * 100);
      const stripeSecretKey = process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY;
      
      if (!stripeSecretKey) {
        throw new Error('Stripe Secret Key is missing in environment variables.');
      }

      
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: amountInCents.toString(),
          currency: 'mxn',
          payment_method: 'pm_card_visa', // Standard test card
          confirm: 'true',
          description: 'Ping Investor Demo - Load Money',
          // Use this to help avoid redirect-based 3DS in some test scenarios
          'payment_method_options[card][request_three_d_secure]': 'any', 
          'automatic_payment_methods[enabled]': 'true',
          'automatic_payment_methods[allow_redirects]': 'never',
        }).toString(),
      });

      const data = await response.json();

      if (data.status === 'succeeded' || data.status === 'requires_action') {
        setIsProcessing(false);
        setIsSuccess(true);
        loadMoney(usdAmount);
        
        // Simulate Success Confetti
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          router.back();
        }, 1500);
      } else {
        throw new Error(data.error?.message || 'Payment failed');
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Stripe Error:', error);
      alert('Payment Failed: ' + error);
    }
  };

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, styles.centerAll]}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 16 }}>
            <Text style={{ fontSize: 60 }}>🎉</Text>
          </Animated.View>
          <MaterialCommunityIcons name="check-circle" size={80} color={Colors.success} />
          <Text style={styles.successTitle}>Load Successful!</Text>
          <Text style={styles.successSub}>${usdAmount.toFixed(2)} USD added to your wallet.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Load Money</Text>
        <View style={{ width: 24 }} />
      </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.label}>Amount to load (MXN)</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                autoFocus
              />
              <Text style={styles.currencySuffix}>MXN</Text>
            </View>

            <View style={styles.quoteCard}>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Exchange Rate</Text>
                <Text style={styles.quoteValue}>1 MXN = {exchangeRate} USD</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Fee</Text>
                <Text style={styles.quoteValue}>$0.00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabelTotal}>You receive</Text>
                <Text style={styles.quoteValueTotal}>${usdAmount.toFixed(2)} USD</Text>
              </View>
            </View>
          </View>
        </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          disabled={isProcessing || parsedAmount <= 0}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.btnContent}>
              <MaterialCommunityIcons name="face-recognition" size={20} color="#fff" />
              <Text style={styles.confirmBtnText}>Confirm with Face ID</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: Colors.bgBase,
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    backgroundColor: Colors.bgBase,
    width: '100%',
    maxWidth: 600,
  },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  centerAll: { justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.bgWhite,
  },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  content: { padding: Spacing.lg, flex: 1 },
  label: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8, fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  currencyPrefix: { fontSize: 24, color: Colors.textPrimary, fontWeight: '600', marginRight: 4 },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingVertical: Spacing.md,
  },
  currencySuffix: { fontSize: 16, color: Colors.textMuted, fontWeight: '600' },
  
  quoteCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  quoteLabel: { color: Colors.textSecondary, fontSize: 14 },
  quoteValue: { color: Colors.textPrimary, fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  quoteLabelTotal: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  quoteValueTotal: { color: Colors.brandLight, fontSize: 18, fontWeight: '800' },

  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    backgroundColor: Colors.bgWhite,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  confirmBtn: {
    backgroundColor: Colors.brandLight,
    paddingVertical: 18,
    borderRadius: Radii.xl,
    alignItems: 'center',
    shadowColor: Colors.brandLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  successTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  successSub: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  }
});
