import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white, blue, gray } from '../utils/colors';
import TextButton from './TextButton';

function StartBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.androidStartBtn}
            onPress={onPress}
        >
            <Text style={styles.startBtnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}
function AddBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.androidAddBtn}
            onPress={onPress}
        >
            <Text style={styles.addBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}


class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params;

        return {
            title: deckId,
        }
    }
    start = () => {
        const { deckId, deckCards } = this.props;
        (deckCards.questions.length === 0)
            ? this.props.navigation.navigate('NoCard')
            : this.props.navigation.navigate(
            'Card',
            { deckId: deckId, index: 0, correct: 0}        
        )    
    }
    add = () => {

    }
    removeDeck = () => {

    }    
    render() {
        const {deckId, deckCards } = this.props;
        const num = deckCards.questions.length;
        return (
            <View style={styles.container}>
                <Text style={styles.itemText}>{ deckId }</Text>
                <Text style={[styles.itemText, {color: gray, fontSize: 20}]}>
                    { ( num <= 1 ) ? `${num} Card` : `${num} Cards` }
                </Text>
                <View style={{height: 30}}/>
                <AddBtn onPress={this.add} />
                <StartBtn onPress={this.start}/>
                <TextButton onPress={this.removeDeck} style={{margin: 20}}>
                    Remove Deck
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    androidStartBtn: {
        backgroundColor: blue,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    androidAddBtn: {
        backgroundColor: white,
        borderColor: blue,
        borderWidth: 0.5,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: {
        color: blue,
        fontSize: 22,
        textAlign: 'center',
    },
})

function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params;

    return {
        deckId,
        deckCards: state[deckId]
    }
}

export default connect(mapStateToProps)(Deck);