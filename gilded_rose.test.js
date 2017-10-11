var Shop = require('./Shop');
var Item = require('./Item');

describe("Gilded Rose", function() {

	it('Name does not change after update', () => {
		const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
	    const items = gildedRose.updateQuality();
	    expect(items[0].name).toBe("foo");
    });

    it('Quality degrades twice as fast after sellIn is zero', () => {
		const gildedRose = new Shop([ new Item("foo", -1, 5) ]);
	    const items = gildedRose.updateQuality();
	    expect(items[0].quality).toBe(3);
    });

    it('Quality should never be negative', () => {
		const gildedRose = new Shop([ new Item("foo", 0, 0), new Item("foo2", -1, 1) ]);
	    const items = gildedRose.updateQuality();
	    expect(items[0].quality).toBe(0);
	    expect(items[1].quality).toBe(0);
    });

    it('Aged Brie should always increase in value', () => {
    	const gildedRose = new Shop([ new Item("Aged Brie", 0, 0) ]);
        const prevQuality = gildedRose.items[0].quality; 
    	const items = gildedRose.updateQuality();
    	expect(items[0].sellIn).toBe(-1);
    	expect(items[0].quality).toBeGreaterThan(prevQuality);
    });

    it('Aged Brie should increase by 1', () => {
    	const gildedRose = new Shop([ new Item("Aged Brie", 3, 1) ]);
        const prevQuality = gildedRose.items[0].quality; 
    	const items = gildedRose.updateQuality();
    	expect(items[0].sellIn).toBe(2);
    	expect(items[0].quality).toBe(2);
    });

    /*

    it('Aged Brie should increase by 1 beta', () => {
    	const gildedRose = new Shop([ new Item("Aged Brie", 0, 0) ]);
        const prevQuality = gildedRose.items[0].quality; 
    	const items = gildedRose.updateQuality();
    	expect(items[0].sellIn).toBe(-1);
    	expect(items[0].quality).toBe(1);
    });

    */

    it('Quality never goes above 50', () => {
    	const gildedRose = new Shop([ new Item("Aged Brie", 0, 50) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toEqual(50);
    });

    it('Sulfuras never change their sellIn or Quality', () => {
    	const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ]);
    	const prevSellIn = gildedRose.items[0].sellIn; 
    	const prevQuality = gildedRose.items[0].quality; 
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(prevQuality);
    	expect(items[0].quality).toBe(80);
    	expect(items[0].sellIn).toBe(prevSellIn);
    });

    it('Backstage passes increase as sellIn approaches', () => {
    	const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(11);
    });

    it('Backstage passes increase by 2 as sellIn approaches (<= 10 days)', () => {
    	const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(12);
    	expect(items[1].quality).toBe(12);
    });

    it('Backstage passes increase by 3 as sellIn approaches (<= 5 days)', () => {
    	const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(13);
    	expect(items[1].quality).toBe(13);
    });

    it('Backstage passes quality is zero after concert', () => {
    	const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10), new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(0);
    	expect(items[1].quality).toBe(0);
    });

    it('Conjured items degrade 2x', () => {
    	const gildedRose = new Shop([ new Item("Conjured", 5, 5) ]);
    	const items = gildedRose.updateQuality();
    	expect(items[0].quality).toBe(3);
    });

});
