### 시나리오 작성 


1. 돈을 쓴다 
- 돈 종류 갯수가 줄어든다. [O]
- 최종 돈을 쓴만큼 줄인다. [O]

2. 돈이 벤딩머신에 들어간다. 
- 벤딩머신에 투입된 돈이 나오고 
- 살 수 있는 목록이 나온다. 


->
뷰
data-money를  Model에 보내준다.
data-count의 갯수를 업데이트 한다. 
data-money만큼 totalMoney를 줄여준다.

Model 

walletMode이 돈 사용한 돈을 받아서 update하고 [O]
vendingMachine insertMoney를 호출한다.  [O]

insertMoney 
1. vendingMachine insertMoney만큼 돈이 저장된다. [O]
2. vendingMachineView의  입력된 돈 만큼 뷰를 업데이트 한다. -> 뷰 업데이트 메소드를 호출한다. [O]
3. vendingMachine 의 살 수 있는 목록을 확인하는 뷰의 displayCanBuyList의 메소드를  호출한다. [O]
4. insertMoney 횟수만큼 기록을 한다 [O]

순서데로 테스트 코드 진행 
