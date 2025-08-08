
import colors from "@/src/constants/colors";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Link } from "expo-router";


export function SignUpScreen() {
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
            autoCapitalize="none"
            placeholderTextColor={colors.gray50}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            autoCapitalize="none"
            placeholderTextColor={colors.gray50}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="********"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor={colors.gray50}
          />
        </View>


        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Criar conta</Text>
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