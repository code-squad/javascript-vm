const basicTemp = `<div class="vending_machine_wrap">
<div class="item_display">
  <ul class="item_list_container"></ul>
</div>
<div class="payment_display">
  <div class="current_coin_display">
    <div class="current_coin">0원</div>
  </div>
  <div class="coin_button_container">
    <ul class="coin_button_list_container">
      <li class="coin_button_item">
        <div data-select="1" class="coin_button">1</div>
      </li>
      <li class="coin_button_item">
        <div data-select="2" class="coin_button">2</div>
      </li>
      <li class="coin_button_item">
        <div data-select="3" class="coin_button">3</div>
      </li>
      <li class="coin_button_item">
        <div data-select="4" class="coin_button">4</div>
      </li>
    </ul>
  </div>
  <div class="progress_display">
    <div class="progress_container">
      <ul class="log_list">
      </ul>
    </div>
    <div class="receive_container">
      <ul class="image_list">
      </ul>
    </div>
  </div>
</div>
</div>

<div class="wallet">
  <div class="wallet_container">
    <ul class="money_list"></ul>
  </div>
  <div class="full_amount">
    <span></span>
  </div>
</div>`;

export { basicTemp };