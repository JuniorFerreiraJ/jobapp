/*
 CONTAINER:
- Responsável por lógica de negócio, busca de dados (via hooks e serviços) 
 - Chama a screen passando os dados necessarios para montar componente visual
*/

import useSigin from "@/src/hooks/useSignin";
import { SignInScreen } from "../../../screens/signin/index";

export default function SignIn() {
  const { control, errors, handleSubmit, isSubmitting, onSubmit } = useSigin()

  return (
    <SignInScreen
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  )
}