import {
    assert,
    assertEquals,
    assertStrictEq,
    test
} from '../dev-dependencies.js';
import Response from '../lib/response.js';
import * as bang from '../lib/bang.js';

test('new Bang() is a 500 error by default', () => {
    const error = new bang.Bang();
    assert(error instanceof Error);
    assert(error instanceof bang.Bang);
    assertStrictEq(error.message, 'Internal Server Error');
    assert(error.response instanceof Response);
    assertStrictEq(error.response.status, 500);
    assertEquals(error.response.body, {
        error   : 'Internal Server Error',
        message : 'Internal Server Error',
        status  : 500
    });
});

test('new Bang() with custom message', () => {
    const error = new bang.Bang('some problem');
    assert(error instanceof Error);
    assertStrictEq(error.message, 'some problem');
    assertStrictEq(error.response.status, 500);
    assertEquals(error.response.body, {
        error   : 'Internal Server Error',
        message : 'Internal Server Error',
        status  : 500
    });
});

test('new Bang() with custom message and explicit 500 status', () => {
    const error = new bang.Bang('some problem', { status : 500 });
    assert(error instanceof Error);
    assertStrictEq(error.message, 'some problem');
    assertStrictEq(error.response.status, 500);
    assertEquals(error.response.body, {
        error   : 'Internal Server Error',
        message : 'Internal Server Error',
        status  : 500
    });
});

test('new Bang() with custom message and 501 status', () => {
    const error = new bang.Bang('some problem', { status : 501 });
    assert(error instanceof Error);
    assertStrictEq(error.message, 'some problem');
    assertStrictEq(error.response.status, 501);
    assertEquals(error.response.body, {
        error   : 'Not Implemented',
        message : 'some problem',
        status  : 501
    });
});

test('new Bang() with error', () => {
    const error = new bang.Bang(new Error('some problem'));
    assert(error instanceof Error);
    assertStrictEq(error.message, 'some problem');
    assertStrictEq(error.response.status, 500);
    assertEquals(error.response.body, {
        error   : 'Internal Server Error',
        message : 'Internal Server Error',
        status  : 500
    });
});

test('new Bang() with error and 501 status', () => {
    const error = new bang.Bang(new Error('some problem'), { status : 501 });
    assert(error instanceof Error);
    assertStrictEq(error.message, 'some problem');
    assertStrictEq(error.response.status, 501);
    assertEquals(error.response.body, {
        error   : 'Not Implemented',
        message : 'some problem',
        status  : 501
    });
});
