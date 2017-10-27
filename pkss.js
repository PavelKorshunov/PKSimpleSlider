/*
 * PKSimpleSlider.js v1.1.1
 * Author: Pavel Korshunov
 * 
 * Copyright (c) 2017
 * All right reserved
 */
function PKSimpleSlider(className, time, arrow)
{
	this.timer = time;
	this.classSlide = className;
	if(arrow === 'arrow')
	{
		this.arrow = arrow;
	}
	this.init();
};
//Инициализация функций
PKSimpleSlider.prototype.init = function()
{
	if(document.querySelector(this.classSlide) !== null)
	{
		this.DOMCollection();
		this.defaultStyle();
		if(this.arrow)
		{
			this.navigation();
		}
		this.listSlide();
	}
};
//DOM элементы
PKSimpleSlider.prototype.DOMCollection = function()
{
	this.slider = document.querySelector(this.classSlide);
	this.ul = this.slider.getElementsByTagName('ul');
	this.items = this.slider.getElementsByTagName('li');
};
//Устанавливаем стили всем элементам до запуска слайдера
PKSimpleSlider.prototype.defaultStyle = function()
{
	var count = 0;
	while(count < this.items.length)
	{
		count != 0 ? this.items[count].style.zIndex = 0 : this.items[count].style.zIndex = 1;
		count != 0 ? this.items[count].style.opacity = 0 : this.items[count].style.opacity = 1;
		count != 0 ? this.items[count].style.position = "absolute" : this.items[count].style.position = "relative";
		this.items[count].style.transition = "opacity 1000ms ease-in-out";
		count++;
	}
};
//Добавляем стрелки навигации, если установлен параметр arrow
PKSimpleSlider.prototype.navigation = function()
{
	this.nav = document.createElement('div');
	this.nav.className = "pkss_container";
	this.nav.innerHTML = 
	"<a href='#' class='pkss_arrow next'>></a>" +
	"<a href='#' class='pkss_arrow prev'><</a>";
	this.slider.appendChild(this.nav);

	this.next = this.nav.querySelector('.next');
	this.prev = this.nav.querySelector('.prev');
};
//
PKSimpleSlider.prototype.listSlide = function()
{
	var length = this.items.length - 1;
	var list = 0;
	//Устанавливаем стили для предыдущего и следующего слайда
	function setStyle(direction)
	{
		this.items[list].style.zIndex = 0;
		this.items[list].style.opacity = 0;
		this.items[list].style.position = "absolute";
		this.items[list].style.float = "none";

		if(direction === false)
		{
			list <= length && list >= 1 ? list-- : list = length;
		}
		else
		{
			list < length ? list++ : list = 0;
		}
		
		this.items[list].style.zIndex = 1;
		this.items[list].style.opacity = 1;
		this.items[list].style.position = "relative";
		this.items[list].style.float = "left";
		return list;
	};

	var setStyle = setStyle.bind(this);
	var listSlide = 0;
	//Запускаем и очищаем setInterval, при наведении и удалении мыши
	function startInterval()
	{
		if(listSlide == 0)
		{
			interval = setInterval(setStyle, this.timer);
		}
		else if(listSlide == 1)
		{
			clearInterval(interval);
		}
		listSlide = 0;
	}

	var startInterval = startInterval.bind(this);
	startInterval();
	//События клика и наведения
	if(this.next && this.prev)
	{
		this.next.addEventListener('click', function(e)
		{
			e.preventDefault();
			setStyle();
		});
		this.prev.addEventListener('click', function(e)
		{
			e.preventDefault();
			setStyle(false);
		});
	}

	this.slider.addEventListener('mouseenter', function()
	{
		listSlide = 1;
		startInterval();
	});
	this.slider.addEventListener('mouseleave', startInterval);
	
};

var PKSimpleSlider = new PKSimpleSlider('.pksimple-slider', 3000, 'arrow');