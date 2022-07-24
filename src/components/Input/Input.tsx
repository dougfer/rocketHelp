import React from 'react'
import { Input as NBInput, IInputProps } from 'native-base'

export const Input: React.FC<IInputProps> = ({...rest}) => {
  return (
    <NBInput 
      bg='gray.700' 
      h={14} 
      size='md' 
      borderWidth={0} 
      fontSize='md' 
      fontFamily='body'
      placeholderTextColor='gray.300'
      color='white'
      _focus={{
        borderWidth: 1,
        borderColor: 'green.400',
        bg: 'gray.700'
      }}
      {...rest}
    />
  )
}
