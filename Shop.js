class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      var name = item.name;
      if (name.includes('Sulfuras')) {    //skip entirely if item is Sulfuras
        continue;
      }
      else if (name.includes('Aged Brie')) {
        updateBrie(item);
      }
      else if (name.includes('Backstage passes')) {
        updateConcertTicket(item);
      } 
      else if (name.includes('Conjured')) {
        updateConjuredItem(item);
      }
      else {
        updateRegularItem(item);
      }
      checkQualityBounds(item);
    }
    return this.items;

    function updateSellIn(item) {
      item.sellIn--;
    }

    function updateBrie(item) {
      if (item.quality < 50) {
        item.quality++;
      }
      updateSellIn(item);
    }

    function updateConcertTicket(item) {
      if (item.sellIn <= 0) {
        item.quality = 0;
      }
      else if (item.sellIn < 6) {
        item.quality += 3
      }
      else if (item.sellIn < 11) {
        item.quality += 2;
      }
      else {
        item.quality++;
      }
      updateSellIn(item);
    }

    function updateConjuredItem(item) {
      if (item.sellIn <= 0) {    // conjured item
        item.quality -= 4;
      }
      else {
        item.quality -= 2;
      }
    }

    function updateRegularItem(item) {
      if (item.sellIn <= 0) {    // regular item
        item.quality -= 2; //regular item quality decrease twice as fast if sellIn <= 0
      }
      else {
        item.quality--;  //regular items decrease if sellIn > 0
      }
    }

    function checkQualityBounds(item) {
      if (item.quality > 50) {     // ensures the quality stays at or under 50 
        item.quality = 50;
      }
      if (item.quality < 0) { // ensures the quality stays at or above 0
        item.quality = 0;
      }
      //multiply
    }
  }
}

/*
  What happens to Sulfuras
    -nothing
  What happens to Aged Brie
    - -1 sellIn
    - +1 quality <= 50
  What happens to Backstage passes 
    - -1 sellIn
    - +1/+2/+3/0 quality depending on sellIn <= 50
  What happens to regular
    - -1 sellIn >= 0
    - -1 quality >= 0

  */

module.exports = Shop;