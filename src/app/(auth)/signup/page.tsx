/*
 SignUp CONTAINER:
- Responsável por lógica de negócio, busca de dados (via hooks e serviços) 
 - Chama a screen passando os dados necessarios para montar componente visual
*/

import { SignUpScreen } from "@/src/screens/signup";

export default function SignUp() {
  return (
    <SignUpScreen />
  )
}