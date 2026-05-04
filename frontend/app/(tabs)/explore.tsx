import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DESTINATIONS = [
  {
    country: 'Zambia',
    flag: '🇿🇲',
    currency: 'ZMW',
    rail: 'M-Pesa',
    status: 'live',
    description: 'Pay at markets, supermarkets, taxis and restaurants across Lusaka.',
    tip: 'Tip: All major merchants in Lusaka accept M-Pesa QR codes.',
    emoji: '🌍',
  },
  {
    country: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    rail: 'M-Pesa',
    status: 'live',
    description: 'Seamless payments across Nairobi and Mombasa using Lipa na M-Pesa.',
    tip: 'Tip: Most Kenyan matatus and boda bodas accept M-Pesa.',
    emoji: '🦁',
  },
  {
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    rail: 'UPI',
    status: 'coming_soon',
    description: 'Pay via UPI at over 300 million merchants nationwide.',
    tip: 'Coming in Phase 2 — sign up for early access.',
    emoji: '🕌',
  },
  {
    country: 'Tanzania',
    flag: '🇹🇿',
    currency: 'TZS',
    rail: 'M-Pesa',
    status: 'coming_soon',
    description: 'Pay in Dar es Salaam and Zanzibar using Lipa Bila Namba.',
    tip: 'Coming in Phase 2 — sign up for early access.',
    emoji: '🏔️',
  },
  {
    country: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    rail: 'MTN MoMo',
    status: 'coming_soon',
    description: 'Transact in Accra and Kumasi using MTN Mobile Money.',
    tip: 'Coming in Phase 2 — sign up for early access.',
    emoji: '🌴',
  },
];

const TRAVEL_TIPS = [
  {
    icon: 'shield-check-outline' as keyof typeof MaterialCommunityIcons.glyphMap,
    color: Colors.success,
    bg: Colors.successBg,
    title: 'No data roaming needed',
    body: 'Ping works over Wi-Fi. Connect to hotel or café Wi-Fi to pay anywhere.',
  },
  {
    icon: 'credit-card-outline' as keyof typeof MaterialCommunityIcons.glyphMap,
    color: Colors.brandLight,
    bg: '#EBF4FF',
    title: 'No local bank account',
    body: 'Your home debit or credit card funds every payment. No new accounts ever.',
  },
  {
    icon: 'lock-outline' as keyof typeof MaterialCommunityIcons.glyphMap,
    color: '#7C3AED',
    bg: '#F3F0FF',
    title: 'Rate locked at confirmation',
    body: 'The exchange rate shown is the rate you get — locked the moment you confirm.',
  },
  {
    icon: 'clock-fast' as keyof typeof MaterialCommunityIcons.glyphMap,
    color: Colors.warning,
    bg: Colors.warningBg,
    title: 'Payments arrive in under 30s',
    body: 'M-Pesa transactions are near-instant. Merchants see the credit immediately.',
  },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* App bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Explore</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Pay like you belong!</Text>
          <Text style={styles.heroSubtitle}>
            The bridge between global money and local payments.
          </Text>
        </View>

        {/* Destinations */}
        <Text style={styles.sectionTitle}>Supported Destinations</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsRow}
        >
          {DESTINATIONS.map(d => (
            <TouchableOpacity
              key={d.country}
              id={`explore-dest-${d.country.toLowerCase()}`}
              style={[styles.destCard, d.status === 'coming_soon' && styles.destCardDimmed]}
              activeOpacity={0.8}
              onPress={() => router.push('/network')}
            >
              <Text style={styles.destEmoji}>{d.flag}</Text>
              <Text style={styles.destCountry}>{d.country}</Text>
              <View style={[
                styles.destRailTag,
                d.status === 'coming_soon' && styles.destRailTagSoon
              ]}>
                <Text style={[
                  styles.destRailText,
                  d.status === 'coming_soon' && styles.destRailTextSoon
                ]}>
                  {d.status === 'live' ? d.rail : 'Soon'}
                </Text>
              </View>
              <Text style={styles.destDesc} numberOfLines={2}>{d.description}</Text>
              <Text style={styles.destTip}>{d.tip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Travel Tips */}
        <Text style={styles.sectionTitle}>Tips for travelers</Text>
        <View style={styles.tipsGrid}>
          {TRAVEL_TIPS.map(tip => (
            <View key={tip.title} style={styles.tipCard}>
              <View style={[styles.tipIcon, { backgroundColor: tip.bg }]}>
                <MaterialCommunityIcons name={tip.icon} size={22} color={tip.color} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipBody}>{tip.body}</Text>
            </View>
          ))}
        </View>

        {/* How it works */}
        <Text style={styles.sectionTitle}>How Ping works</Text>
        <View style={styles.stepsCard}>
          {[
            { n: '1', title: 'Link your card', body: 'Connect your home debit or credit card once during setup.', icon: 'credit-card-outline' },
            { n: '2', title: 'Choose a destination', body: 'Ping detects your location and selects the right payment rail.', icon: 'map-marker-outline' },
            { n: '3', title: 'Scan or enter number', body: 'Scan the merchant QR code or type their M-Pesa number.', icon: 'qrcode-scan' },
            { n: '4', title: 'Confirm & pay', body: 'Review the converted amount and fees. One tap to confirm.', icon: 'check-circle-outline' },
          ].map((step, i, arr) => (
            <View key={step.n}>
              <View style={styles.stepRow}>
                <View style={styles.stepNumberWrap}>
                  <Text style={styles.stepNumber}>{step.n}</Text>
                </View>
                <View style={styles.stepBody}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepBodyText}>{step.body}</Text>
                </View>
                <MaterialCommunityIcons
                  name={step.icon as any}
                  size={20}
                  color={Colors.brandLight}
                />
              </View>
              {i < arr.length - 1 && <View style={styles.stepDivider} />}
            </View>
          ))}
        </View>

        {/* Why Ping Wins */}
        <Text style={styles.sectionTitle}>Why Ping Wins</Text>
        <View style={styles.comparisonCard}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonHeaderLabel}>Feature</Text>
            <Text style={styles.comparisonHeaderLabel}>Venmo</Text>
            <Text style={styles.comparisonHeaderLabel}>Ping</Text>
          </View>
          {[
            { label: 'No US Phone Needed', venmo: false, ping: true },
            { label: 'No US Bank Required', venmo: false, ping: true },
            { label: 'No App for Receiver', venmo: false, ping: true },
            { label: 'Traveler Focused', venmo: false, ping: true },
          ].map((item, i) => (
            <View key={i} style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>{item.label}</Text>
              <View style={styles.comparisonCell}>
                <MaterialCommunityIcons 
                  name={item.venmo ? "check-circle" : "close-circle"} 
                  size={18} 
                  color={item.venmo ? Colors.success : Colors.error} 
                />
              </View>
              <View style={styles.comparisonCell}>
                <MaterialCommunityIcons 
                  name={item.ping ? "check-circle" : "close-circle"} 
                  size={18} 
                  color={item.ping ? Colors.success : Colors.error} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Our Story */}
        <Text style={styles.sectionTitle}>Our Story</Text>
        <View style={styles.storyCard}>
          <Text style={styles.storyTitle}>Ithaca, 2023 — Where it all began</Text>
          <Text style={styles.storyBody}>
            "Everyone could Venmo. Except me. No U.S. number. No local bank account. No access to the apps my friends used."
          </Text>
          <Text style={styles.storyBody}>
            That night, we realized: travelers aren't just foreign, they're invisible in the local digital payment ecosystem. Ping was built to change that.
          </Text>
        </View>

        {/* Team */}
        <Text style={styles.sectionTitle}>The Team</Text>
        <View style={styles.teamGrid}>
          {[
            { name: 'Luipa Mondoka', role: 'Founder', bio: 'Zambian-born investment professional with 15 years experience.', icon: 'account-tie' },
            { name: 'Marco Yammine', role: 'CTO', bio: 'Italian-born seasoned full-stack engineer and software architect.', icon: 'code-braces' },
          ].map(member => (
            <View key={member.name} style={styles.teamCard}>
              <View style={styles.teamHeader}>
                <MaterialCommunityIcons name={member.icon as any} size={24} color={Colors.brand} />
                <View>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                </View>
              </View>
              <Text style={styles.teamBio}>{member.bio}</Text>
            </View>
          ))}
        </View>

        {/* CTA Banner */}
        <View style={styles.ctaBanner}>
          <View>
            <Text style={styles.ctaBannerTitle}>Ready to travel?</Text>
            <Text style={styles.ctaBannerSubtitle}>Check live exchange rates before you go.</Text>
          </View>
          <TouchableOpacity
            id="explore-rates-btn"
            style={styles.ctaBannerBtn}
            onPress={() => router.push('/rates')}
          >
            <Text style={styles.ctaBannerBtnText}>See Rates</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
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
  appBar: {
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appBarTitle: { ...Typography.h2, color: Colors.textPrimary },

  scroll: { paddingBottom: Spacing.xxl },

  hero: {
    backgroundColor: Colors.brand,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    marginTop: Spacing.sm,
    lineHeight: 22,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  // Destinations horizontal scroll
  destinationsRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    paddingRight: Spacing.xxl,
  },
  destCard: {
    width: 200,
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  destCardDimmed: { opacity: 0.7 },
  destEmoji: { fontSize: 28 },
  destCountry: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  destRailTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.full,
  },
  destRailTagSoon: { backgroundColor: Colors.bgSubtle },
  destRailText: { fontSize: 11, fontWeight: '700', color: Colors.success },
  destRailTextSoon: { color: Colors.textMuted },
  destDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  destTip: { fontSize: 11, color: Colors.textMuted, fontStyle: 'italic', marginTop: 2 },

  // Tips grid
  tipsGrid: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  tipCard: {
    width: '47%',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  tipIcon: {
    width: 44, height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tipTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  tipBody: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },

  // Steps card
  stepsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  stepNumberWrap: {
    width: 30, height: 30,
    borderRadius: 15,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: { fontSize: 14, fontWeight: '800', color: '#fff' },
  stepBody: { flex: 1 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  stepBodyText: { fontSize: 13, color: Colors.textSecondary, marginTop: 1 },
  stepDivider: { height: 1, backgroundColor: Colors.border, marginLeft: 46 },

  // CTA banner
  ctaBanner: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.brand,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaBannerTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  ctaBannerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  ctaBannerBtn: {
    backgroundColor: '#fff',
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  ctaBannerBtnText: { fontSize: 14, fontWeight: '700', color: Colors.brand },

  // New Sections
  comparisonCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  comparisonHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  comparisonHeaderLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  comparisonLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  comparisonCell: {
    flex: 1,
    alignItems: 'center',
  },

  storyCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: '#F8FAFC',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.brand,
  },
  storyBody: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  teamGrid: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  teamCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  teamRole: {
    fontSize: 12,
    color: Colors.brandLight,
    fontWeight: '600',
  },
  teamBio: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
