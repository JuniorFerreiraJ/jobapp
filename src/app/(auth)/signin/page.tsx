/*
 CONTAINER:
- Responsável por lógica de negócio, busca de dados (via hooks e serviços) 
 - Chama a screen passando os dados necessarios para montar componente visual
*/

import SigninScreen from "../../../screens/signin/index";

export default function SignIn() {
  return (
    <SigninScreen />
  );
}