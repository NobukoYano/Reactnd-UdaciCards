import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveCards } from '../actions';
import { fetchCardsResults } from '../utils/api';
import { AppLoading } from 'expo';
import { white, blue, gray } from '../utils/colors';

class DeckList extends Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props;

        fetchCardsResults()
            .then((cards) => dispatch(receiveCards(cards)))
            .then(() => this.setState(() => ({ready: true})));
    }
    render() {
        const { cards } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View>
                { Object.keys(cards).map((key) => {
                    const num = cards[key].questions.length;
                    return (
                    <TouchableOpacity
                        key={key}
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate(
                            'Deck',
                            { deckId: key }        
                        )}>
                        <Text style={styles.itemText}>{ key }</Text>
                        <Text style={[styles.itemText, {color: gray, fontSize: 20}]}>
                            { ( num <= 1 ) ? `${num} Card` : `${num} Cards` }
                        </Text>
                    </TouchableOpacity>
                )})}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: 5,
        padding: 20,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 6,
    },
    itemText: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})

function mapStateToProps (cards) {
    return {
        cards
    }
}

export default connect(mapStateToProps)(DeckList);
