
const {MarkovMachine} = require('./markov')

describe('Markov Machine tests', function(){

test('Creates an array of Markov Chains', function(){
    let mm = new MarkovMachine('a b a b c d');
    expect(mm.chains).toEqual(
        new Map([['a', ['b','b']],['b', ['a','c']], ['c', ['d']],['d' ,[null]]])
    )
})

test('check that text generated from MarkovMachine is contained within the map', function(){
    let mm = new MarkovMachine('A B C');
    let text = mm.makeText();
    expect(['A B C','A B', 'C']).toContain(text)

})


})