/*
 SignUp CONTAINER:
- Responsável por lógica de negócio, busca de dados (via hooks e serviços) 
 - Chama a screen passando os dados necessarios para montar componente visual
*/

import { SignUpScreen } from "@/src/screens/signup";
import useSignup from '../../../hooks/useSignup'

export default function SignUp() {
  const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignup();


  return (
    <SignUpScreen
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      errors={errors}
    />
  )
}