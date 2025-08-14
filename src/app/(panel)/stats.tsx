import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';

export default function StatsPage() {
  useEffect(() => {
    console.log('=== STATS PAGE RENDERIZADA ===');
    console.log('StatsPage foi montada com sucesso');
  }, []);

  const handleGoBack = () => {
    console.log('=== VOLTANDO PARA TELA INICIAL ===');
    router.back();
  };

  console.log('=== RENDERIZANDO STATS PAGE ===');

  return (
    <View style={styles.container}>
      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>📊 Estatísticas</Text>
        <Text style={styles.subtitle}>Tela funcionando!</Text>
        <Text style={styles.debug}>Debug: Componente renderizado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.gray200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gray100,
    fontWeight: '600',
    marginBottom: 16,
  },
  debug: {
    fontSize: 14,
    color: colors.yellow,
    fontWeight: '600',
  },
});
