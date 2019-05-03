! function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
}()({
    1: [function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        function genericOnClick(info, tab) {
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function(tabs) {
                "info" == info.menuItemId && chrome.tabs.sendMessage(tabs[0].id, {
                    action: "showInfo"
                }), "report" == info.menuItemId && chrome.tabs.sendMessage(tabs[0].id, {
                    action: "showReport"
                })
            })
        }
        var _ext = require("./utils/ext"),
            _ext2 = _interopRequireDefault(_ext),
            _storage = require("./utils/storage");
        _interopRequireDefault(_storage);
        chrome.storage.sync.get(["initialized"], function(result) {
            result.initialized || _ext2["default"].tabs.create({
                url: _ext2["default"].extension.getURL("options.html")
            })
        }), chrome.runtime.setUninstallURL("https://dejavu.news", function(callback) {
            console.log("You have successfully uninstalled DejaVu. Sad to see you go :/")
        });
        var anonymous_id = Math.round(2147483647 * Math.random());
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            var action = request.action;
            if (action.includes("hashedImage")) {
                var _request = new XMLHttpRequest,
                    hash_val = action.replace("hashedImage", "");
                _request.open("POST", "https://www.google-analytics.com/collect", !0), _request.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=pageview&dp=%2Fhash/" + hash_val)
            }
            if ("inspectImage" == action) {
                var _request2 = new XMLHttpRequest;
                _request2.open("POST", "https://www.google-analytics.com/collect", !0), _request2.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=api_call&ea=inspectImage")
            }
            if ("query" == action) {
                var _request3 = new XMLHttpRequest;
                _request3.open("POST", "https://www.google-analytics.com/collect", !0), _request3.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=api_call&ea=query")
            }
            if ("queryBulk" == action) {
                var _request4 = new XMLHttpRequest;
                _request4.open("POST", "https://www.google-analytics.com/collect", !0), _request4.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=api_call&ea=queryBulk")
            }
            if ("hover" == action) {
                var _request5 = new XMLHttpRequest;
                _request5.open("POST", "https://www.google-analytics.com/collect", !0), _request5.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=user_action&ea=hover")
            }
            if ("report" == action) {
                var _request6 = new XMLHttpRequest;
                _request6.open("POST", "https://www.google-analytics.com/collect", !0), _request6.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=api_call&ea=report")
            }
            if ("start_onboarding" == action) {
                var _request7 = new XMLHttpRequest;
                _request7.open("POST", "https://www.google-analytics.com/collect", !0), _request7.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=onboarding&ea=start_onboarding")
            }
            if ("start_safe_sources" == action) {
                var _request8 = new XMLHttpRequest;
                _request8.open("POST", "https://www.google-analytics.com/collect", !0), _request8.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=onboarding&ea=start_safe_sources")
            }
            if ("start_captcha" == action) {
                var _request9 = new XMLHttpRequest;
                _request9.open("POST", "https://www.google-analytics.com/collect", !0), _request9.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=onboarding&ea=start_captcha")
            }
            if ("finish_captcha" == action) {
                var _request10 = new XMLHttpRequest;
                _request10.open("POST", "https://www.google-analytics.com/collect", !0), _request10.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=onboarding&ea=finished_captcha")
            }
            if ("finish_onboarding" == action) {
                var _request11 = new XMLHttpRequest;
                _request11.open("POST", "https://www.google-analytics.com/collect", !0), _request11.send("v=1&tid=UA-123966604-4&cid=" + anonymous_id + "&t=event&ec=onboarding&ea=finish_onboarding")
            }
        }), _ext2["default"].runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if ("perform-save" === request.action && sendResponse({
                action: "saved"
            }), "createContextMenuItem" === request.action) {
                var contextItemProperty = {
                    id: "info",
                    title: "Inspect Image",
                    contexts: ["image"],
                    onclick: genericOnClick
                };
                _ext2["default"].contextMenus.create(contextItemProperty)
            }
            "reinitialize" === request.action && _ext2["default"].tabs.create({
                url: _ext2["default"].extension.getURL("options.html")
            })
        })
    }, {
        "./utils/ext": 2,
        "./utils/storage": 3
    }],
    2: [function(require, module, exports) {
        "use strict";
        function Extension() {
            var _this = this;
            apis.forEach(function(api) {
                _this[api] = null;
                try {
                    chrome[api] && (_this[api] = chrome[api])
                } catch (e) {}
                try {
                    window[api] && (_this[api] = window[api])
                } catch (e) {}
                try {
                    browser[api] && (_this[api] = browser[api])
                } catch (e) {}
                try {
                    _this.api = browser.extension[api]
                } catch (e) {}
            });
            try {
                browser && browser.runtime && (this.runtime = browser.runtime)
            } catch (e) {}
            try {
                browser && browser.browserAction && (this.browserAction = browser.browserAction)
            } catch (e) {}
        }
        var apis = ["alarms", "bookmarks", "browserAction", "commands", "contextMenus", "cookies", "downloads", "events", "extension", "extensionTypes", "history", "i18n", "idle", "notifications", "pageAction", "runtime", "storage", "tabs", "webNavigation", "webRequest", "windows"];
        module.exports = new Extension
    }, {}],
    3: [function(require, module, exports) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _ext = require("./ext"),
            _ext2 = _interopRequireDefault(_ext);
        module.exports = _ext2["default"].storage.sync ? _ext2["default"].storage.sync : _ext2["default"].storage.local
    }, {
        "./ext": 2
    }]
}, {}, [1]);
