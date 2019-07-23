import { AsyncStorage } from 'react-native';
import { timeToString } from './helpers';

export const CARDS_STORAGE_KEY = 'UdaciCards:cards'

function setDummyData() {

    let dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }

    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(dummyData))
    // console.log('dummy data set :', dummyData);

    return dummyData
}

export function formatCards(results) {
    // console.log('formatCards:', results)
    return results === null
        ? setDummyData()
        : JSON.parse(results)
}