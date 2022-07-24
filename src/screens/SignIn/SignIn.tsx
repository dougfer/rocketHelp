import React, { useState } from 'react'
import { VStack, Heading, Icon, useTheme } from 'native-base'
import Logo from '../../assets/logo_primary.svg'
import { Input, Button } from '../../components'
import { Envelope, Key } from 'phosphor-react-native'

export const SignIn: React.FC = () => {

  const [emailInput, setEmailInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')

  const { colors } = useTheme()

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
      <Button title='Entrar' w='full' />
    </VStack>
  )
}