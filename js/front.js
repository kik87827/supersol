if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

window.addEventListener("load",()=>{
	bottomLayer();
})

function popupShow(option){
	const targetDom = document.querySelector(option.target);
	const bodyDom = document.querySelector("body");
	const closeDom = document.querySelectorAll(".close_trigger");
	let touchstart = "ontouchstart" in window;
	let setTime = 0;
	bodyDom.append(targetDom);
	targetDom.classList.add("active");
	if(setTime){clearTimeout(setTime)}
	setTime = setTimeout(()=>{
		targetDom.classList.add("motion");
		if(touchstart){
			bodyDom.classList.add("touchDis");
		}
	},20);

	// event
	if(!!closeDom){
		closeDom.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisItem = e.currentTarget;
				const thisItemParent = thisItem.closest(".popup_wrap");
				popupHide({ targetDom : thisItemParent });
			});	
		});
	}
}


function popupHide(option){
	const targetDom = document.querySelector(option.target) || option.targetDom;
	const bodyDom = document.querySelector("body");
	let setTime = 0;
	targetDom.classList.remove("motion");
	bodyDom.classList.remove("touchDis");
	if(setTime){clearTimeout(setTime)}
	setTime = setTimeout(()=>{
		targetDom.classList.remove("active");
	},520);
}

function bottomLayer(){
	const btn_bottom_layer = document.querySelector(".btn_bottom_layer");
	const page_wrap = document.querySelector(".page_wrap");

	if(!!btn_bottom_layer && !!page_wrap){
		page_wrap.style.paddingBottom = btn_bottom_layer.getBoundingClientRect().height + "px";
	}
}

function agreeFunc(){
	const agree_toggle_onebox = document.querySelector(".agree_toggle_onebox");
	const agree_toggle_global_contents = document.querySelector(".agree_toggle_global_contents");
	const ok_form = document.querySelectorAll(".ok_form,.agree_toggle_bar .props_form");
	const total_agree = document.querySelector("#total_agree");
	if(!!agree_toggle_onebox){
		agree_toggle_onebox.addEventListener("click",(e)=>{

			//e.preventDefault();
			
			const thisTarget = e.currentTarget;
			const thisTargetProps = thisTarget.querySelector(".props_form");

			thisTarget.classList.toggle("active");
			agree_toggle_global_contents.classList.toggle("active");
			// thisTargetProps.checked = thisTarget.classList.contains("active");
		});
	}
	if(!!total_agree){
		total_agree.addEventListener("click",(e)=>{
			const thisTarget = e.currentTarget;
			ok_form.forEach((item)=>{
				item.checked = thisTarget.checked;
			});
		});
	}
}