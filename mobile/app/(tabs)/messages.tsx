import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Send } from 'lucide-react-native';

const mockChats = [
  { id: '1', person: 'Anonymous Soul', lastMessage: 'same honestly...', time: '2m ago', unread: true },
  { id: '2', person: 'Chaos Gremlin', lastMessage: 'wait did you see that tik tok', time: '1h ago', unread: false },
  { id: '3', person: 'Soft Bean', lastMessage: 'wanna talk about it?', time: '3h ago', unread: false },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>24 hours. Then poof.</Text>
      </View>

      {/* Chat List */}
      <FlatList
        data={mockChats}
        renderItem={({ item }) => (
          <Pressable style={styles.chatItem}>
            <View style={styles.chatContent}>
              <Text style={[styles.personName, item.unread && { fontWeight: 'bold' }]}>
                {item.person}
              </Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <View style={styles.timeSection}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      {/* Confession Box */}
      <View style={styles.confessionSection}>
        <Text style={styles.confessTitle}>Anonymous Confession</Text>
        <View style={styles.confessBox}>
          <Text style={styles.confessPlaceholder}>Tell the void something...</Text>
          <Pressable style={styles.sendIcon}>
            <Send size={18} color="#c71585" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#c71585',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
  },
  chatList: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 1,
  },
  chatContent: {
    flex: 1,
  },
  personName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  lastMessage: {
    fontSize: 13,
    color: '#808080',
    marginTop: 4,
  },
  timeSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#808080',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c71585',
    marginTop: 4,
  },
  confessionSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopColor: '#c71585',
    borderTopWidth: 1,
  },
  confessTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c71585',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  confessBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderColor: '#c71585',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  confessPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#808080',
  },
  sendIcon: {
    padding: 4,
  },
});
