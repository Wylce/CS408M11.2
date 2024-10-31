import {getData} from '../js/main.js';
import {dataEvent} from '../js/main.js';

QUnit.module('get', function() {

    QUnit.test('make sure the getData function adds an object to the data attribute', function(assert) {
        const holder = new Object();
        getData(holder)
        
        assert.notnull(result, 'hello');
    });


});
