import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, FlatList, StyleSheet } from 'react-native';
import CreateForm from './CreateForm';
import { getWords } from '../api/words';
import { TextInput } from 'react-native';

class WordList extends React.Component 
{

    constructor(props)
    {
        super(props);

        this.state = {
            words: [],
            filteredWords: [],
            searchQuery: '',
            loading: true
        };
    }

    componentDidMount()
    {
        this.fetchWords();
        this.setState({loading:false});
    }

    fetchWords()
    {
        getWords( (data) => {
            this.setState({ words: data })
        });
    }


    filterWords()
    {
        var words = this.state.words;

        var filteredWords = words.filter((obj) => {

            return obj.word.toUpperCase().includes(this.state.searchQuery.toUpperCase());

        });

        this.setState({filteredWords: filteredWords});
    }


    render()
    {

        const renderItem = ({ item }) => (
            <View key={item.id} style={ styles.list_item }>
                <Text style={ { fontSize: 20} }>{item.word} - {item.translation}</Text>
            </View>
        );


        var wordsToDisplay = this.state.filteredWords.length > 0 && this.state.searchQuery.length > 0 ? this.state.filteredWords : this.state.words;

        return ( 

            <View>

                <View style= { { backgroundColor: '#FFF', marginTop: 10, borderRadius: 10 } }>
                    <TextInput 
                        style={{padding: 8}}
                        placeholder="Search..."
                        onChangeText={(word) => { this.setState({searchQuery:word}) } }
                        onSubmitEditing={() => { this.filterWords() }}
                        blurOnSubmit={false}
                        value={this.state.searchQuery}
                    />
                </View>

                <View style={ styles.container }>

                    <Text style={ { marginBottom: 10, fontSize: 16 } }>{wordsToDisplay.length} words:</Text>

                    <SafeAreaView>
                        <ScrollView>
                            <View>
                                <FlatList
                                    data={wordsToDisplay}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>

                </View>

            </View>
        )
    }

} 


const styles = StyleSheet.create({

    list_item: { 
        borderColor: '#ddd', 
        borderStyle: 'solid', 
        borderWidth: 1, 
        padding: 8, 
        marginBottom: 8, 
        borderRadius: 5 
    },

    container: { 
        padding: 20, 
        height: 520, 
        backgroundColor: '#FFF', 
        marginTop: 10, 
        borderRadius: 10 
    }

});

export default WordList;