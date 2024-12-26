/// <reference types="react" />
import { TextInput } from 'react-native';
import { SearchTextInputProps } from 'uniswap/src/features/search/SearchTextInput';
interface SearchBarProps extends SearchTextInputProps {
    onBack?: () => void;
    hideBackButton?: boolean;
}
export declare const SearchBar: import("react").ForwardRefExoticComponent<SearchBarProps & import("react").RefAttributes<TextInput>>;
export {};
//# sourceMappingURL=SearchBar.d.ts.map