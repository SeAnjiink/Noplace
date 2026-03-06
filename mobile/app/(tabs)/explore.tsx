import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

const moodCategories = [
  { id: '1', name: '3AM Thoughts', icon: '🌙', desc: 'Pikiran larut malam' },
  { id: '2', name: 'Existential', icon: '🌌', desc: 'Berat & melankolis' },
  { id: '3', name: 'Soft Energy', icon: '💙', desc: 'Lembut & damai' },
  { id: '4', name: 'Chaos Energy', icon: '🔥', desc: 'Kekacauan & lucu' },
  { id: '5', name: 'Romanticizing', icon: '✨', desc: 'Idealisasi hidup' },
  { id: '6', name: 'Delulu Era', icon: '🎭', desc: 'Imaginery content' },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore by Mood</Text>
          <Text style={styles.subtitle}>Bukan trending. Hanya vibes.</Text>
        </View>

        {/* Mood Grid */}
        <View style={styles.grid}>
          {moodCategories.map((mood) => (
            <Pressable key={mood.id} style={styles.moodCard}>
              <Text style={styles.moodIcon}>{mood.icon}</Text>
              <Text style={styles.moodName}>{mood.name}</Text>
              <Text style={styles.moodDesc}>{mood.desc}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#808080',
    marginTop: 4,
  },
  grid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderColor: '#c71585',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  moodIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c71585',
    marginBottom: 4,
  },
  moodDesc: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'center',
  },
});
