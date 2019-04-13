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
        var _ext = require("./utils/ext"),
            _ext2 = _interopRequireDefault(_ext),
            _storage = require("./utils/storage"),
            _storage2 = _interopRequireDefault(_storage),
            popup = (chrome.runtime.getURL("icons/surfsafe.png"), document.getElementById("app"));
        _storage2["default"].get("color", function(resp) {
            var color = resp.color;
            color && (popup.style.backgroundColor = color)
        });
        var renderMessage = function(message) {
                var displayContainer = document.getElementById("display-container");
                displayContainer.innerHTML = "<p class='message'>" + message + "</p>"
            },
            renderBookmark = function(data) {
                _ext2["default"].tabs.create({
                    url: _ext2["default"].extension.getURL("options.html")
                })
            };
        _ext2["default"].tabs.query({
            active: !0,
            currentWindow: !0
        }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                action: "process-page"
            }, renderBookmark)
        }), popup.addEventListener("click", function(e) {
            if (e.target && e.target.matches("#save-btn")) {
                e.preventDefault();
                var data = e.target.getAttribute("data-bookmark");
                _ext2["default"].runtime.sendMessage({
                    action: "perform-save",
                    data: data
                }, function(response) {
                    renderMessage(response && "saved" === response.action ? "Your bookmark was saved successfully!" : "Sorry, there was an error while saving your bookmark.")
                })
            }
        });
        var optionsLink = document.querySelector(".js-options");
        optionsLink.addEventListener("click", function(e) {
            e.preventDefault(), _ext2["default"].tabs.create({
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