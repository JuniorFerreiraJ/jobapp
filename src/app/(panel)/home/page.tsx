import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { router } from 'expo-router';
import colors from '../../../constants/colors';
import { useAuth } from '../../../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const { signOut, user } = useAuth();

  const handleGoToAudits = () => {
    console.log('=== DEBUG AUDITORIAS ===');
    console.log('Usuário clicou no botão Auditorias');
    console.log('Tentando navegar para ../audits');
    router.push('../audits');
    console.log('Navegação para auditorias executada');
  };

  const handleViewProfile = () => {
    console.log('=== DEBUG PERFIL ===');
    console.log('Usuário clicou no botão Meu Perfil');
    console.log('Tentando navegar para ../profile');
    router.push('../profile');
    console.log('Navegação para perfil executada');
  };

  const handleViewStats = () => {
    console.log('=== DEBUG ESTATÍSTICAS ===');
    console.log('Usuário clicou no botão Estatísticas');
    console.log('Tentando navegar para ../stats');
    router.push('../stats');
    console.log('Navegação executada');
  };

  const handleLogout = async () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              console.log('=== FAZENDO LOGOUT ===');
              await signOut();
              console.log('Logout realizado com sucesso');

              // Navegar para a tela de login
              router.replace('/(auth)/signin/page');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert(
                "Erro",
                "Não foi possível fazer logout. Tente novamente.",
                [{ text: "OK" }]
              );
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com gradiente */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JF</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.greeting}>Bem-vindo de volta!</Text>
            <Text style={styles.userName}>João Ferreira</Text>
            <Text style={styles.userRole}>Auditor Sênior</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards de estatísticas principais */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Text style={styles.statIconText}>📊</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Auditorias</Text>
            <Text style={styles.statSubtext}>Este mês</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Text style={styles.statIconText}>⭐</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
            <Text style={styles.statSubtext}>Média geral</Text>
          </View>
        </View>
      </View>

      {/* Menu principal */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Menu Principal</Text>

        <TouchableOpacity style={styles.menuCard} onPress={handleGoToAudits}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>🔍</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>Auditorias</Text>
            <Text style={styles.menuDescription}>Visualizar e agendar auditorias</Text>
          </View>
          <View style={styles.menuArrow}>
            <Text style={styles.menuArrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={handleViewProfile}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>👤</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>Meu Perfil</Text>
            <Text style={styles.menuDescription}>Gerenciar dados pessoais</Text>
          </View>
          <View style={styles.menuArrow}>
            <Text style={styles.menuArrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={handleViewStats}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>📈</Text>
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuLabel}>Estatísticas</Text>
            <Text style={styles.menuDescription}>Analisar performance</Text>
          </View>
          <View style={styles.menuArrow}>
            <Text style={styles.menuArrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Resumo rápido */}
      <View style={styles.quickSummary}>
        <Text style={styles.summaryTitle}>Resumo Rápido</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Você tem <Text style={styles.highlight}>3 auditorias pendentes</Text> para esta semana
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    backgroundColor: colors.black,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: colors.yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.black,
  },
  userDetails: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: colors.gray100,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 16,
    color: colors.yellow,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.yellow,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.gray200,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statIconText: {
    fontSize: 24,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 12,
    color: colors.gray100,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 20,
  },
  menuCard: {
    backgroundColor: colors.gray200,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.gray100,
  },
  menuArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuArrowText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.black,
  },
  quickSummary: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 15,
  },
  summaryCard: {
    backgroundColor: colors.gray200,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
  },
  summaryText: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 24,
  },
  highlight: {
    color: colors.yellow,
    fontWeight: '700',
  },
});