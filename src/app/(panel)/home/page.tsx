import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import colors from '../../../constants/colors';

export default function HomePage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Logout realizado com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer logout");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>Email: {user.email}</Text>
          <Text style={styles.userId}>ID: {user.id}</Text>
          <Text style={styles.createdAt}>
            Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.zinc,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 30,
  },
  userInfo: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: colors.zinc,
    marginBottom: 8,
  },
  userId: {
    fontSize: 14,
    color: colors.gray100,
    marginBottom: 8,
  },
  createdAt: {
    fontSize: 14,
    color: colors.gray100,
  },
  logoutButton: {
    backgroundColor: colors.orange,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});