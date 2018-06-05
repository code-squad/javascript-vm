

'use strict';
jest.mock('../js/assets.js');

test('displays dom ContentLoaded', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';
  // This module has a side-effect

  const {vendingMachineView}  = require('../js/vendingMaching.js')
  const {qs}  = require('../js/utils.j')
  const $ = require('jquery');
  const fetchCurrentUser = require('../fetchCurrentUser');

  // Tell the fetchCurrentUser mock function to automatically invoke
  // its callback with some data
  fetchCurrentUser.mockImplementation(cb => {
    cb({
      fullName: 'Johnny Cash',
      loggedIn: true,
    });
  });

  // Use jquery to emulate a click on our button
  $('#button').click();

  // Assert that the fetchCurrentUser function was called, and that the
  // #username span's inner text was updated as we'd expect it to.
  expect(fetchCurrentUser).toBeCalled();
  expect($('#username').text()).toEqual('Johnny Cash - Logged In');
});

qs('.snack-list').click(() => {
  fetchCurrentUser(user => {
    const loggedText = 'Logged ' + (user.loggedIn ? 'In' : 'Out');
    $('#username').text(user.fullName + ' - ' + loggedText);
  });
});
