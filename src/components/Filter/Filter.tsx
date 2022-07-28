import { VStack, Button, IButtonProps, useTheme, Text } from 'native-base';

type FilterProps = {
  title: string,
  isActive?: boolean,
  type: 'open' | 'closed'
} & IButtonProps

export const Filter: React.FC<FilterProps> = ({ title, type, isActive = false, ...rest }) => {

  const { colors } = useTheme()

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]

  return ( 
    <Button
      variant='outline'
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor='gray.600'
      flex={1}
      size='sm'
      {...rest}
    >
      <Text color={isActive ? colorType : 'gray.300'} fontSize='xs' textTransform='uppercase' >
        {title}
      </Text>
    </Button>
  );
}