import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView,
  Dimensions, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Step = {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  badge: string;
};

const STEPS: Step[] = [
  {
    id: 'identity',
    icon: 'face-recognition',
    title: 'Identity Verification',
    description: 'A quick scan of your ID and a 3D selfie to secure your account.',
    badge: 'Secure',
  },
  {
    id: 'card',
    icon: 'credit-card-plus-outline',
    title: 'Funding Source',
    description: 'Link your primary card. We use bank-grade encryption to protect your data.',
    badge: 'Required',
  },
];

export default function KYCScreen() {
  const router = useRouter();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allDone = STEPS.every(s => completed.has(s.id));
  const progress = (completed.size / STEPS.length);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heading}>Final Steps</Text>
          <Text style={styles.subheading}>
            Help us verify your identity to unlock international payments and higher limits.
          </Text>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Setup Progress</Text>
            <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[Colors.brand, Colors.brandLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.remainingText}>
            {completed.size === STEPS.length 
              ? 'Ready to go!' 
              : `${STEPS.length - completed.size} step${STEPS.length - completed.size > 1 ? 's' : ''} remaining`}
          </Text>
        </View>

        {/* Steps List */}
        <View style={styles.stepList}>
          {STEPS.map((step, index) => {
            const isDone = completed.has(step.id);
            return (
              <TouchableOpacity
                key={step.id}
                style={[styles.stepCard, isDone && styles.stepCardDone]}
                onPress={() => toggle(step.id)}
                activeOpacity={0.9}
              >
                <View style={[styles.iconBox, isDone && styles.iconBoxDone]}>
                  <MaterialCommunityIcons
                    name={isDone ? 'check-bold' : step.icon}
                    size={26}
                    color={isDone ? '#fff' : Colors.brand}
                  />
                </View>
                
                <View style={styles.stepContent}>
                  <View style={styles.stepHeaderRow}>
                    <Text style={[styles.stepTitle, isDone && styles.stepTitleDone]}>
                      {step.title}
                    </Text>
                    <View style={[styles.badge, isDone && styles.badgeDone]}>
                      <Text style={[styles.badgeText, isDone && styles.badgeTextDone]}>
                        {isDone ? 'COMPLETED' : step.badge}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                </View>

                {!isDone && (
                  <View style={styles.arrowBox}>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security Notice */}
        <LinearGradient
          colors={['#F8FAFC', '#F1F5F9']}
          style={styles.securityBanner}
        >
          <MaterialCommunityIcons name="shield-lock" size={24} color={Colors.brand} />
          <View style={styles.securityTextContent}>
            <Text style={styles.securityTitle}>Bank-Grade Security</Text>
            <Text style={styles.securityDesc}>
              Your data is encrypted using AES-256 and never shared with third parties.
            </Text>
          </View>
        </LinearGradient>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.ctaBtn, !allDone && styles.ctaBtnDisabled]}
          onPress={() => router.replace('/(tabs)')}
          disabled={!allDone}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={allDone ? [Colors.brand, Colors.brandLight] : [Colors.bgSubtle, Colors.bgSubtle]}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.ctaText, !allDone && styles.ctaTextDisabled]}>
              Start Using Ping
            </Text>
            <MaterialCommunityIcons 
              name="rocket-launch" 
              size={20} 
              color={allDone ? "#fff" : Colors.textMuted} 
            />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.bgWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
    opacity: 0.8,
  },
  progressCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  percentText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.brand,
  },
  progressTrack: {
    height: 10,
    backgroundColor: Colors.bgBase,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  remainingText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  stepList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  stepCardDone: {
    borderColor: Colors.success,
    backgroundColor: '#F0FDF4',
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  iconBoxDone: {
    backgroundColor: Colors.success,
  },
  stepContent: {
    flex: 1,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stepTitleDone: {
    color: Colors.success,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeDone: {
    backgroundColor: Colors.success,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  badgeTextDone: {
    color: '#fff',
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    opacity: 0.7,
  },
  arrowBox: {
    marginLeft: 8,
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radii.lg,
    marginBottom: Spacing.xl,
    gap: 16,
  },
  securityTextContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  securityDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    opacity: 0.8,
  },
  ctaBtn: {
    height: 60,
    borderRadius: Radii.full,
    overflow: 'hidden',
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaBtnDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  ctaTextDisabled: {
    color: Colors.textMuted,
  },
});
