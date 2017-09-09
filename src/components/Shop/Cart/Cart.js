import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, FlatList,
    Dimensions, StyleSheet, Image
} from 'react-native';
import global from '../global';

import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';

//import sp1 from '../.././../media/temp/sp1.jpeg';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
const url = 'http://192.168.131.2/api/images/product/';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartArray: []
        };
        global.addProductToCart = this.addProductToCart.bind(this);
        global.incrQuantity = this.incrQuantity.bind(this);
    }
    componentDidMount() {
        getCart()
        .then(cartArray => this.setState({ cartArray }));
    }

    addProductToCart(product) {
        this.setState(
            { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) }, 
            () => saveCart(this.state.cartArray)
        );
    }
    incrQuatity(id) {
        global.incrQuantity(id);
    }
    gotoDetail() {
        const { navigate } = this.props.navigation;
        navigate('Manhinh_ProductDetail');
    }
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart });
    }

    decrQuantity(productId) {

    }

    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        //const { cartArray } = this.state;
        return (
            <View style={wrapper}>
                <FlatList
                contentContainerStyle={main}
                data={this.state.cartArray}
			renderItem={({ cartItem }) => (
                        <View style={productStyle}>
                            <Image 
                            source={{ uri: `${url}${cartItem.product.images[0]}` }} 
                            style={productImage} 
                            />
                            <View style={[mainRight]}>
                                <View 
                                style={{ 
                                    justifyContent: 'space-between', 
                                    flexDirection: 'row' }}
                                >
                                <Text style={txtName}>{toTitleCase(cartItem.product.name)}</Text>
                                    <TouchableOpacity>
                                        <Text 
                                        style={{ 
                                            fontFamily: 'Avenir', 
                                            color: '#969696' }}
                                        >X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                <Text style={txtPrice}>{cartItem.product.price}$</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                    <TouchableOpacity 
                                    onPress={() => this.incrQuatity(cartItem.product.id)}
                                    >
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                        <Text>{cartItem.quantity}</Text>
                                        <TouchableOpacity>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer}>
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity style={checkoutButton}>
                    <Text style={checkoutTitle}>TOTAL {1000}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default Cart;


/*<View style={product}>
    <Image source={sp1} style={productImage} />
    <View style={[mainRight]}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={txtName}>{toTitleCase('black of the')}</Text>
            <TouchableOpacity>
                <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={txtPrice}>{100}$</Text>
        </View>
        <View style={productController}>
            <View style={numberOfProduct}>
                <TouchableOpacity>
                    <Text>+</Text>
                </TouchableOpacity>
                <Text>{3}</Text>
                <TouchableOpacity>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={showDetailContainer}>
                <Text style={txtShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>*/
/*
import React, { Component } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, 
    Dimensions, StyleSheet, Image 
} from 'react-native';

import sp1 from '../.././../media/temp/sp1.jpeg';

function toTitleCase(str) {
    return str.replace(/\w\S*//*g, txt => txt.charAt(0).toUpperCase()
     + txt.substr(1).toLowerCase());
}

class Cart extends Component {
    gotoDetail() {
        const { navigate } = this.props.navigation;
        navigate('Manhinh_ProductDetail');
    }
    
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
        product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct, 
            txtShowDetail, showDetailContainer } = styles;
            const { cartArray } = this.props;
        return (
            <View style={wrapper}>
                <ScrollView style={main}>
                    <View style={product}>
                        <Image source={sp1} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{toTitleCase('black of the')}</Text>
                                <TouchableOpacity>
                                    <Text 
                                    style={{ fontFamily: 'Avenir', 
                                    color: '#969696' }}
                                    >X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{100}$</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    <Text>{3}</Text>
                                    <TouchableOpacity>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={showDetailContainer}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={product}>
                        <Image source={sp1} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{toTitleCase('black of the')}</Text>
                                <TouchableOpacity>
                                    <Text 
                                    style={{ fontFamily: 'Avenir', 
                                    color: '#969696' }}
                                    >X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{100}$</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    <Text>{3}</Text>
                                    <TouchableOpacity>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={showDetailContainer}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={product}>
                        <Image source={sp1} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{toTitleCase('black of the')}</Text>
                                <TouchableOpacity>
                                    <Text 
                                    style={{ fontFamily: 'Avenir', 
                                    color: '#969696' }}
                                    >X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{100}$</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    <Text>{3}</Text>
                                    <TouchableOpacity>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={showDetailContainer}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={product}>
                        <Image source={sp1} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{toTitleCase('black of the')}</Text>
                                <TouchableOpacity>
                                    <Text 
                                    style={{ fontFamily: 'Avenir', 
                                    color: '#969696' }}
                                    >X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{100}$</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    <Text>{3}</Text>
                                    <TouchableOpacity>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={showDetailContainer}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={checkoutButton}>
                    <Text style={checkoutTitle}>TOTAL {1000}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default Cart;
 
*/
