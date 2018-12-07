if(typeof L === 'undefined') {
    L = {};
}

(function($) {
    // https://github.com/carhartl/jquery-cookie/blob/master/src/jquery.cookie.js
    if(!$.cookie) {
        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s;
            } catch(e) {}
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }

        var config = $.cookie = function (key, value, options) {
            if (arguments.length > 1 && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
                }

                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
            }

            var result = key ? undefined : {},
                cookies = document.cookie ? document.cookie.split('; ') : [],
                i = 0,
                l = cookies.length;
            for (; i < l; i++) {
                var parts = cookies[i].split('='),
                    name = decode(parts.shift()),
                    cookie = parts.join('=');
                if (key === name) {
                    result = read(cookie, value);
                    break;
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function (key, options) {
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return !$.cookie(key);
        };
    }
})(jQuery);

L.i18n = {
    cache: 'LS_LOCALE_',
    map: {},
    getContextPath: function() {
        return window.location.pathname.substring(0, window.location.pathname
                        .indexOf("/", 2));
    },
    loadLanguages: function(settings) {
        var cache = $.cookie(L.i18n.cache + settings.locale) || $.cookie(L.i18n.cache);
        if(cache) {
            cache = JSON.parse(cache);
            L.i18n.map = cache.resources;
            $.ajax({
                url: settings.scriptUrl + '/' + cache.locale + '.js?_=' + new Date().getTime(),
                dataType: 'script',
                async: false
            });
        } else {
            $.ajax({
                url: L.i18n.getContextPath() + '/service/i18n/resources',
                async: false,
                data: {
                    locale: settings.locale
                }
            })
            .done(function(result) {
                if(settings.locale) {
                    $.cookie(L.i18n.cache + settings.locale, JSON.stringify(result));
                } else {
                    $.cookie(L.i18n.cache, JSON.stringify(result));
                }
                L.i18n.map = result.resources;
                $.ajax({
                    url: settings.scriptUrl + '/' + result.locale + '.js?_=' + new Date().getTime(),
                    dataType: 'script',
                    async: false
                });
            });
        }
    }
};

L.getLocaleMessage = function(code, message) {
    // 根据关键字获取翻译后的字符串
    var value = L.i18n.map[code] || message;
    
    // 如果翻译后的字符串不包含"{}"则直接返回
    if(value.indexOf('{') == -1) {
        return value;
    }
    
    // 如果参数>1,且翻译后的字符串中含有占位符
    var param = [];
    var len = arguments.length;
    if(len > 2 && $.isArray(arguments[2])) {
        param = arguments[2];
    } else {
        for(var i = 2, len = arguments.length; i < len; i++) {
            param.push(arguments[i]);
        }
    }
    
    var i = 0, arr = [];
    while(i < value.length) {
        if(value.charAt(i) == '{') {
            var j = value.indexOf('}', i + 1);
            if(j == -1) {
                i++;
            } else {
                var index = parseInt(value.substring(i + 1, j));
                if(!isNaN(index) && index >= 0) {
                    var s = value.substring(0, i);
                    if(s) {
                        arr.push(s)
                    };
                    arr.push(index < param.length ? param[index] : '');
                    i = 0;
                    value = value.substring(j + 1);
                } else {
                    i = j + 1;
                }
            }
        } else {
            i++;
        }
    }
    if(value) {
        arr.push(value);
    }
    return arr.join('');
};

(function($) {
    // scriptUrl: 配置JS语言包的加载路径
    L.i18n.loadLanguages({
        locale: $.cookie('lsLocale'),
        scriptUrl: L.i18n.getContextPath() + "/skins/js/i18n"
    });
})(jQuery);