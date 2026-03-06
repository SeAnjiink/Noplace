import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Settings */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Your Universe</Text>
          <Pressable style={styles.settingsBtn}>
            <Settings size={22} color="#c71585" />
          </Pressable>
        </View>

        {/* Aura Card */}
        <View style={styles.auraCard}>
          <View style={styles.auraGradient} />
          <Text style={styles.auraLabel}>Your Digital Aura</Text>
          <Text style={styles.auraValue}>Soft Chaos™</Text>
          <Text style={styles.auraDesc}>A blend of tenderness and beautiful mess</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatBox label="Journal Streak" value="42 days" emoji="🔥" />
          <StatBox label="Energy Badge" value="Rising" emoji="📈" />
          <StatBox label="Mood Cycle" value="Balanced" emoji="⚖️" />
        </View>

        {/* Mood Pattern */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pola Emosi</Text>
          <View style={styles.moodChart}>
            <MoodBar label="Soft" percent={65} />
            <MoodBar label="Chaos" percent={45} />
            <MoodBar label="Overthinking" percent={78} />
            <MoodBar label="Healing" percent={52} />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <Pressable style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🌙</Text>
            <View>
              <Text style={styles.actionTitle}>Disappear Mode</Text>
              <Text style={styles.actionDesc}>Sembunyikan akun 7 hari</Text>
            </View>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🔐</Text>
            <View>
              <Text style={styles.actionTitle}>Private Universe</Text>
              <Text style={styles.actionDesc}>Ruang eksklusif teman</Text>
            </View>
          </Pressable>

          <Pressable style={styles.logoutBtn}>
            <LogOut size={18} color="#ff006e" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function StatBox({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MoodBar({ label, percent }: { label: string; percent: number }) {
  return (
    <View style={styles.moodBarContainer}>
      <Text style={styles.moodBarLabel}>{label}</Text>
      <View style={styles.moodBarTrack}>
        <View
          style={[
            styles.moodBarFill,
            {
              width: `${percent}%`,
              backgroundColor:
                percent > 70
                  ? '#ff006e'
                  : percent > 40
                    ? '#c71585'
                    : '#00ffff',
            },
          ]}
        />
      </View>
      <Text style={styles.moodBarPercent}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    paddingTop: 8,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#c71585',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsBtn: {
    padding: 8,
  },
  auraCard: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#1a1a1a',
    borderColor: '#c71585',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  auraGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#c71585',
    opacity: 0.1,
  },
  auraLabel: {
    fontSize: 12,
    color: '#808080',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  auraValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
  },
  auraDesc: {
    fontSize: 13,
    color: '#b0b0b0',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderColor: '#00ffff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#808080',
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  moodChart: {
    gap: 12,
  },
  moodBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodBarLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    width: 60,
  },
  moodBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moodBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  moodBarPercent: {
    fontSize: 11,
    color: '#808080',
    width: 35,
    textAlign: 'right',
  },
  actionSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderColor: '#c71585',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  actionDesc: {
    fontSize: 12,
    color: '#808080',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff006e',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
