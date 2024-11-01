import {getData} from '../js/main.js';
import {dataEvent} from '../js/main.js';

QUnit.module('CRUD', function() {

    QUnit.test('The getData function should add a data property to the holder that is not undefined', function(assert) {
        const done = assert.async();

        const holder = new Object();
        getData(holder)

        document.addEventListener('dataReady', function () {
            assert.ok(holder.data);
            done();
        })
    });

});
