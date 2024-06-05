import React from "react";
import { StyleSheet, Text, TouchableHighlight} from "react-native";

export const AppButton = (props) => {
    return (
        <TouchableHighlight style={{

           
            width: 255,
            height: 50,
            backgroundColor: '#CC5803',
            borderRadius: 20,
            alignItems:"center",
            marginLeft: props.marginLeft ? props.marginLeft : 1,
            marginTop: props.marginTop ?  props.marginTop : 1,
            top: props.top ? props.top: 1, 
            left: props.left ? props.left: 1
        }} onPress={props.onPress} >
           <Text style={style.text}>{props.title}</Text>
        </TouchableHighlight>
    )
}

export const SmallButton = (props) => {
    return (
            <TouchableHighlight style={
            { 
                textAlign: 'center',
                backgroundColor: '#CC5803',
                borderRadius: 20,
                width: 180,
                height: 46,
                padding: 8,
                top: props.top ? props.top: 1, 
                left: props.left ? props.left: 1
            }} onPress={props.onPress}>
            <Text style={style.smallText}>{props.title} </Text>
        </TouchableHighlight>
    )
}

const style = StyleSheet.create({
    button : {
        textAlign: 'center',
        width: 255,
        height: 50,
        backgroundColor: '#CC5803',
        borderRadius: 20,
        
    },

    text: {

        fontStyle: 'normal',
        fontSize: 25,
        color: '#FFFFFF', 
        textAlign: 'center',
        paddingTop: 12,
        lineHeight: 24,
    },

    smallButton : {
        textAlign: 'center',
        backgroundColor: '#CC5803',
        borderRadius: 20,
        width: 150,
        height: 40,
        padding: 5
    },

    smallText : {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 2
    }
});