import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RateItem = {
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
  rail: string;
  rate: string;
  mid: string;
  fee: string;
  trend: 'up' | 'down' | 'flat';
  trendPct: string;
};

const RATES: RateItem[] = [
  {
    from: 'USD', fromFlag: '🇺🇸', to: 'ZMW', toFlag: '🇿🇲',
    rail: 'M-Pesa Zambia', rate: '23.08', mid: '23.12',
    fee: '0.6%', trend: 'up', trendPct: '+0.3%',
  },
  {
    from: 'USD', fromFlag: '🇺🇸', to: 'KES', toFlag: '🇰🇪',
    rail: 'M-Pesa Kenya', rate: '129.50', mid: '129.80',
    fee: '0.6%', trend: 'down', trendPct: '-0.2%',
  },
  {
    from: 'USD', fromFlag: '🇺🇸', to: 'INR', toFlag: '🇮🇳',
    rail: 'UPI (Phase 2)', rate: '83.74', mid: '83.90',
    fee: '0.6%', trend: 'flat', trendPct: '0.0%',
  },
  {
    from: 'USD', fromFlag: '🇺🇸', to: 'TZS', toFlag: '🇹🇿',
    rail: 'M-Pesa Tanzania', rate: '2,580', mid: '2,590',
    fee: '0.6%', trend: 'up', trendPct: '+0.6%',
  },
  {
    from: 'USD', fromFlag: '🇺🇸', to: 'GHS', toFlag: '🇬🇭',
    rail: 'MTN MoMo (Phase 2)', rate: '15.28', mid: '15.35',
    fee: '0.6%', trend: 'down', trendPct: '-0.1%',
  },
];

const TREND_ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  up: 'trending-up',
  down: 'trending-down',
  flat: 'minus',
};

const TREND_COLORS: Record<string, string> = {
  up: Colors.success,
  down: Colors.error,
  flat: Colors.textMuted,
};

export default function RatesScreen() {
  const [selected, setSelected] = useState('USD');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>

        {/* Info banner */}
        <View style={styles.banner}>
          <MaterialCommunityIcons name="information-outline" size={16} color={Colors.brandLight} />
          <Text style={styles.bannerText}>
            Ping rates include a small fee. Mid-market rate shown for reference.
            Rates update every 60 seconds.
          </Text>
        </View>

        {/* Last updated */}
        <View style={styles.updateRow}>
          <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.updateText}>Last updated: Today, 1:34 PM</Text>
        </View>

        {/* Rate cards */}
        <Text style={styles.sectionTitle}>Supported Corridors</Text>

        {RATES.map((item, i) => (
          <View key={i} style={styles.rateCard}>
            {/* Pair header */}
            <View style={styles.rateHeader}>
              <View style={styles.pairRow}>
                <Text style={styles.flag}>{item.fromFlag}</Text>
                <Text style={styles.currency}>{item.from}</Text>
                <MaterialCommunityIcons name="arrow-right" size={16} color={Colors.textMuted} style={{ marginHorizontal: 4 }} />
                <Text style={styles.flag}>{item.toFlag}</Text>
                <Text style={styles.currency}>{item.to}</Text>
              </View>
              <View style={[
                styles.railTag,
                item.rail.includes('Phase') && styles.railTagComingSoon,
              ]}>
                <Text style={[
                  styles.railTagText,
                  item.rail.includes('Phase') && styles.railTagComingSoonText,
                ]}>
                  {item.rail.includes('Phase') ? 'Coming Soon' : 'Live'}
                </Text>
              </View>
            </View>

            {/* Rail name */}
            <Text style={styles.railName}>{item.rail}</Text>

            {/* Rate row */}
            <View style={styles.rateRow}>
              <View>
                <Text style={styles.rateLabel}>Ping rate</Text>
                <Text style={styles.rateValue}>1 {item.from} = {item.rate} {item.to}</Text>
              </View>
              <View style={styles.trendContainer}>
                <MaterialCommunityIcons
                  name={TREND_ICONS[item.trend]}
                  size={18}
                  color={TREND_COLORS[item.trend]}
                />
                <Text style={[styles.trendText, { color: TREND_COLORS[item.trend] }]}>
                  {item.trendPct}
                </Text>
              </View>
            </View>

            {/* Details */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Mid-market</Text>
                <Text style={styles.detailValue}>{item.mid}</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Transfer fee</Text>
                <Text style={styles.detailValue}>{item.fee}</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Arrival</Text>
                <Text style={styles.detailValue}>{'< 30s'}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <MaterialCommunityIcons name="shield-check-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.disclaimerText}>
            Exchange rates are indicative only. The exact rate is locked when you confirm a transfer.
            Ping charges no hidden fees beyond the displayed transfer fee.
          </Text>
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
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.md },

  banner: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: '#EBF4FF',
    borderRadius: Radii.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.brandLight,
  },
  bannerText: { flex: 1, fontSize: 13, color: Colors.brandLight, lineHeight: 19 },

  updateRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  updateText: { fontSize: 12, color: Colors.textMuted },

  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },

  rateCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  rateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pairRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  flag: { fontSize: 20 },
  currency: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  railTag: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radii.full,
  },
  railTagComingSoon: { backgroundColor: Colors.warningBg },
  railTagText: { fontSize: 11, fontWeight: '700', color: Colors.success },
  railTagComingSoonText: { color: Colors.warning },

  railName: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },

  rateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  rateLabel: { fontSize: 12, color: Colors.textMuted, marginBottom: 2 },
  rateValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  trendContainer: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  trendText: { fontSize: 13, fontWeight: '700' },

  detailsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radii.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  detailItem: { flex: 1, alignItems: 'center', gap: 2 },
  detailDivider: { width: 1, height: 28, backgroundColor: Colors.border },
  detailLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  detailValue: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },

  disclaimer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radii.md,
    marginTop: Spacing.sm,
  },
  disclaimerText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
});
