//chua lam chu duoc Swiper, tinh nang van co nhung chua ra hinh
//khong hieu tai sao khi thay tu server lai co hinh
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const url = 'http://192.168.131.2/api/images/type/';

export default class Category extends Component {
    gotoListProduct() {
       const { navigation } = this.props;
        navigation.navigate('Manhinh_ListProduct');
    }

    render() {
        const { types } = this.props;
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={textStyle} >LIST OF CATEGORY</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 4 }}>
                    <Swiper showsPagination showsButtons width={imageWidth} height={imageHeight} >
                        {types.map(e => (
                            <TouchableOpacity onPress={this.gotoListProduct.bind(this)} key={e.id}>
                                <Image source={{ uri: `${url}${e.image}` }} style={imageStyle}>
                                    <Text style={cateTitle}>{e.name}</Text>
                                </Image>
                            </TouchableOpacity>
                        ))}
                                       
                    </Swiper>
            </View>
            </View >
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    }
});

/*<TouchableOpacity onPress={this.props.onOpen}>
                            <Image source={littleIcon} style={imageStyle}>
                                <Text style={cateTitle}>Maxi Dress</Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onOpen}>
                            <Image source={maxiIcon} style={imageStyle}>
                                <Text style={cateTitle}>Maxi Dress</Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onOpen}>
                            <Image source={partyIcon} style={imageStyle}>
                                <Text style={cateTitle}>Maxi Dress</Text>
                            </Image>
                        </TouchableOpacity>
 */
