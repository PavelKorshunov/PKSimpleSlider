function PKSimpleSlider(className, time)
{
	this.timer = time;
	this.classSlide = className;
	this.init();
};

PKSimpleSlider.prototype.init = function()
{
	this.DOMCollection();
	this.defaultStyle();
	this.listSlide();
};

PKSimpleSlider.prototype.DOMCollection = function()
{
	this.slider = document.querySelector(this.classSlide);
	this.items = this.slider.getElementsByTagName('li');
};

PKSimpleSlider.prototype.defaultStyle = function()
{

	var count = 0;
	while(count < this.items.length)
	{
		count != 0 ? this.items[count].style.zIndex = 0 : this.items[count].style.zIndex = 1;
		count != 0 ? this.items[count].style.opacity = 0 : this.items[count].style.opacity = 1;
		this.items[count].style.transition = "opacity 1000ms ease-in-out";
		count++;
	}
};

PKSimpleSlider.prototype.listSlide = function()
{
	var length = this.items.length - 1;
	var list = 0;	
	function setStyle()
	{
		this.items[list].style.zIndex = 0;
		this.items[list].style.opacity = 0;
		
		list < length ? list++ : list = 0;
		this.items[list].style.zIndex = 1;
		this.items[list].style.opacity = 1;
	};

	setInterval(setStyle.bind(this), this.timer);
};

var PKSimpleSlider = new PKSimpleSlider('.pksimple-slider', 3000);
// console.log(PKSimpleSlider);

