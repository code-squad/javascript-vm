import {getEl, getElAll,updateText, addClassToList, removeClassToList, clearText} from '../js/utils';

'use strict';
document.body.innerHTML =
'<div>' +
'  <span id="username" />' +
'  <button id="button" />' +
  '<span id="username" />'
'</div>';
test('getEl test 원하는 선택자로 el들을 잘 가지고 오는지 test', () => {
  const div = getEl('div')
  expect(div).toBeTruthy();
  const a = getEl('a')
  expect(a).not.toBeTruthy();
});

//test('getelall은 document를 기준으로 일치하는 노드리스트를 반환해야 한다..', () => {
test('document에 span태그가 딱 두 개가 있는상태에서, getelall을 호출했을때, 2를 반환해야한다.', () => {
  const spans = getElAll('span')
  expect(spans).toHaveLength(2);
});