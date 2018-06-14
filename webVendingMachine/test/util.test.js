import {getEl,getElAll,updateText, acL, rcL, clearText} from '../js/utils';

'use strict';
document.body.innerHTML =
'<div>' +
'  <span id="username" />' +
'  <button id="button" />' +
  '<span id="username" />'
'</div>';
test('gs test', () => {
  const div = getEl('div')
  expect(div).toBeTruthy();
  const a = getEl('a')
  expect(a).not.toBeTruthy();
});

test('gsa test', () => {
  const spans = getElAll('span')
  expect(spans).toHaveLength(2);
});