/* 
	******************************************************
		Name: vir-navbar-3.2.js
		Description: 
			Navbar creator javascript for 
			(v3) VIR navigation bar
		Release-date: 2009-08-29
	******************************************************
*/

/* printNavbar(parameters)
 * parameters: {
 * 	loginLink: if set, login link will be showed
 * 	logoutLink: if set, logout link will be showed
 * 	loggedIn: if both loginLink and logoutLink are set, this shows which one we will use
 * 	theme: theme name (if not set: default theme)
 * 	width: navbar size in pixels (if not set or not a number: 100%)
 * 	container: id of container (if not set: document body)
 * }
 */
function printNavbar(parameters) {
	/* constants */
	var config = {};
	config.corner = false; /* this shows if we use the corner-mini-navbar */
	config.protocol = ((document.location.protocol == "https:") ? "https" : "http");
	config.menuWidth = 137; /* width of menus (as in CSS) */
	config.menuHeight = 25; /* height of menus/menuitems */
	config.positionHorizontal = 'left'; /* default horizontal alignment */
	config.positionVertical = 'top'; /* default vertical alignment */
	config.indentHorizontal = 0; /* default horizontal alignment */
	config.indentVertical = 0; /* default vertical alignment */
	config.loginPage = 'https://idp.sch.bme.hu/opensso/UI'; // login page, don't show li'l locks on this page
	config.fixed = false; /* whether to use fixed, or absolute position */
	var defaultTheme = 'grey'; /* default theme */
	/* available applications, in hierarchy */
	var applications = [
		{
			icon: 'profil',
			title: 'profil',
			url: 'https://profile.sch.bme.hu/profile',
			location: 'profile.sch.bme.hu/profile'
		},{
			icon: 'korok',
			title: 'körök',
			url: 'https://korok.sch.bme.hu/korok',
			location: 'korok.sch.bme.hu/korok'
		},{
			icon: 'news',
			title: 'news',
			url: 'https://news.sch.bme.hu/',
			hint: 'Villanykari hírek, egy helyen',
			domain: 'news.sch.bme.hu'
		},{
			icon: 'services',
			title: 'szolgáltatások',
			subItems: [
				{
					title: 'wiki',
					url: 'https://wiki.sch.bme.hu/',
					loginUrl: 'https://wiki.sch.bme.hu/bin/kirloginform?path=/Main/WebHome/',
					domain: 'wiki.sch.bme.hu'
				},{
					title: 'kb',
					url: 'https://kb.sch.bme.hu/',
					loginUrl: 'https://kb.sch.bme.hu/sso-login.php?return=https://kb.sch.bme.hu/',
					domain: 'kb.sch.bme.hu'
				},{
					title: 'levlisták',
					url: 'https://lists.sch.bme.hu/',
					domain: 'lists.sch.bme.hu'
				},{
					title: 'messenger',
					url: 'https://messenger.sch.bme.hu/',
					domain: 'messenger.sch.bme.hu'
				},{
					title: 'blog',
					url: 'http://blog.sch.bme.hu/',
					loginUrl: 'http://blog.sch.bme.hu/htsrv/login.php',
					domain: 'blog.sch.bme.hu'
				},{
					title: 'printer',
					url: 'http://printer.sch.bme.hu',
					loginUrl: 'https://printer.sch.bme.hu/printprofil/trigger.php',
					domain: 'printer.sch.bme.hu'
				}
			]
		},{
			icon: 'community',
			title: 'közösség',
			subItems: [
				{
					title: 'simonyi',
					url: 'http://simonyi.bme.hu/',
					domain: 'simonyi.bme.hu'
				},{
					title: 'kir-dev',
					url: 'https://kir-dev.sch.bme.hu/',
					loginUrl: 'https://kir-dev.sch.bme.hu/wp-login.php',
					domain: 'kir-dev.sch.bme.hu'
				},{
					title: 'könyvtár',
					url: 'http://konyvtar.sch.bme.hu/',
					loginUrl: 'https://konyvtar.sch.bme.hu/sso-login.php?return=http://konyvtar.sch.bme.hu/',
					domain: 'konyvtar.sch.bme.hu'
				},{
					title: 'bbk',
					url: 'http://bbk.sch.bme.hu/',
					domain: 'bbk.sch.bme.hu'
				},{
					title: 'pizzásch',
					url: 'http://pizzasch.sch.bme.hu/',
					domain: 'pizzasch.sch.bme.hu'
				},{
					title: 'spot',
					url: 'http://spot.sch.bme.hu/',
					domain: 'spot.sch.bme.hu'
				},{
					title: 'dsk',
					url: 'http://dsk.sch.bme.hu/',
					domain: 'dsk.sch.bme.hu'
				}
			]
		},{
			icon: 'other',
			title: 'egyéb',
			subItems: [
				{
					title: 'neptun',
					url: 'http://neptun.bme.hu/'
				},{
					title: 'kth',
					url: 'http://www.kth.bme.hu/'
				},{
					title: 'vik.bme',
					url: 'https://www.vik.bme.hu/'
				}
			]
		},{
			icon: 'sso',
			title: 'súgó',
			right: true,
			id: 'help',
			subItems: [
				{
					title: 'support',
					id: 'support'
				},{
					title: '-',
				},{
					title: 'SSO ismertető',
					url: 'http://kir-dev.sch.bme.hu/redmine/wiki/vip/InformacioFelhasznaloknak'
				},{
					title: 'alkalmazások',
					url: 'https://kir-dev.sch.bme.hu/sso/'
				}
			]
		},{
			icon: 'app',
			id: 'appmenu',
			title: 'helyi',
			right: true,
		},{
			id: 'login',
			right: true,
		}
	];
	/* valid themes */
	var themes = new Array();
	themes['red'] = 'red';
	themes['blue'] = 'blue';
	themes['orange'] = 'orange';
	themes['green'] = 'green';
	themes['grey'] = 'grey';
	themes['black'] = 'black';
	/* add css stylesheet to page */
	var new_css  = document.createElement('link');
	new_css.rel = 'stylesheet'
	new_css.type = 'text/css';
	new_css.href = config.protocol+'://idp.sch.bme.hu/navbar/css/style-navbar-3.2.css';
	/* set type */
	if (parameters.type && parameters.type == 'corner') {
		//width = config.menuWidth+'px';
		config.corner = true;
	}
	document.getElementsByTagName('head')[0].appendChild(new_css);
	if (parameters.fixed)
		config.fixed = true;
	/* parsing login/logout link */
	if (parameters.loginLink && parameters.logoutLink && parameters.loggedIn)
		parameters.loginLink = '';
	if (parameters.loginLink) config.loginLink = parameters.loginLink;
	if (parameters.logoutLink) config.logoutLink = parameters.logoutLink;
	/* parsing support link */
	if (parameters.support) {
		config.support = new String(parameters.support);
		config.support = config.support.replace(/ +(kukac|at) +/gi,'@').replace(/ +(pont|dot) +/,'.');
	}
	/* setting theme */
	config.theme = parameters.theme || defaultTheme;
	if (themes[config.theme] == undefined || typeof(themes[config.theme]) != 'string')
		config.theme = defaultTheme;
	/* width could be min 650, max. 1700 px */
	var width = parseInt(parameters.width);
	if (! width)
		config.width = '100%';
	else {
		if (width<650 || width>1700)
			width = 950;
		config.width = width + 'px';
	}
	/* app menu settings */
	if (parameters.menuItems) config.appMenuItems = parameters.menuItems; /* additional menuitem into the 'app' menu */
	if (parameters.helpMenuItems) config.helpMenuItems = parameters.helpMenuItems; /* additional menuitem into the 'help' menu */
	width = parseInt(parameters.menuWidth); /* width of 'app' menu */
	if (width) {
		if (width<config.menuWidth || width>300)
			width = config.menuWidth;
		config.appMenuWidth = width;
	}
	/* set orientation (on the bottom? on the right?) */
	if (parameters.positionVertical && parameters.positionVertical == 'bottom')
		config.positionVertical = 'bottom';
	if (parameters.positionHorizontal && parameters.positionHorizontal == 'right')
		config.positionHorizontal = 'right';
	/* set indentation (horizontal and vertical) */
	var tmp = parseInt(parameters.indentHorizontal);
	if (tmp && config.corner) {
		if (tmp>0 && tmp<=200)
			config.indentHorizontal = tmp;
	}
	tmp = parseInt(parameters.indentVertical);
	if (tmp) {
		if (tmp>0 && tmp<=200)
			config.indentVertical = tmp;
	}
	/* generate container elements */
	var items = document.createElement('ul');
	items.id = 'navbar3-menu';
	if (! config.corner)
		items.style.width = config.width;
	if (config.corner)
		items.style[config.positionVertical] = (config.menuHeight-3)+'px';
	else
		items.style[config.positionVertical] = '0';
	items.style[config.positionHorizontal] = '0';
	var outerDiv = document.createElement('div');
	outerDiv.id = 'navbar3';
	var classType = config.corner?'corner':'wide';
	outerDiv.className = 'navbar_'+config.theme+' '+classType+' pos_'+config.positionVertical+' pos_'+config.positionHorizontal;
	outerDiv.style[config.positionVertical] = config.indentVertical+'px';
	outerDiv.style[config.positionHorizontal] = config.indentHorizontal+'px';
	if (config.fixed)
		outerDiv.style['position'] = 'fixed';
	outerDiv.appendChild(items);
	if (config.corner) {
		var virspan = document.createElement('span');
		virspan.innerHTML = 'VIR-menu';
		outerDiv.appendChild(virspan);
	}
	/* rendering applications items and submenus */
	_render_apps(items, config, applications, false);
	/* printing into document */
	var container;
	if (parameters.container && (container = document.getElementById(parameters.container)))
		container.appendChild(outerDiv);
	else
		document.getElementsByTagName('body')[0].appendChild(outerDiv);
}

function _render_apps(container, config, apps, inAppMenu) {
	var i;
	var listActive = false;
	for (i=0; i<apps.length; i++) if (apps[i] != undefined) {
		var active = false;
		var app = apps[i];
		if (! inAppMenu)
			active = app.domain && document.domain == app.domain;
		if (app.location) {
			active = (new String(document.location)).match(app.location);
		}
		var skip = false;
		var li = document.createElement('li');
		var subItems;
		if (! inAppMenu)
			subItems = app.subItems || (app.id == 'appmenu' ? config.appMenuItems : '');
		if (app.id == 'help' && config.helpMenuItems) {
			subItems = config.helpMenuItems.concat(subItems);
		}
		if (subItems) {
			var innerList = document.createElement('ul');
			if (config.corner) {
				innerList.style[config.positionHorizontal] = (config.menuWidth+22)+'px';
				innerList.style[config.positionVertical] = '0';
			} else
				innerList.style[config.positionVertical] = (config.menuHeight-2)+'px';
			innerList.style.width = (app.subItems?config.menuWidth:(config.appMenuWidth?config.appMenuWidth:config.menuWidth))+'px';
			active = _render_apps(innerList, config, subItems, ! app.subItems);
			li.appendChild(innerList);
			var title = document.createElement('span');
			title.innerHTML = app.title;
			if (app.icon)
				title.className = 'icon-'+app.icon;
			li.appendChild(title);
			//if (config.corner) {
				var littleArrow = document.createElement('div');
				littleArrow.className = 'arrow';
				li.appendChild(littleArrow);
			//}
		} else {
			if (app.title == '-') {
				li.innerHTML = '<hr />';
				li.className = 'nbmenu_separator';
			} else {
				if (app.loginUrl && ! inAppMenu && ! (new String(document.location)).match(config.loginPage)) {
					var login = document.createElement('a');
					login.href = app.loginUrl;
					if (app.loginHint)
						login.title = app.loginHint;
					login.className = 'lock';
					li.appendChild(login);
				}
				var a = document.createElement('a');
				if (app.id && ! inAppMenu) {
					if (app.id == 'appmenu') {
						skip = true;
					} else if (app.id == 'login') {
						if (config.loginLink) {
							a.className = 'icon-login';
							a.href = config.loginLink;
							a.innerHTML = 'bejelentkezés';
						} else if (config.logoutLink) {
							a.className = 'icon-logout';
							a.href = config.logoutLink;
							a.innerHTML = 'kijelentkezés';
						} else {
							skip = true;
						}
					} else if (app.id == 'support') {
						if (config.support) {
							a.innerHTML = app.title;
							a.target = '_blank';
							if (config.support.indexOf('@')>0)
								a.href = "mailto:"+config.support;
							else
								a.href = "http://support.sch.bme.hu/new/"+config.support;
							a.title = 'Segítség kérése, hiba bejelentése, stb.';
						} else
							skip = true;
					} else
						skip = true;
				} else {
					a.innerHTML = app.title;
					a.href = app.url;
					if (app.hint)
						a.title = app.hint;
					if (app.icon && ! inAppMenu)
						a.className = 'icon-'+app.icon;
				}
				li.appendChild(a);
			}
		}
		if (! skip) {
			if (active)
				li.className = 'actual';
			if (app.right && ! config.corner && ! inAppMenu)
				li.className = (active?'actual ':'')+'float_right';
			container.appendChild(li);
			listActive = listActive || active;
		}
	}
	return listActive;
}
