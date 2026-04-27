import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const isValid = email.includes('@') && phone.length >= 7;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.container} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with Gradient Logo */}
          <View style={styles.headerSection}>
            <LinearGradient
              colors={[Colors.brand, Colors.brandLight]}
              style={styles.logoBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>P</Text>
            </LinearGradient>
            <Text style={styles.logoWordmark}>Ping</Text>
          </View>

          {/* Hero Copy */}
          <View style={styles.heroSection}>
            <Text style={styles.heading}>Welcome to Ping</Text>
            <Text style={styles.subheading}>
              Connect to the world's payment ecosystems in seconds.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={[styles.inputWrapper, emailFocused && styles.inputWrapperFocused]}>
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={20} 
                  color={emailFocused ? Colors.brandLight : Colors.textMuted} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={[styles.inputWrapper, phoneFocused && styles.inputWrapperFocused]}>
                <View style={styles.countrySelector}>
                  <Text style={styles.flag}>🇲🇽</Text>
                  <Text style={styles.prefix}>+52</Text>
                </View>
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="55 1234 5678"
                  placeholderTextColor={Colors.textMuted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => phoneFocused(true)}
                  onBlur={() => phoneFocused(false)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, !isValid && styles.buttonDisabled]}
              onPress={() => router.push('/(auth)/kyc')}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isValid ? [Colors.brand, Colors.brandLight] : [Colors.bgSubtle, Colors.bgSubtle]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.buttonText, !isValid && styles.buttonTextDisabled]}>
                  Create Free Account
                </Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color={isValid ? "#fff" : Colors.textMuted} />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.separatorRow}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>or continue with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <MaterialCommunityIcons name="google" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <MaterialCommunityIcons name="apple" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.linkText}>Sign In</Text>
            </Text>
            <Text style={styles.legalText}>
              By joining, you agree to our <Text style={styles.legalLink}>Terms</Text> and <Text style={styles.legalLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  logoWordmark: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
    opacity: 0.8,
  },
  formContainer: {
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.md,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: Colors.brandLight,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 20,
  },
  prefix: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
    marginHorizontal: 12,
  },
  primaryButton: {
    height: 60,
    borderRadius: Radii.full,
    overflow: 'hidden',
    marginTop: Spacing.sm,
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  buttonTextDisabled: {
    color: Colors.textMuted,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    opacity: 0.5,
  },
  separatorText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  socialBtn: {
    flex: 1,
    height: 56,
    borderRadius: Radii.md,
    backgroundColor: Colors.bgWhite,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  linkText: {
    color: Colors.brandLight,
    fontWeight: '700',
  },
  legalText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  legalLink: {
    color: Colors.textSecondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
