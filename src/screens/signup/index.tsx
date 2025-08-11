
import colors from "@/src/constants/colors";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { supabase } from "../../config/supabase";

export function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        Alert.alert("Erro no cadastro", error.message);
      } else {
        Alert.alert(
          "Sucesso!", 
          "Conta criada com sucesso! Verifique seu email para confirmar a conta.",
          [
            {
              text: "OK",
              onPress: () => {
                // Voltar para a tela de login
                // O usuário precisará confirmar o email antes de fazer login
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado");
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.zinc }}
      contentContainerStyle={{ flexGrow: 1, }}
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
            placeholder="Nome completo..."
            autoCapitalize="words"
            placeholderTextColor={colors.gray50}
            value={fullName}
            onChangeText={setFullName}
            autoComplete="name"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            autoCapitalize="none"
            placeholderTextColor={colors.gray50}
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
            placeholderTextColor={colors.gray50}
            value={password}
            onChangeText={setPassword}
            autoComplete="password-new"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Criando conta..." : "Criar conta"}
          </Text>
        </TouchableOpacity>

        <Link
          href="/(auth)/signin/page"
          style={styles.link}
        >
          Já possui uma conta? Faça o login!
        </Link>

      </View>
    </ScrollView>
  )
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
    padding: 12,
    marginBottom: 12,
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