import firebase, { WordsRef } from './firebase';

export function addWord(word, translation, callback)
{
    var data = {
        'word'    : word,
        'translation'    : translation,
        'created_at' : Date.now()
    };

    WordsRef.add(data).then(() => {

        callback();

    });
}


export function getWords(callback)
{
    WordsRef.onSnapshot(snapShot => {

        var wordList = [];

        snapShot.forEach((doc) => {

            wordList.push({
                id: doc.data().id,
                word: doc.data().word,
                translation: doc.data().translation,
                createdAt: doc.data().created_at
            });

        });

        wordList.sort((a,b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
        });

        callback(wordList);

    });

}