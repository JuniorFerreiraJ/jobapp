/*
  Screen > Responsável por renderizar a parte visual.
*/

import { Link, router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { useState } from "react";
import colors from "../../constants/colors";
import { supabase } from "../../config/supabase";

export function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
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
    borderRadius: 4,
    marginBottom: 12,
    padding: 12,
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  link: {
    color: colors.white,
    marginTop: 16,
    textAlign: 'center'
  }
})