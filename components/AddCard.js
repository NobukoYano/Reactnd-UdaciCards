import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { white, blue, gray} from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { submitCard, testFetchCards } from '../utils/api';

function AddCardBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.addCardBtn}
            onPress={onPress}
        >
            <Text style={styles.addCardBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    state= {
        question: '',
        answer: '',
    }
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params;
        return {
            title: `Add Card in ${deckId}`,
        }
    }
    addNewCard = () => {
        const { question, answer } = this.state;
        const { deckId, deckCards } = this.props;
        
        if ( question === '' || answer === '') return;
        
        let newCards = deckCards;
        newCards.questions.push(
            {
                question,
                answer
            }
        );
        
        this.props.dispatch(addCard(deckId, newCards))
        this.setState({
            question: '',
            answer: ''
        });

        // Update Async DB
        submitCard(deckId, newCards);
        // testFetchCards()
        //     .then((result) => console.log(`AddCard:AsyncStorage After###: ${result}`));

        // Go To Home
        this.props.navigation.navigate('DeckList');
        
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
                <Text style={styles.itemText}>What is the question?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                    placeholder='write question here'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                    placeholder='write answer here'
                />
                <AddCardBtn onPress={this.addNewCard}/>
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
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: 15,
    },
    addCardBtn: {
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
    addCardBtnText: {
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
        fontSize: 20,
    }
})

function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params;
    // console.log('AddCard:Redux State###:', JSON.stringify(state));

    return {
        deckId,
        deckCards: state[deckId]
    }
}

export default connect(mapStateToProps)(AddCard);