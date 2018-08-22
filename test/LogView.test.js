import LogView from '../js/LogView.js'

describe('logMessage가 잘나오는지 확인한다', () => {
  //given
  const logBox = document.createElement('div');
  const logView = new LogView(logBox);
  beforeEach(() => {
    logView.logingBox.innerHTML = "";
  })
  test('돈을 넣었을 때 logMessage를 출력한다.', () => {
    //when
    logView.showInsertMoney(500);
    //then
    expect(logView.logingBox.innerHTML).toBe('<p>500원이 투입됐음.</p>');
  })
  test('돈이 부족했을 때 logMessage를 출력한다.', () => {
    //when
    logView.showLackYourMoney(500);
    //then
    expect(logView.logingBox.innerHTML).toBe(logView.logingBox.innerHTML)
  })
  test('물품이 없을 때 메시지를 출력한다.', () => {
    //when
    logView.showNoItem();
    //then
    expect('<p>해당 번호의 물품이 존재하지 않습니다.</p>').toBe(logView.logingBox.innerHTML)
  })
  test('logMessage가 10개이상 출력됐을 때 리셋해준다.', () => {
    //given
    const spy = jest.spyOn(logView, 'resetLogBox');
    logView.logCount = 11;
    //when
    logView.showLackInputMoney();
    //then
    expect(logView.resetLogBox).toBeCalled();
  })
})