import React from 'react';
import { View, StyleSheet } from 'react-native';
import CreateForm from './components/CreateForm';
import WordList from './components/WordList';


class App extends React.Component 
{

    render()
    {
        return (
            <View style={ styles.container }>
                <CreateForm/>
                <WordList/>
            </View>
        )
    }

} 


const styles = StyleSheet.create({

    container: {
        paddingTop: 80, 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingBottom: 20, 
        backgroundColor: '#DDD'
    }

});

export default App;