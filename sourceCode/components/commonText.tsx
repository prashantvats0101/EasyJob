import { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../constant";



interface CommonTextProps extends TextProps {
    children: ReactNode;
}

const CommonText: React.FC<CommonTextProps> = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.blacktxt,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',



    },
});

export default CommonText;