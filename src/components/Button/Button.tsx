import { Button as NBButton, IButtonProps, Heading } from 'native-base';

type ButtonProps = {
  title: string
} & IButtonProps

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <NBButton 
    bg='green.700'
    h={14}
    fontSize='sm'
    rounded='sm'
    _pressed={{
      bg: 'green.500'
    }}
    {...rest}
    >
      <Heading color='white' fontSize='md'>
        {title}
      </Heading>
    </NBButton>
  );
}