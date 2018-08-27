import LogView from '../js/LogView.js'

describe('logMessage가 잘나오는지 확인한다', () => {
  //given
  const logBox = document.createElement('div');
  const logView = new LogView(logBox);
  beforeEach(() => {
    logView.resetLogBox();
  })
  test('상황에 맞는 메시지를 logBox에 출력한다.', () => {
    const insertCoin = 1000;
    logView.showMessage('INSERT_MONEY', insertCoin);
    expect('<p>1000원이 투입됐음.</p>').toBe(logBox.innerHTML);
  })
  test('logMessage가 10개이상 출력됐을 때 리셋해준다.', () => {
    //given
    const spy = jest.spyOn(logView, 'resetLogBox');
    const insertCoin = 1000;
    logView.logCount = 11;
    //when
    logView.showMessage('INSERT_MONEY', insertCoin);
    //then
    expect(logView.resetLogBox).toBeCalled();
  })
})