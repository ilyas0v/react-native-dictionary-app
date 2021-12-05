import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { addWord } from '../api/words';


class CreateForm extends React.Component 
{

    constructor(props) {

      super(props);

      this.state = { 
          word: '',
          translation: '',
          list  : []
      };

      this.saveWord = this.saveWord.bind(this);
      this.success  = this.success.bind(this);

    }

    saveWord()
    {
        var word = this.state.word.trim();
        var translation = this.state.translation.trim();

        if( word.length == 0 || translation.length == 0 )
        {
            alert('Fill the inputs');
            return;
        }

        addWord(word, translation, this.success);
    }
    

    success()
    {
        this.setState({
            word: '',
            translation: ''
        });
    }

    render()
    {
        return (

            <View style={ styles.container }>

                <TextInput 
                  style={styles.textInput}
                  placeholder="Word"
                  onChangeText={(word) => this.setState({word:word})}
                  value={this.state.word}
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  blurOnSubmit={false}
                />

                <TextInput 
                  ref={(input) => { this.secondTextInput = input; }}
                  style={styles.textInput}
                  placeholder="Translation"
                  onChangeText={(word) => this.setState({translation:word})}
                  value={this.state.translation}
                  onSubmitEditing={() => { this.saveWord() }}
                />

                <Button
                    onPress={this.saveWord}
                    title="Save"
                />

            </View>

        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        padding: 16,
    },

    container: { 
        padding: 20, 
        backgroundColor: '#FFF', 
        borderRadius: 10 
    }

});

export default CreateForm;