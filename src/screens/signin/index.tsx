/*
  Screen > Responsável por renderizar a parte visual.
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../../config/supabase';
import colors from '../../constants/colors';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Erro no login", error.message);
      } else {
        console.log("Login realizado com sucesso");
        // O onAuthStateChange no layout principal irá redirecionar automaticamente
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.zinc }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.zinc} barStyle="light-content" />

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />

        <View>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            autoCapitalize="none"
            placeholderTextColor={colors.gray100}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="********"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor={colors.gray100}
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Acessar conta"}
          </Text>
        </TouchableOpacity>

        <Link href="/(auth)/signup/page" style={styles.link}>
          Ainda não possui uma conta? Cadastre-se
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: colors.zinc
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 34,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: colors.yellow,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: colors.yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  link: {
    color: colors.yellow,
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
})