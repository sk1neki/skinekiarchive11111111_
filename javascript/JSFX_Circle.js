/******************************************************************* 
* File    : JSFX_Circle.js  © JavaScript-FX.com
* Created : 2001/08/19 
* Author  : Roy Whittle  (Roy@Whittle.com) www.Roy.Whittle.com 
* Purpose : A mouse trailer based on a script by Doc Ozone - www.ozones.com
*           as seen at http://www.wsabstract.com/script/script2/cursoreffect.shtml
* History 
* Date         Version        Description 
* 2001-08-19	1.0		First converted version
* 2001-08-28	1.1		Added the text version
* 2001-12-06	1.2		Removed the need for JSFX_PlayField.js
***********************************************************************/ 
/*** Create a static method for creating Circle Objects ***/
JSFX.Circle = function(theImage, max, radius, speed)
{
	return new JSFX.CircleObj(theImage, max, radius, speed);
}

/*
 * Class CircleObj extends Object
 */
JSFX.CircleObj = function(theImage, max, radius, speed)
{
	var i;
	var htmlStr = "<IMG SRC='"+theImage+"'>";
	if(max == null) max=10;
	if(radius == null) radius = 200;
	if(speed == null) speed = 0.2;

	this.id = "JSFX_CircleObj_"+JSFX.CircleObj.count++;
	this.sprites = new Array();

	for(i=0 ; i<max ; i++)
		this.sprites[i] = new JSFX.CircleSprite(htmlStr, i, max, radius, speed);

	window[this.id]=this;
	this.animate();
}
JSFX.CircleObj.count = 0;
JSFX.CircleObj.prototype.animate = function()
{
	setTimeout("window."+this.id+".animate()", 40);

	for(i=0 ; i<this.sprites.length ; i++)
		this.sprites[i].animate();

}
/*** END Class CircleObj***/

/*** Create a static method for creating Circle Text Objects ***/
JSFX.CircleText = function(theStr, font, color, size, radius, speed)
{
	return new JSFX.CircleTextObj(theStr, font, color, size, radius, speed);
}

/*
 * Class CircleTextObj extends Object
 */
JSFX.CircleTextObj = function(theStr, font, color, size, radius, speed)
{
	var i;
	var max=theStr.length;
	if(radius == null) radius = 200;
	if(speed == null) speed = 0.2;

	this.id = "JSFX_CircleObj_"+JSFX.CircleObj.count++;
	this.sprites = new Array();

	for(i=0 ; i<max ; i++)
		this.sprites[i] = new JSFX.CircleSprite("<FONT FACE='"+font+"' SIZE='"+size+"' COLOR='"+color+"'>"+theStr.charAt(i)+"</FONT>", i, max, radius, speed);

	window[this.id]=this;
	this.animate();
}
JSFX.CircleTextObj.prototype.animate = JSFX.CircleObj.prototype.animate;

/*
 * Class CircleSprite extends Layer
 */
JSFX.CircleSprite = function(htmlStr, n, max, radius, speed)
{
	this.superC = JSFX.Layer;
	this.superC(htmlStr);

	this.x 	= Math.random() * (JSFX.Browser.getMaxX()-40);
	this.y 	= Math.random() * (JSFX.Browser.getMaxY()-40);
	this.r	= radius;
	this.s	= speed;
	this.a 	= -(2 * n * Math.PI/max);
	this.targetX = 200 + this.r * Math.sin(this.a);
	this.targetY = 200 + this.r * Math.cos(this.a);
	this.show();
}
JSFX.CircleSprite.prototype = new JSFX.Layer;

JSFX.CircleSprite.prototype.animate = function()
{
	var mx = JSFX.Browser.mouseX;
	var my = JSFX.Browser.mouseY;
	var dir = this.s;

	if(my < JSFX.Browser.getMaxY()/2)
	{
		if(mx < JSFX.Browser.getMaxX()/2)
			dir = -dir;
	}
	else
	{
		if(mx > JSFX.Browser.getMaxX()/2)
			dir = -dir;
	}

	this.a += dir
	this.targetX = mx + this.r * Math.sin(this.a) - 10;
	this.targetY = my + this.r * Math.cos(this.a) - 10;
	this.x += (this.targetX - this.x)/20;
	this.y += (this.targetY - this.y)/20;

	this.moveTo(this.x, this.y);
}
