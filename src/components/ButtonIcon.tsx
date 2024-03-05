import {TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';

interface ButtonIconProps {
  handleonPress: () => void;
  icon: string;
}

const ButtonIcon = ({handleonPress, icon}: ButtonIconProps) => {
  return (
    <TouchableOpacity onPress={() => handleonPress()}>
      <List.Icon icon={icon} />
    </TouchableOpacity>
  );
};
export default ButtonIcon;
