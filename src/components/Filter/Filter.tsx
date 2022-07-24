import { VStack, Button, IButtonProps, useTheme } from 'native-base';

type FilterProps = {
  title: string,
  isActive?: boolean,
  type: 'open' | 'closed'
} & IButtonProps

export const Filter: React.FC<FilterProps> = ({ title, type, isActive = false, ...rest }) => {
  return ( 
    <Button
      variant='outline'
    >
      Título

    </Button>
  );
}