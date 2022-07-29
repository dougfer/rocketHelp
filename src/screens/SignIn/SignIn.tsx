import React, { useState } from 'react'
import { Alert } from 'react-native'
import { VStack, Heading, Icon, useTheme } from 'native-base'
import Logo from '../../assets/logo_primary.svg'
import { Input, Button } from '../../components'
import { Envelope, Key } from 'phosphor-react-native'
import auth from '@react-native-firebase/auth'

export const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')

  const { colors } = useTheme()

  const handleSignIn = () => {
    if(!emailInput || !passwordInput) {
      return Alert.alert('Entrar', 'Informe e-mail ou senha.')
    }
    setIsLoading(true)
    auth()
    .signInWithEmailAndPassword(emailInput, passwordInput)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error.code)
      setIsLoading(false)

      if(error.code === 'auth/invalid-email') {
        return Alert.alert('Entrar', 'E-mail inválido')
      }

      if(error.code === 'auth/user-not-found') {
        return Alert.alert('Entrar', 'E-mail ou senha inválida')
      }

      if(error.code === 'auth/wrong-password') {
        return Alert.alert('Entrar', 'E-mail ou senha inválida')
      }

      return Alert.alert('Entrar', 'Não foi possível acessar')
    })
  }

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24} >
      <Logo />
      <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input 
        placeholder='E-mail' 
        mb={4}
        InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} />} />}
        value={emailInput}
        onChangeText={setEmailInput}
        keyboardType='email-address'
      />
      <Input
        mb={8}
        placeholder='Senha'
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
        secureTextEntry
        value={passwordInput}
        onChangeText={setPasswordInput}
      />
      <Button 
        onPress={handleSignIn}
        title='Entrar'
        w='full'
        isLoading={isLoading}
      />
    </VStack>
  )
}