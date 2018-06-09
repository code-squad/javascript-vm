const { gs,gsA,ut,acL,rcL,ct,} = require("../js/utils")

'use strict';
document.body.innerHTML =
'<div>' +
'  <span id="username" />' +
'  <button id="button" />' +
  '<span id="username" />'
'</div>';
test('gs test', () => {
  const div = gs('div')
  expect(div).toBeTruthy();
  const a = gs('a')
  expect(a).not.toBeTruthy();
});

test('gsa test', () => {
  const spans = gsA('span')
  expect(spans).toHaveLength(2);
});