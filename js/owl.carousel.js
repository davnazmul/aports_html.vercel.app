"function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a, new b
    }),
    function(a, b, c) {
        var d = {
            init: function(b, c) {
                var d = this;
                d.$elem = a(c), d.options = a.extend({}, a.fn.owlCarousel.options, d.$elem.data(), b), d.userOptions = b, d.loadContent()
            },
            loadContent: function() {
                function d(a) {
                    var c, d = "";
                    if ("function" == typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]);
                    else {
                        for (c in a.owl) a.owl.hasOwnProperty(c) && (d += a.owl[c].item);
                        b.$elem.html(d)
                    }
                    b.logIn()
                }
                var c, b = this;
                "function" == typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]), "string" == typeof b.options.jsonPath ? (c = b.options.jsonPath, a.getJSON(c, d)) : b.logIn()
            },
            logIn: function() {
                var a = this;
                a.$elem.data("owl-originalStyles", a.$elem.attr("style")), a.$elem.data("owl-originalClasses", a.$elem.attr("class")), a.$elem.css({
                    opacity: 0
                }), a.orignalItems = a.options.items, a.checkBrowser(), a.wrapperWidth = 0, a.checkVisible = null, a.setVars()
            },
            setVars: function() {
                var a = this;
                return 0 !== a.$elem.children().length && (a.baseClass(), a.eventTypes(), a.$userItems = a.$elem.children(), a.itemsAmount = a.$userItems.length, a.wrapItems(), a.$owlItems = a.$elem.find(".owl-item"), a.$owlWrapper = a.$elem.find(".owl-wrapper"), a.playDirection = "next", a.prevItem = 0, a.prevArr = [0], a.currentItem = 0, a.customEvents(), void a.onStartup())
            },
            onStartup: function() {
                var a = this;
                a.updateItems(), a.calculateAll(), a.buildControls(), a.updateControls(), a.response(), a.moveEvents(), a.stopOnHover(), a.owlStatus(), a.options.transitionStyle !== !1 && a.transitionTypes(a.options.transitionStyle), a.options.autoPlay === !0 && (a.options.autoPlay = 5e3), a.play(), a.$elem.find(".owl-wrapper").css("display", "block"), a.$elem.is(":visible") ? a.$elem.css("opacity", 1) : a.watchVisibility(), a.onstartup = !1, a.eachMoveUpdate(), "function" == typeof a.options.afterInit && a.options.afterInit.apply(this, [a.$elem])
            },
            eachMoveUpdate: function() {
                var a = this;
                a.options.lazyLoad === !0 && a.lazyLoad(), a.options.autoHeight === !0 && a.autoHeight(), a.onVisibleItems(), "function" == typeof a.options.afterAction && a.options.afterAction.apply(this, [a.$elem])
            },
            updateVars: function() {
                var a = this;
                "function" == typeof a.options.beforeUpdate && a.options.beforeUpdate.apply(this, [a.$elem]), a.watchVisibility(), a.updateItems(), a.calculateAll(), a.updatePosition(), a.updateControls(), a.eachMoveUpdate(), "function" == typeof a.options.afterUpdate && a.options.afterUpdate.apply(this, [a.$elem])
            },
            reload: function() {
                var a = this;
                b.setTimeout(function() {
                    a.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var a = this;
                return a.$elem.is(":visible") === !1 && (a.$elem.css({
                    opacity: 0
                }), b.clearInterval(a.autoPlayInterval), b.clearInterval(a.checkVisible), void(a.checkVisible = b.setInterval(function() {
                    a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                        opacity: 1
                    }, 200), b.clearInterval(a.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                var a = this;
                a.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), a.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), a.wrapperOuter = a.$elem.find(".owl-wrapper-outer"), a.$elem.css("display", "block")
            },
            baseClass: function() {
                var a = this,
                    b = a.$elem.hasClass(a.options.baseClass),
                    c = a.$elem.hasClass(a.options.theme);
                b || a.$elem.addClass(a.options.baseClass), c || a.$elem.addClass(a.options.theme)
            },
            updateItems: function() {
                var c, d, b = this;
                if (b.options.responsive === !1) return !1;
                if (b.options.singleItem === !0) return b.options.items = b.orignalItems = 1, b.options.itemsCustom = !1, b.options.itemsDesktop = !1, b.options.itemsDesktopSmall = !1, b.options.itemsTablet = !1, b.options.itemsTabletSmall = !1, b.options.itemsMobile = !1, !1;
                if (c = a(b.options.responsiveBaseWidth).width(), c > (b.options.itemsDesktop[0] || b.orignalItems) && (b.options.items = b.orignalItems), b.options.itemsCustom !== !1)
                    for (b.options.itemsCustom.sort(function(a, b) {
                            return a[0] - b[0]
                        }), d = 0; d < b.options.itemsCustom.length; d += 1) b.options.itemsCustom[d][0] <= c && (b.options.items = b.options.itemsCustom[d][1]);
                else c <= b.options.itemsDesktop[0] && b.options.itemsDesktop !== !1 && (b.options.items = b.options.itemsDesktop[1]), c <= b.options.itemsDesktopSmall[0] && b.options.itemsDesktopSmall !== !1 && (b.options.items = b.options.itemsDesktopSmall[1]), c <= b.options.itemsTablet[0] && b.options.itemsTablet !== !1 && (b.options.items = b.options.itemsTablet[1]), c <= b.options.itemsTabletSmall[0] && b.options.itemsTabletSmall !== !1 && (b.options.items = b.options.itemsTabletSmall[1]), c <= b.options.itemsMobile[0] && b.options.itemsMobile !== !1 && (b.options.items = b.options.itemsMobile[1]);
                b.options.items > b.itemsAmount && b.options.itemsScaleUp === !0 && (b.options.items = b.itemsAmount)
            },
            response: function() {
                var d, e, c = this;
                return c.options.responsive === !0 && (e = a(b).width(), c.resizer = function() {
                    a(b).width() !== e && (c.options.autoPlay !== !1 && b.clearInterval(c.autoPlayInterval), b.clearTimeout(d), d = b.setTimeout(function() {
                        e = a(b).width(), c.updateVars()
                    }, c.options.responsiveRefreshRate))
                }, void a(b).resize(c.resizer))
            },
            updatePosition: function() {
                var a = this;
                a.jumpTo(a.currentItem), a.options.autoPlay !== !1 && a.checkAp()
            },
            appendItemsSizes: function() {
                var b = this,
                    c = 0,
                    d = b.itemsAmount - b.options.items;
                b.$owlItems.each(function(e) {
                    var f = a(this);
                    f.css({
                        width: b.itemWidth
                    }).data("owl-item", Number(e)), e % b.options.items !== 0 && e !== d || e > d || (c += 1), f.data("owl-roundPages", c)
                })
            },
            appendWrapperSizes: function() {
                var a = this,
                    b = a.$owlItems.length * a.itemWidth;
                a.$owlWrapper.css({
                    width: 2 * b,
                    left: 0
                }), a.appendItemsSizes()
            },
            calculateAll: function() {
                var a = this;
                a.calculateWidth(), a.appendWrapperSizes(), a.loops(), a.max()
            },
            calculateWidth: function() {
                var a = this;
                a.itemWidth = Math.round(a.$elem.width() / a.options.items)
            },
            max: function() {
                var a = this,
                    b = (a.itemsAmount * a.itemWidth - a.options.items * a.itemWidth) * -1;
                return a.options.items > a.itemsAmount ? (a.maximumItem = 0, b = 0, a.maximumPixels = 0) : (a.maximumItem = a.itemsAmount - a.options.items, a.maximumPixels = b), b
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e, f, g, b = this,
                    c = 0,
                    d = 0;
                for (b.positionsInArray = [0], b.pagesInArray = [], e = 0; e < b.itemsAmount; e += 1) d += b.itemWidth, b.positionsInArray.push(-d), b.options.scrollPerPage === !0 && (f = a(b.$owlItems[e]), g = f.data("owl-roundPages"), g !== c && (b.pagesInArray[c] = b.positionsInArray[e], c = g))
            },
            buildControls: function() {
                var b = this;
                b.options.navigation !== !0 && b.options.pagination !== !0 || (b.owlControls = a('<div class="owl-controls"/>').toggleClass("clickable", !b.browser.isTouch).appendTo(b.$elem)), b.options.pagination === !0 && b.buildPagination(), b.options.navigation === !0 && b.buildButtons()
            },
            buildButtons: function() {
                var b = this,
                    c = a('<div class="owl-buttons"/>');
                b.owlControls.append(c), b.buttonPrev = a("<div/>", {
                    class: "owl-prev",
                    html: b.options.navigationText[0] || ""
                }), b.buttonNext = a("<div/>", {
                    class: "owl-next",
                    html: b.options.navigationText[1] || ""
                }), c.append(b.buttonPrev).append(b.buttonNext), c.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                    a.preventDefault()
                }), c.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(c) {
                    c.preventDefault(), a(this).hasClass("owl-next") ? b.next() : b.prev()
                })
            },
            buildPagination: function() {
                var b = this;
                b.paginationWrapper = a('<div class="owl-pagination"/>'), b.owlControls.append(b.paginationWrapper), b.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(c) {
                    c.preventDefault(), Number(a(this).data("owl-page")) !== b.currentItem && b.goTo(Number(a(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var c, d, e, f, g, h, b = this;
                if (b.options.pagination === !1) return !1;
                for (b.paginationWrapper.html(""), c = 0, d = b.itemsAmount - b.itemsAmount % b.options.items, f = 0; f < b.itemsAmount; f += 1) f % b.options.items === 0 && (c += 1, d === f && (e = b.itemsAmount - b.options.items), g = a("<div/>", {
                    class: "owl-page"
                }), h = a("<span></span>", {
                    text: b.options.paginationNumbers === !0 ? c : "",
                    class: b.options.paginationNumbers === !0 ? "owl-numbers" : ""
                }), g.append(h), g.data("owl-page", d === f ? e : f), g.data("owl-roundPages", c), b.paginationWrapper.append(g));
                b.checkPagination()
            },
            checkPagination: function() {
                var b = this;
                return b.options.pagination !== !1 && void b.paginationWrapper.find(".owl-page").each(function() {
                    a(this).data("owl-roundPages") === a(b.$owlItems[b.currentItem]).data("owl-roundPages") && (b.paginationWrapper.find(".owl-page").removeClass("active"), a(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var a = this;
                return a.options.navigation !== !1 && void(a.options.rewindNav === !1 && (0 === a.currentItem && 0 === a.maximumItem ? (a.buttonPrev.addClass("disabled"), a.buttonNext.addClass("disabled")) : 0 === a.currentItem && 0 !== a.maximumItem ? (a.buttonPrev.addClass("disabled"), a.buttonNext.removeClass("disabled")) : a.currentItem === a.maximumItem ? (a.buttonPrev.removeClass("disabled"), a.buttonNext.addClass("disabled")) : 0 !== a.currentItem && a.currentItem !== a.maximumItem && (a.buttonPrev.removeClass("disabled"), a.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var a = this;
                a.updatePagination(), a.checkNavigation(), a.owlControls && (a.options.items >= a.itemsAmount ? a.owlControls.hide() : a.owlControls.show())
            },
            destroyControls: function() {
                var a = this;
                a.owlControls && a.owlControls.remove()
            },
            next: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.currentItem += b.options.scrollPerPage === !0 ? b.options.items : 1, b.currentItem > b.maximumItem + (b.options.scrollPerPage === !0 ? b.options.items - 1 : 0)) {
                    if (b.options.rewindNav !== !0) return b.currentItem = b.maximumItem, !1;
                    b.currentItem = 0, a = "rewind"
                }
                b.goTo(b.currentItem, a)
            },
            prev: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.options.scrollPerPage === !0 && b.currentItem > 0 && b.currentItem < b.options.items ? b.currentItem = 0 : b.currentItem -= b.options.scrollPerPage === !0 ? b.options.items : 1, b.currentItem < 0) {
                    if (b.options.rewindNav !== !0) return b.currentItem = 0, !1;
                    b.currentItem = b.maximumItem, a = "rewind"
                }
                b.goTo(b.currentItem, a)
            },
            goTo: function(a, c, d) {
                var f, e = this;
                return !e.isTransition && ("function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), a >= e.maximumItem ? a = e.maximumItem : a <= 0 && (a = 0), e.currentItem = e.owl.currentItem = a, e.options.transitionStyle !== !1 && "drag" !== d && 1 === e.options.items && e.browser.support3d === !0 ? (e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[a]) : e.css2slide(e.positionsInArray[a], 1), e.afterGo(), e.singleItemTransition(), !1) : (f = e.positionsInArray[a], e.browser.support3d === !0 ? (e.isCss3Finish = !1, c === !0 ? (e.swapSpeed("paginationSpeed"), b.setTimeout(function() {
                    e.isCss3Finish = !0
                }, e.options.paginationSpeed)) : "rewind" === c ? (e.swapSpeed(e.options.rewindSpeed), b.setTimeout(function() {
                    e.isCss3Finish = !0
                }, e.options.rewindSpeed)) : (e.swapSpeed("slideSpeed"), b.setTimeout(function() {
                    e.isCss3Finish = !0
                }, e.options.slideSpeed)), e.transition3d(f)) : c === !0 ? e.css2slide(f, e.options.paginationSpeed) : "rewind" === c ? e.css2slide(f, e.options.rewindSpeed) : e.css2slide(f, e.options.slideSpeed), void e.afterGo()))
            },
            jumpTo: function(a) {
                var b = this;
                "function" == typeof b.options.beforeMove && b.options.beforeMove.apply(this, [b.$elem]), a >= b.maximumItem || a === -1 ? a = b.maximumItem : a <= 0 && (a = 0), b.swapSpeed(0), b.browser.support3d === !0 ? b.transition3d(b.positionsInArray[a]) : b.css2slide(b.positionsInArray[a], 1), b.currentItem = b.owl.currentItem = a, b.afterGo()
            },
            afterGo: function() {
                var a = this;
                a.prevArr.push(a.currentItem), a.prevItem = a.owl.prevItem = a.prevArr[a.prevArr.length - 2], a.prevArr.shift(0), a.prevItem !== a.currentItem && (a.checkPagination(), a.checkNavigation(), a.eachMoveUpdate(), a.options.autoPlay !== !1 && a.checkAp()), "function" == typeof a.options.afterMove && a.prevItem !== a.currentItem && a.options.afterMove.apply(this, [a.$elem])
            },
            stop: function() {
                var a = this;
                a.apStatus = "stop", b.clearInterval(a.autoPlayInterval)
            },
            checkAp: function() {
                var a = this;
                "stop" !== a.apStatus && a.play()
            },
            play: function() {
                var a = this;
                return a.apStatus = "play", a.options.autoPlay !== !1 && (b.clearInterval(a.autoPlayInterval), void(a.autoPlayInterval = b.setInterval(function() {
                    a.next(!0)
                }, a.options.autoPlay)))
            },
            swapSpeed: function(a) {
                var b = this;
                "slideSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.slideSpeed)) : "paginationSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.paginationSpeed)) : "string" != typeof a && b.$owlWrapper.css(b.addCssSpeed(a))
            },
            addCssSpeed: function(a) {
                return {
                    "-webkit-transition": "all " + a + "ms ease",
                    "-moz-transition": "all " + a + "ms ease",
                    "-o-transition": "all " + a + "ms ease",
                    transition: "all " + a + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(a) {
                return {
                    "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",
                    transform: "translate3d(" + a + "px, 0px,0px)"
                }
            },
            transition3d: function(a) {
                var b = this;
                b.$owlWrapper.css(b.doTranslate(a))
            },
            css2move: function(a) {
                var b = this;
                b.$owlWrapper.css({
                    left: a
                })
            },
            css2slide: function(a, b) {
                var c = this;
                c.isCssFinish = !1, c.$owlWrapper.stop(!0, !0).animate({
                    left: a
                }, {
                    duration: b || c.options.slideSpeed,
                    complete: function() {
                        c.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var f, g, h, i, a = this,
                    d = "translate3d(0px, 0px, 0px)",
                    e = c.createElement("div");
                e.style.cssText = "  -moz-transform:" + d + "; -ms-transform:" + d + "; -o-transform:" + d + "; -webkit-transform:" + d + "; transform:" + d, f = /translate3d\(0px, 0px, 0px\)/g, g = e.style.cssText.match(f), h = null !== g && 1 === g.length, i = "ontouchstart" in b || b.navigator.msMaxTouchPoints, a.browser = {
                    support3d: h,
                    isTouch: i
                }
            },
            moveEvents: function() {
                var a = this;
                a.options.mouseDrag === !1 && a.options.touchDrag === !1 || (a.gestures(), a.disabledEvents())
            },
            eventTypes: function() {
                var a = this,
                    b = ["s", "e", "x"];
                a.ev_types = {}, a.options.mouseDrag === !0 && a.options.touchDrag === !0 ? b = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : a.options.mouseDrag === !1 && a.options.touchDrag === !0 ? b = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : a.options.mouseDrag === !0 && a.options.touchDrag === !1 && (b = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), a.ev_types.start = b[0], a.ev_types.move = b[1], a.ev_types.end = b[2]
            },
            disabledEvents: function() {
                var b = this;
                b.$elem.on("dragstart.owl", function(a) {
                    a.preventDefault()
                }), b.$elem.on("mousedown.disableTextSelect", function(b) {
                    return a(b.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function f(a) {
                    if (void 0 !== a.touches) return {
                        x: a.touches[0].pageX,
                        y: a.touches[0].pageY
                    };
                    if (void 0 === a.touches) {
                        if (void 0 !== a.pageX) return {
                            x: a.pageX,
                            y: a.pageY
                        };
                        if (void 0 === a.pageX) return {
                            x: a.clientX,
                            y: a.clientY
                        }
                    }
                }

                function g(b) {
                    "on" === b ? (a(c).on(d.ev_types.move, i), a(c).on(d.ev_types.end, j)) : "off" === b && (a(c).off(d.ev_types.move), a(c).off(d.ev_types.end))
                }

                function h(c) {
                    var i, h = c.originalEvent || c || b.event;
                    if (3 === h.which) return !1;
                    if (!(d.itemsAmount <= d.options.items)) {
                        if (d.isCssFinish === !1 && !d.options.dragBeforeAnimFinish) return !1;
                        if (d.isCss3Finish === !1 && !d.options.dragBeforeAnimFinish) return !1;
                        d.options.autoPlay !== !1 && b.clearInterval(d.autoPlayInterval), d.browser.isTouch === !0 || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing"), d.newPosX = 0, d.newRelativeX = 0, a(this).css(d.removeTransition()), i = a(this).position(), e.relativePos = i.left, e.offsetX = f(h).x - i.left, e.offsetY = f(h).y - i.top, g("on"), e.sliding = !1, e.targetElement = h.target || h.srcElement
                    }
                }

                function i(g) {
                    var i, j, h = g.originalEvent || g || b.event;
                    d.newPosX = f(h).x - e.offsetX, d.newPosY = f(h).y - e.offsetY, d.newRelativeX = d.newPosX - e.relativePos, "function" == typeof d.options.startDragging && e.dragging !== !0 && 0 !== d.newRelativeX && (e.dragging = !0, d.options.startDragging.apply(d, [d.$elem])), (d.newRelativeX > 8 || d.newRelativeX < -8) && d.browser.isTouch === !0 && (void 0 !== h.preventDefault ? h.preventDefault() : h.returnValue = !1, e.sliding = !0), (d.newPosY > 10 || d.newPosY < -10) && e.sliding === !1 && a(c).off("touchmove.owl"), i = function() {
                        return d.newRelativeX / 5
                    }, j = function() {
                        return d.maximumPixels + d.newRelativeX / 5
                    }, d.newPosX = Math.max(Math.min(d.newPosX, i()), j()), d.browser.support3d === !0 ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
                }

                function j(c) {
                    var h, i, j, f = c.originalEvent || c || b.event;
                    f.target = f.target || f.srcElement, e.dragging = !1, d.browser.isTouch !== !0 && d.$owlWrapper.removeClass("grabbing"), d.newRelativeX < 0 ? d.dragDirection = d.owl.dragDirection = "left" : d.dragDirection = d.owl.dragDirection = "right", 0 !== d.newRelativeX && (h = d.getNewPosition(), d.goTo(h, !1, "drag"), e.targetElement === f.target && d.browser.isTouch !== !0 && (a(f.target).on("click.disable", function(b) {
                        b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(b.target).off("click.disable")
                    }), i = a._data(f.target, "events").click, j = i.pop(), i.splice(0, 0, j))), g("off")
                }
                var d = this,
                    e = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                d.isCssFinish = !0, d.$elem.on(d.ev_types.start, ".owl-wrapper", h)
            },
            getNewPosition: function() {
                var a = this,
                    b = a.closestItem();
                return b > a.maximumItem ? (a.currentItem = a.maximumItem, b = a.maximumItem) : a.newPosX >= 0 && (b = 0, a.currentItem = 0), b
            },
            closestItem: function() {
                var b = this,
                    c = b.options.scrollPerPage === !0 ? b.pagesInArray : b.positionsInArray,
                    d = b.newPosX,
                    e = null;
                return a.each(c, function(f, g) {
                    d - b.itemWidth / 20 > c[f + 1] && d - b.itemWidth / 20 < g && "left" === b.moveDirection() ? (e = g, b.options.scrollPerPage === !0 ? b.currentItem = a.inArray(e, b.positionsInArray) : b.currentItem = f) : d + b.itemWidth / 20 < g && d + b.itemWidth / 20 > (c[f + 1] || c[f] - b.itemWidth) && "right" === b.moveDirection() && (b.options.scrollPerPage === !0 ? (e = c[f + 1] || c[c.length - 1], b.currentItem = a.inArray(e, b.positionsInArray)) : (e = c[f + 1], b.currentItem = f + 1))
                }), b.currentItem
            },
            moveDirection: function() {
                var b, a = this;
                return a.newRelativeX < 0 ? (b = "right", a.playDirection = "next") : (b = "left", a.playDirection = "prev"), b
            },
            customEvents: function() {
                var a = this;
                a.$elem.on("owl.next", function() {
                    a.next()
                }), a.$elem.on("owl.prev", function() {
                    a.prev()
                }), a.$elem.on("owl.play", function(b, c) {
                    a.options.autoPlay = c, a.play(), a.hoverStatus = "play"
                }), a.$elem.on("owl.stop", function() {
                    a.stop(), a.hoverStatus = "stop"
                }), a.$elem.on("owl.goTo", function(b, c) {
                    a.goTo(c)
                }), a.$elem.on("owl.jumpTo", function(b, c) {
                    a.jumpTo(c)
                })
            },
            stopOnHover: function() {
                var a = this;
                a.options.stopOnHover === !0 && a.browser.isTouch !== !0 && a.options.autoPlay !== !1 && (a.$elem.on("mouseover", function() {
                    a.stop()
                }), a.$elem.on("mouseout", function() {
                    "stop" !== a.hoverStatus && a.play()
                }))
            },
            lazyLoad: function() {
                var c, d, e, f, g, b = this;
                if (b.options.lazyLoad === !1) return !1;
                for (c = 0; c < b.itemsAmount; c += 1) d = a(b.$owlItems[c]), "loaded" !== d.data("owl-loaded") && (e = d.data("owl-item"), f = d.find(".lazyOwl"), "string" == typeof f.data("src") ? (void 0 === d.data("owl-loaded") && (f.hide(), d.addClass("loading").data("owl-loaded", "checked")), g = b.options.lazyFollow !== !0 || e >= b.currentItem, g && e < b.currentItem + b.options.items && f.length && b.lazyPreload(d, f)) : d.data("owl-loaded", "loaded"))
            },
            lazyPreload: function(a, c) {
                function g() {
                    a.data("owl-loaded", "loaded").removeClass("loading"), c.removeAttr("data-src"), "fade" === d.options.lazyEffect ? c.fadeIn(400) : c.show(), "function" == typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this, [d.$elem])
                }

                function h() {
                    e += 1, d.completeImg(c.get(0)) || f === !0 ? g() : e <= 100 ? b.setTimeout(h, 100) : g()
                }
                var f, d = this,
                    e = 0;
                "DIV" === c.prop("tagName") ? (c.css("background-image", "url(" + c.data("src") + ")"), f = !0) : c[0].src = c.data("src"), h()
            },
            autoHeight: function() {
                function f() {
                    var d = a(c.$owlItems[c.currentItem]).height();
                    c.wrapperOuter.css("height", d + "px"), c.wrapperOuter.hasClass("autoHeight") || b.setTimeout(function() {
                        c.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function g() {
                    e += 1, c.completeImg(d.get(0)) ? f() : e <= 100 ? b.setTimeout(g, 100) : c.wrapperOuter.css("height", "")
                }
                var e, c = this,
                    d = a(c.$owlItems[c.currentItem]).find("img");
                void 0 !== d.get(0) ? (e = 0, g()) : f()
            },
            completeImg: function(a) {
                var b;
                return !!a.complete && (b = typeof a.naturalWidth, "undefined" === b || 0 !== a.naturalWidth)
            },
            onVisibleItems: function() {
                var c, b = this;
                for (b.options.addClassActive === !0 && b.$owlItems.removeClass("active"), b.visibleItems = [], c = b.currentItem; c < b.currentItem + b.options.items; c += 1) b.visibleItems.push(c), b.options.addClassActive === !0 && a(b.$owlItems[c]).addClass("active");
                b.owl.visibleItems = b.visibleItems
            },
            transitionTypes: function(a) {
                var b = this;
                b.outClass = "owl-" + a + "-out", b.inClass = "owl-" + a + "-in"
            },
            singleItemTransition: function() {
                function i(a) {
                    return {
                        position: "relative",
                        left: a + "px"
                    }
                }
                var a = this,
                    b = a.outClass,
                    c = a.inClass,
                    d = a.$owlItems.eq(a.currentItem),
                    e = a.$owlItems.eq(a.prevItem),
                    f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
                    g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2,
                    h = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                a.isTransition = !0, a.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": g + "px",
                    "-moz-perspective-origin": g + "px",
                    "perspective-origin": g + "px"
                }), e.css(i(f, 10)).addClass(b).on(h, function() {
                    a.endPrev = !0, e.off(h), a.clearTransStyle(e, b)
                }), d.addClass(c).on(h, function() {
                    a.endCurrent = !0, d.off(h), a.clearTransStyle(d, c)
                })
            },
            clearTransStyle: function(a, b) {
                var c = this;
                a.css({
                    position: "",
                    left: ""
                }).removeClass(b), c.endPrev && c.endCurrent && (c.$owlWrapper.removeClass("owl-origin"), c.endPrev = !1, c.endCurrent = !1, c.isTransition = !1)
            },
            owlStatus: function() {
                var a = this;
                a.owl = {
                    userOptions: a.userOptions,
                    baseElement: a.$elem,
                    userItems: a.$userItems,
                    owlItems: a.$owlItems,
                    currentItem: a.currentItem,
                    prevItem: a.prevItem,
                    visibleItems: a.visibleItems,
                    isTouch: a.browser.isTouch,
                    browser: a.browser,
                    dragDirection: a.dragDirection
                }
            },
            clearEvents: function() {
                var d = this;
                d.$elem.off(".owl owl mousedown.disableTextSelect"), a(c).off(".owl owl"), a(b).off("resize", d.resizer)
            },
            unWrap: function() {
                var a = this;
                0 !== a.$elem.children().length && (a.$owlWrapper.unwrap(), a.$userItems.unwrap().unwrap(), a.owlControls && a.owlControls.remove()), a.clearEvents(), a.$elem.attr("style", a.$elem.data("owl-originalStyles") || "").attr("class", a.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                var a = this;
                a.stop(), b.clearInterval(a.checkVisible), a.unWrap(), a.$elem.removeData()
            },
            reinit: function(b) {
                var c = this,
                    d = a.extend({}, c.userOptions, b);
                c.unWrap(), c.init(d, c.$elem)
            },
            addItem: function(a, b) {
                var d, c = this;
                return !!a && (0 === c.$elem.children().length ? (c.$elem.append(a), c.setVars(), !1) : (c.unWrap(), d = void 0 === b || b === -1 ? -1 : b, d >= c.$userItems.length || d === -1 ? c.$userItems.eq(-1).after(a) : c.$userItems.eq(d).before(a), void c.setVars()))
            },
            removeItem: function(a) {
                var c, b = this;
                return 0 !== b.$elem.children().length && (c = void 0 === a || a === -1 ? -1 : a, b.unWrap(), b.$userItems.eq(c).remove(), void b.setVars())
            }
        };
        a.fn.owlCarousel = function(b) {
            return this.each(function() {
                if (a(this).data("owl-init") === !0) return !1;
                a(this).data("owl-init", !0);
                var c = Object.create(d);
                c.init(b, this), a.data(this, "owlCarousel", c)
            })
        }, a.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: b,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document);