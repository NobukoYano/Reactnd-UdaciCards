import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveCards } from '../actions';
import { fetchCardsResults } from '../utils/api';
import { AppLoading } from 'expo';
import { white } from '../utils/colors';

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
                <Text>DeckList View.</Text>
                <Text>{ JSON.stringify(cards) }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 20,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
})

function mapStateToProps (cards) {
    return {
        cards
    }
}

export default connect(mapStateToProps)(DeckList);
