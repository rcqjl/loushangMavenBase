/**
 * 在jQuery命名空间上增加新函数
 */
(function($) {
	$
			.extend({
				/**
				 * 给一个对象的属性赋值：把配置中的所有属性都拷贝给该对象
				 * 
				 * @param {Object}
				 *            o 需要赋值的对象
				 * @param {Object}
				 *            c 配置
				 * @param {Object}
				 *            defaults 默认值
				 * @return {Object} 目标对象
				 */
				apply : function(o, c, defaults) {
					if (defaults) {
						$.apply(o, defaults);
					}
					if (o && c && typeof c == 'object') {
						for ( var p in c) {
							o[p] = c[p];
						}
					}
					return o;
				},
				/**
				 * 同方法apply，但只对目前值为undefined的属性赋值
				 * 
				 * @param {Object}
				 *            obj 需要赋值的对象
				 * @param {Object}
				 *            c 配置
				 * @return {Object} 目标对象
				 */
				applyIf : function(o, c) {
					if (o && c) {
						for ( var p in c) {
							if (typeof o[p] == "undefined") {
								o[p] = c[p];
							}
						}
					}
					return o;
				},
				/**
				 * 给指定类增加属性或方法，覆盖原先的同名属性或方法
				 * 
				 * @param {Object}
				 *            origclass 指定类
				 * @param {Object}
				 *            overrides 属性/方法集合
				 * @method override
				 */
				override : function(origclass, overrides) {
					if (overrides) {
						var p = origclass.prototype;
						for ( var method in overrides) {
							p[method] = overrides[method];
						}
//						if (navigator.userAgent
//								&& overrides.toString != origclass.toString) {
//							p.toString = overrides.toString;
//						}
					}
				},
				/**
				 * 将一个类变为另一个类的子类，或者定义一个新的类：某个指定类的子类
				 * 
				 * @private
				 * @param {Function}
				 *            sub 子类
				 * @param {Function}
				 *            sup 父类
				 * @param {Object}
				 *            overrides (optional) 给子类增加的方法或属性,会覆盖原先的同名属性或方法
				 * @return {Function} 子类构造函数.
				 */
				inherit : function() {
					// 内联函数
					var io = function(o) {
						for ( var m in o) {
							this[m] = o[m];
						}
					};
					var oc = Object.prototype.constructor;

					return function(sub, sup, overrides) {
						// 只有两个参数的调用方式--直接创建一个新的子类
						if (typeof sup == 'object') {
							overrides = sup;
							sup = sub;
							// overrides里定义了构造函数就用overrides里定义的，否则生成一个缺省的
							// 缺省的构造函数只是简单调用父类的构造函数
							sub = overrides.constructor != oc ? overrides.constructor
									: function() {
										sup.apply(this, arguments);
									};
						}
						var supp = sup.prototype;
						// 创建一个匿名类，和父类具有相同原型、但构造函数没有参数
						var F = function() {
						};
						F.prototype = supp;
						// 设置子类的原型是匿名类的一个实例
						var subp = sub.prototype = new F();
						// 重置、修正子类的constructor属性
						subp.constructor = sub;
						// 增加superclass属性，目的就是构造虚拟指针指向父类，让子类可以调用到父类的方法，包括构造方法
						sub.superclass = supp;

						if (supp.constructor == oc) {
							supp.constructor = sup;
						}

						// 将overrides里的属性和方法拷贝给子类原型
						$.override(sub, overrides);

						// 子类增加静态方法override,方便替换子类原型的方法
						sub.override = function(o) {
							$.override(sub, o);
						};

						// 子类增加实例方法override，方便替换子类实例的方法
						subp.override = io;

						return sub;
					};
				}(),
				
				btn : function(options){
					var defaults = {
							id : 'btn_',
							clazz : 'btnIcon',
							title : L.getLocaleMessage("BPM.INFOPROCESSMODEL.D163","大按钮")
					};
					
					var options = $.extend(defaults, options);
					var btnTmpl = '<li>' +
							'<a class="btn" href="javascript:;">' +
								'<div></div>' +
								'<span></span>' +
							'</a>' + 
						'</li>';
					
					var $btn = $(btnTmpl);
					$btn.attr('id', options.id);
					$btn.find('a').attr({
						title : options.title
					});
					$btn.find('div').addClass(options.clazz);
					
					if(options.title){
						$btn.find('span').html(options.title);
					}
					
					return $btn;
				}
			});
})(jQuery);