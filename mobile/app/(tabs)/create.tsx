import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { Image, Send } from 'lucide-react-native';

const energyOptions = [
  { id: 'soft', label: 'Soft', emoji: '💙' },
  { id: 'chaos', label: 'Chaos', emoji: '🔥' },
  { id: 'sadcore', label: 'Sadcore', emoji: '📍' },
  { id: 'villain', label: 'Villain Arc', emoji: '👑' },
  { id: 'healing', label: 'Healing', emoji: '🌿' },
  { id: 'overthinking', label: 'Overthinking', emoji: '🌀' },
];

export default function CreateScreen() {
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [selectedEnergy, setSelectedEnergy] = useState('soft');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Apa yang ada di pikiran kamu?</Text>
        </View>

        {/* Post Type Selector */}
        <View style={styles.typeSelector}>
          {[
            { id: 'text', label: 'Mood Text', icon: '✍️' },
            { id: 'photo', label: 'Blur Photo', icon: '📸' },
            { id: 'audio', label: 'Audio', icon: '🎤' },
            { id: 'poll', label: 'Poll', icon: '🗳️' },
          ].map((type) => (
            <Pressable
              key={type.id}
              style={[
                styles.typeBtn,
                postType === type.id && styles.typeBtn_active,
              ]}
              onPress={() => setPostType(type.id)}
            >
              <Text style={styles.typeIcon}>{type.icon}</Text>
              <Text style={styles.typeLabel}>{type.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Content Input */}
        <TextInput
          style={styles.textarea}
          placeholder="Tulis tanpa takut dinilai..."
          placeholderTextColor="#808080"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={6}
        />

        {/* Energy Selector */}
        <View style={styles.energySection}>
          <Text style={styles.sectionLabel}>Energi postingan ini?</Text>
          <View style={styles.energyGrid}>
            {energyOptions.map((energy) => (
              <Pressable
                key={energy.id}
                style={[
                  styles.energyBtn,
                  selectedEnergy === energy.id && styles.energyBtn_active,
                ]}
                onPress={() => setSelectedEnergy(energy.id)}
              >
                <Text style={styles.energyEmoji}>{energy.emoji}</Text>
                <Text style={styles.energyLabel}>{energy.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Post Options */}
        <View style={styles.optionsSection}>
          <Pressable style={styles.optionBtn}>
            <Image size={20} color="#b0b0b0" />
            <Text style={styles.optionLabel}>Anonim?</Text>
          </Pressable>
          <Pressable style={styles.optionBtn}>
            <Text style={styles.optionIcon}>🔒</Text>
            <Text style={styles.optionLabel}>Hanya teman?</Text>
          </Pressable>
        </View>

        {/* Submit Button */}
        <Pressable style={styles.submitBtn}>
          <Send size={20} color="#ffffff" />
          <Text style={styles.submitText}>Post ke NoPlace</Text>
        </Pressable>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  typeBtn_active: {
    borderColor: '#c71585',
    backgroundColor: '#c71585',
  },
  typeIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  textarea: {
    backgroundColor: '#1a1a1a',
    borderColor: '#c71585',
    borderWidth: 1,
    borderRadius: 8,
    color: '#ffffff',
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  energySection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c71585',
    marginBottom: 12,
  },
  energyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  energyBtn: {
    flex: 1,
    minWidth: '18%',
    backgroundColor: '#1a1a1a',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  energyBtn_active: {
    borderColor: '#00ffff',
    backgroundColor: '#00ffff',
  },
  energyEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  energyLabel: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  optionsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  optionBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  optionIcon: {
    fontSize: 18,
  },
  optionLabel: {
    fontSize: 13,
    color: '#ffffff',
  },
  submitBtn: {
    backgroundColor: '#c71585',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
