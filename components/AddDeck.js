import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { white, blue, gray} from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { submitDeck, testFetchCards } from '../utils/api';

function AddDeckBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.addDeckBtn}
            onPress={onPress}
        >
            <Text style={styles.addDeckBtnText}>Add Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component {
    state= {
        text: ''
    }
    addNewDeck = () => {
        const { text } = this.state; 

        this.props.dispatch(addDeck(text))
        this.setState({ text: '' });

        // Update Async DB
        submitDeck( text );
        // testFetchCards()
        //     .then((result) => console.log(`Add Deck:AsyncStorage After###: ${result}`));

        // Go To Home
        this.props.navigation.navigate('DeckList');
        
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
                <Text style={styles.itemText}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='Deck Title'
                />
                <AddDeckBtn onPress={this.addNewDeck}/>
             </KeyboardAvoidingView>
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
        fontSize: 35,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: 15,
    },
    addDeckBtn: {
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
    addDeckBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        margin:20,
        padding:10,
    },
    input:{
        // height: 40, 
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 15,
    }
})

function mapStateToProps (state, { navigation }) {
    return {
        state,
    }
}

export default connect(mapStateToProps)(AddDeck);