import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';

const mockPosts = [
  {
    id: '1',
    author: 'Anonymous',
    content: 'it\'s 3am and i\'m thinking about everything i said today',
    energy: 'overthinking',
    reactions: { relate: 234, tooReal: 145, chaos: 32 },
    blur: false,
  },
  {
    id: '2',
    author: 'Hidden Soul',
    content: 'depression is not a personality trait but bestie the way i romanticize it',
    energy: 'chaos',
    reactions: { relate: 567, tooReal: 321, mainChar: 89 },
    blur: false,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>NoPlace</Text>
        <Text style={styles.tagline}>Nobody is watching</Text>
      </View>

      {/* Feed */}
      <FlatList
        data={mockPosts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.energy}>#{item.energy}</Text>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            {/* Reactions */}
            <View style={styles.reactions}>
              <ReactionButton label="Relate" count={item.reactions.relate} emoji="💙" />
              <ReactionButton label="Too Real" count={item.reactions.tooReal} emoji="😭" />
              <ReactionButton label="Chaos" count={item.reactions.chaos} emoji="🔥" />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable style={styles.actionBtn}>
                <MessageCircle size={18} color="#b0b0b0" />
                <Text style={styles.actionText}>Reply</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Share2 size={18} color="#b0b0b0" />
                <Text style={styles.actionText}>Share</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ReactionButton({ label, count, emoji }: { label: string; count: number; emoji: string }) {
  return (
    <Pressable style={styles.reactionBtn}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.reactionLabel}>{label}</Text>
      <Text style={styles.reactionCount}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomColor: '#c71585',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c71585',
  },
  tagline: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
  },
  feed: {
    paddingVertical: 12,
  },
  post: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderLeftColor: '#ff006e',
    borderLeftWidth: 3,
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  energy: {
    fontSize: 12,
    color: '#c71585',
  },
  content: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 24,
    marginBottom: 12,
  },
  reactions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  reactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderColor: '#c71585',
    borderWidth: 1,
    gap: 4,
  },
  emoji: {
    fontSize: 16,
  },
  reactionLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
  reactionCount: {
    fontSize: 11,
    color: '#808080',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#b0b0b0',
  },
});
