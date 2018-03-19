(function (win, doc) {
    // Looks like 
    var browserType = (function () {
        try {
            if (typeof navigator === "undefined") {
                return false
            }
            if ((/^Opera\//).test(navigator.userAgent) || (/ OPR\//).test(navigator.userAgent)) {
                return false
            } else {
                if (false && navigator.mozGetUserMedia) {
                    var f = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
                    return f >= 38
                } else {
                    if (navigator.webkitGetUserMedia) {
                        return !(/(iPad|iPhone|iPod)/g).test(navigator.userAgent)
                    }
                }
            }
        } catch (g) {}
        return false
    }());

    function a(_window, _document, url) {
        function k_initChatWindow() {
            var cookie = _document.cookie;
            var bcCurlStringIndex = cookie.indexOf("_bc-curl=");
            while (bcCurlStringIndex >= 0) {
                var semiColonStringIndex = cookie.indexOf(";", bcCurlStringIndex + 1);
                var bcCurl = semiColonStringIndex === -1 ? 
                    cookie.substring(bcCurlStringIndex + 9) : 
                    cookie.substring(bcCurlStringIndex + 9, semiColonStringIndex);
                var s_chatWindowObj = e_newWindow(bcCurl);
                if (s_chatWindowObj) {
                    _window._bcvmw.chatWindow(s_chatWindowObj, s_chatWindowObj.id);
                    return true
                }
                bcCurlStringIndex = cookie.indexOf("_bc-curl=", bcCurlStringIndex + 9)
            }
            return false
        }

        function doesURLHaveBoldHost(inputUrl) {
            var anchor = document.createElement("a");
            anchor.href = inputUrl;
            var urlString = url;
            var hostRegex = /\.(boldchat|bold360)\.(com|io)$/;
            if (hostRegex.test(urlString)) {
                var escapedUrlString = urlString.replace(".", "\\.");
                hostRegex = new RegExp(escapedUrlString + "$")
            }
            return hostRegex.test(anchor.hostname)
        }
        var isChrome = (function () {
            var r = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return r && parseInt(r[2], 10) >= 47
        }());
        _window._bcvmw = {
            chatWindow: function (G_Configuration, B, y) {
                var _pageViewer = _window.pageViewer;
                var w_FormActionUrl, R_HiddenInputs = null,
                    x_hideBox = _window.hideBox || _window.bt_hideAnimationImpl,
                    H = G_Configuration.video && browserType && isChrome && !/^https:/.test(_window.location.protocol),
                    r = H || /(android 2|android 3)/i.test(navigator.userAgent) || /iemobile\/9/i.test(navigator.userAgent) || /(msie 7)/i.test(navigator.userAgent) || /(msie 8|msie 9)/i.test(navigator.userAgent) && document.compatMode !== "CSS1Compat",
                    F = /(msie 6|opera mini|opera mobi.*presto)/i.test(navigator.userAgent),
                    t = _pageViewer && _pageViewer.getParameter("OverrideLayer", G_Configuration) === "true",
                    z = r || F || _pageViewer && _pageViewer.getParameter("OverridePopup", G_Configuration) === "true";
                if (!y && !B) {
                    y = _pageViewer && _pageViewer.getParameter("SecureParameters", G_Configuration)
                }
                if (typeof y === "function") {
                    y = y(function (v) {
                        _window._bcvmw.chatWindow(G_Configuration, B, v)
                    }, "chat");
                    if (!y) {
                        return
                    }
                }
                if (_window._bcvmw.customChatWindow) {
                    var T = {
                        button: G_Configuration.bdid,
                        queueToken: G_Configuration.token,
                        url: _document.location.href,
                        customUrl: _pageViewer && _pageViewer.getWindowParameter("CustomUrl", G_Configuration),
                        secure: y,
                        visitor: _pageViewer && _pageViewer.getVisitorID(),
                        forcePopup: !G_Configuration.embed && !t || z,
                        width: (_pageViewer.getWindowParameter("ChatWidth", G_Configuration) || G_Configuration.width || "640"),
                        height: (_pageViewer.getWindowParameter("ChatHeight", G_Configuration) || G_Configuration.height || "480"),
                        language: _pageViewer && _pageViewer.getWindowParameter("Language", G_Configuration)
                    };
                    var A = {
                        reference: _pageViewer && _pageViewer.getWindowParameter("VisitRef", G_Configuration),
                        information: _pageViewer && _pageViewer.getWindowParameter("VisitInfo", G_Configuration),
                        name: G_Configuration.name || (_pageViewer && _pageViewer.getWindowParameter("VisitName", G_Configuration)),
                        phone: _pageViewer && _pageViewer.getWindowParameter("VisitPhone", G_Configuration),
                        email: G_Configuration.email || (_pageViewer && _pageViewer.getWindowParameter("VisitEmail", G_Configuration)),
                        initial_question: G_Configuration.initialQuestion || (_pageViewer && _pageViewer.getWindowParameter("InitialQuestion", G_Configuration))
                    };
                    var P = _window._bcvmw.customChatWindow(T, A);
                    if (typeof P === "undefined" || P) {
                        return
                    }
                }
                if (!B && k_initChatWindow()) {
                    return
                }
                if (!G_Configuration.invite && x_hideBox) {
                    x_hideBox(2)
                }
                if (G_Configuration.url && !G_Configuration.invite) {
                    w_FormActionUrl = G_Configuration.url
                } else {
                    w_FormActionUrl = G_Configuration.url || "https://livechat" + _window._bcvm.host + "/bc." + G_Configuration.type + "?resize=true" + (G_Configuration.bdid ? "&cbdid=" + G_Configuration.bdid : (G_Configuration.cwdid ? "&cwdid=" + G_Configuration.cwdid : "")) + "&wdid=" + (_pageViewer.getParameter("WebsiteDefID", G_Configuration) || _pageViewer.getParameter("WebsiteID", G_Configuration)) + "&url=" + (_window.encodeURIComponent || _window.escape)(_document.location.href);
                    w_FormActionUrl += (G_Configuration.token ? "&queueToken=" + G_Configuration.token : "");
                    var K = _pageViewer.getParameter("PinvitationID", G_Configuration);
                    if (K) {
                        w_FormActionUrl += "&pinid=" + K
                    }
                    var U_parameters = {
                        Language: "lc",
                        Difficulty: "Difficulty",
                        Urgency: "Urgency",
                        CustomUrl: "curl",
                        WindowParameters: null
                    };
                    for (var key in U_parameters) {
                        var M = U_parameters[key];
                        var E = _pageViewer.getParameter(key, G_Configuration);
                        if (E) {
                            w_FormActionUrl += "&" + (M ? M + "=" : "") + E
                        }
                    }
                    w_FormActionUrl += (G_Configuration.rdid ? "&rdid=" + G_Configuration.rdid : "") + (G_Configuration.roid ? "&roid=" + G_Configuration.roid : "");
                    w_FormActionUrl += (G_Configuration.group ? "&group=" + G_Configuration.group : "");
                    if (_pageViewer && _pageViewer.link) {
                        w_FormActionUrl = _pageViewer.link(w_FormActionUrl, true)
                    }
                }
                if (y) {
                    R_HiddenInputs = R_HiddenInputs || {
                        localsecured: [],
                        secured: [],
                        hash: []
                    };
                    R_HiddenInputs.secured.push(y)
                }
                if (G_Configuration.secured || G_Configuration.localsecured) {
                    R_HiddenInputs = R_HiddenInputs || {
                        localsecured: [],
                        secured: [],
                        hash: []
                    };
                    if (G_Configuration.secured) {
                        R_HiddenInputs.secured.push(G_Configuration.secured)
                    }
                    if (G_Configuration.hash) {
                        R_HiddenInputs.hash.push(G_Configuration.hash)
                    }
                    if (G_Configuration.localsecured) {
                        R_HiddenInputs.localsecured.push(G_Configuration.localsecured)
                    }
                }
                R_HiddenInputs = R_HiddenInputs || {};
                var u_IndexOfQuestionMark = w_FormActionUrl.indexOf("?");
                var D_FormActionUrlParameters = u_IndexOfQuestionMark === -1 ? [] : w_FormActionUrl.substring(u_IndexOfQuestionMark + 1).split("&");
                for (var key = 0; key < D_FormActionUrlParameters.length; key++) {
                    var L_Parameter = D_FormActionUrlParameters[key];
                    var s_EqualityIndex = L_Parameter.indexOf("=");
                    var X_ParameterName = decodeURIComponent(s_EqualityIndex === -1 ? L_Parameter : L_Parameter.substring(0, s_EqualityIndex));
                    var O_ParameterValue = decodeURIComponent(s_EqualityIndex === -1 ? "" : L_Parameter.substring(s_EqualityIndex + 1));
                    R_HiddenInputs[X_ParameterName] = R_HiddenInputs[X_ParameterName] || [];
                    R_HiddenInputs[X_ParameterName].push(O_ParameterValue)
                }
                w_FormActionUrl = u_IndexOfQuestionMark === -1 ? w_FormActionUrl : w_FormActionUrl.substring(0, u_IndexOfQuestionMark);
                var S = function (ac, v) {
                    w_FormActionUrl = ac ? w_FormActionUrl.replace(/bc\.chat/, "mobilechat/visitor.jsp") + (F ? "&pt=9" : "") : w_FormActionUrl;
                    if (v) {
                        w_FormActionUrl = ac ? w_FormActionUrl.replace(/bc\.chat/, "mobilechat/visitor.jsp") + (F ? "&pt=9" : "") : w_FormActionUrl;
                        if (_window.bcConfig && _window.bcConfig.cid && !(/&cid=/.test(w_FormActionUrl))) {
                            w_FormActionUrl = w_FormActionUrl + "&cid=" + _window.bcConfig.cid
                        }
                    }
                    var Z = R_HiddenInputs ? "about:blank" : w_FormActionUrl,
                        af_FormTarget = G_Configuration.type + G_Configuration.bdid;
                    if (/OS X.*CriOS.*Mobile/i.test(navigator.userAgent) && G_Configuration.invite) {
                        _window.open(Z, af_FormTarget)
                    } else {
                        _window.open(Z, af_FormTarget, (G_Configuration.open || (_pageViewer && _pageViewer.getParameter("OpenParameters", G_Configuration)) || "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1") + ",width=" + ((_pageViewer && _pageViewer.getParameter("ChatWidth", G_Configuration)) || G_Configuration.width || "640") + ",height=" + ((_pageViewer && _pageViewer.getParameter("ChatHeight", G_Configuration)) || G_Configuration.height || "480"))
                    }
                    if (R_HiddenInputs) {
                        var Y_Form = _document.createElement("form");
                        Y_Form.target = af_FormTarget;
                        Y_Form.method = "post";
                        Y_Form.action = w_FormActionUrl;
                        for (var ab_Name in R_HiddenInputs) {
                            for (var aa_ValueIndex = 0; aa_ValueIndex < R_HiddenInputs[ab_Name].length; aa_ValueIndex++) {
                                var ae_HiddenInput = _document.createElement("input");
                                ae_HiddenInput.type = "hidden";
                                ae_HiddenInput.name = ab_Name;
                                ae_HiddenInput.value = R_HiddenInputs[ab_Name][aa_ValueIndex];
                                Y_Form.appendChild(ae_HiddenInput)
                            }
                        }
                        var ad_SubmitForm = function () {
                            try {
                                _document.body.appendChild(Y_Form)
                            } catch (ah) {
                                try {
                                    _document.body.insertBefore(Y_Form, _document.body.firstChild)
                                } catch (ag) {
                                    setTimeout(ad_SubmitForm, 1000);
                                    return
                                }
                            }
                            Y_Form.submit()
                        };
                        ad_SubmitForm()
                    }
                };

                function W(v) {
                    S(v, true)
                }
                if (G_Configuration.launchType === "nanorep") {
                    h(G_Configuration.url, G_Configuration.cwdid, B)
                } else {
                    if (!G_Configuration.embed && !t || z) {
                        S(G_Configuration.embed || t)
                    } else {
                        var I = B || (Math.floor(Math.random() * 1000000000) + "" + Math.floor(Math.random() * 1000000000));
                        var C = w_FormActionUrl.replace(/bc\.chat.*/, "").replace(/mobilechat.*/, "") + "mobilechat/launcher.jsp?v=" + (G_Configuration.version || "1") + (G_Configuration.cwdid ? "&cwdid=" + G_Configuration.cwdid : "") + "&cid=" + I;
                        var V = G_Configuration.url && !G_Configuration.invite ? w_FormActionUrl : w_FormActionUrl.replace(/bc.chat/, "mobilechat/visitor.jsp");
                        _window.bcConfig = _window.bcConfig || {};
                        _window.bcConfig.frame = true;
                        _window.bcConfig.aid = w_FormActionUrl.match(/\/aid\/([0-9]+)\//)[1];
                        _window.bcConfig.cid = B;
                        _window.bcConfig.cwdid = G_Configuration.cwdid || "";
                        _window.bcConfig.obj = {
                            url: V,
                            hostUrl: _document.location.href,
                            post: R_HiddenInputs
                        };
                        _window.bcConfig.loader = C.replace(/launcher.jsp.*/, "loader.jsp");
                        _window.bcConfig.launchPopup = S;
                        _window.bcConfig.launchPopupFromLayered = W;
                        var N = _document.createElement("script");
                        N.type = "text/javascript";
                        N.src = C;
                        _document.getElementsByTagName("head")[0].appendChild(N)
                    }
                }
            }
        };
        var m_PageUrl = _document.location.href;
        var g_BCCurlParamIndex = m_PageUrl.indexOf("#reboot-cid=");
        if (g_BCCurlParamIndex !== -1) {
            var i = (_window.decodeURIComponent || _window.unescape)(m_PageUrl.substring(g_BCCurlParamIndex + 12)).split(":");
            if (i.length > 1) {
                var j = null;
                if (i.length > 7) {
                    j = i[7]
                }
                setTimeout(function () {
                    _window._bcvmw.chatWindow({
                        cwdid: i[1],
                        version: 1,
                        embed: true,
                        type: "chat",
                        launchType: j
                    }, i[0])
                }, 1000)
            }
            _document.location.href = m_PageUrl.replace(/#.*/, "#");
            return
        }
        m_PageUrl = _document.location.href;
        g_BCCurlParamIndex = m_PageUrl.indexOf("#bc-curl=");
        if (g_BCCurlParamIndex !== -1) {
            var l = (_window.decodeURIComponent || _window.unescape)(m_PageUrl.substring(g_BCCurlParamIndex + 9));
            if (doesURLHaveBoldHost(l)) {
                setTimeout(function () {
                    _window._bcvm.setCookie("_bc-curl", l);
                    _document.location.href = m_PageUrl.replace(/#.*/, "#");
                    k_initChatWindow()
                }, 1000);
                return
            } else {
                console.error("Invalid Chat URL")
            }
        }
        k_initChatWindow();

        function e_newWindow(bcCurlString) {
            var u = bcCurlString.split(":");
            if (u.length > 2) {
                var id = u[0];
                var cwdid = u[1];
                var url = (_window.decodeURIComponent || _window.unescape)(u[2]);
                var minimized = u[3];
                var unreadMessageCount = u[4];
                var version = u[5];
                var launchType = u.length > 7 ? u[7] : null;
                if (doesURLHaveBoldHost(url)) {
                    return {
                        id: id,
                        url: url,
                        cwdid: cwdid,
                        minimized: minimized,
                        unreadMessageCount: unreadMessageCount,
                        version: version,
                        embed: true,
                        launchType: launchType
                    }
                } else {
                    console.error("Invalid Chat URL")
                }
            }
            return null
        }

        function h(t, s, u) {
            var w = u || (Math.floor(Math.random() * 1000000000) + "" + Math.floor(Math.random() * 1000000000));
            var r = t || "https://livechat" + _window._bcvm.host + "/bot/launcher.jsp?" + (s ? "&cwdid=" + s : "") + "&cid=" + w;
            var v = _document.createElement("script");
            v.type = "text/javascript";
            v.src = r;
            _document.getElementsByTagName("head")[0].appendChild(v)
        }
    }
    a(win, doc, ".boldchat.com")
}(window, document));
window._bcvmf = {
    divs: [],
    windows: {},
    floatButton: function (d) {
        if (window.pageViewer && pageViewer.removeButton) {
            pageViewer.removeButton(d.bdid)
        }
        if (!d.img) {
            return
        }
        if (d.hideUnsupported) {
            var supported = (function () {
                try {
                    if (typeof navigator === "undefined") {
                        return false
                    }
                    if ((/^Opera\//).test(navigator.userAgent) || (/ OPR\//).test(navigator.userAgent)) {
                        return false
                    } else {
                        if (false && navigator.mozGetUserMedia) {
                            var a = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
                            return a >= 38
                        } else {
                            if (navigator.webkitGetUserMedia) {
                                return !(/(iPad|iPhone|iPod)/g).test(navigator.userAgent)
                            }
                        }
                    }
                } catch (x) {}
                return false
            }());
            if (!supported) {
                return
            }
        }
        var floatButton_window = window,
            floatButton_document = document,
            floatButton_body = floatButton_document.body,
            floatButton_documentElement = floatButton_document.documentElement,
            randomStringNumber = Math.random() + "",
            floatButton_now = function () {
                return new Date().getTime()
            },
            S = d.x,
            R = d.y,
            q = d.dl,
            h = d.dt,
            o = d.px,
            l = d.py,
            M = d.fix,
            V = 1000000000,
            N = 1000000000,
            ag_FloatButton, I, floatButton_image, floatButton_anchorTag, s, E_LeftPixels, D_VerticalPixels, i, Y = floatButton_document.getElementById("bcvml"),
            Q_InnerWidthScale = 1,
            g_CurrentInnerWidthScale = 0,
            floatButton_mobileAppleUserAgent = navigator.userAgent.match(/(iPad|iPhone|iPod)/g),
            af = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent),
            floatButton_silkUserAgent = /Silk/.test(navigator.userAgent),
            floatButton_androidUserAgent = /Android/.test(navigator.userAgent) || floatButton_silkUserAgent,
            floatButton_IEMobileUserAgent = /IEMobile/.test(navigator.userAgent),
            floatButton_mobileFirefoxUserAgent = /mobile.*firefox/i.test(navigator.userAgent) || /tablet.*firefox/i.test(navigator.userAgent),
            floatButton_4AndroidWebkitUserAgent = /Android 4.*WebKit.*Version\/4.0/.test(navigator.userAgent),
            W_isMobileUser = (document.compatMode == "CSS1Compat" && !floatButton_mobileAppleUserAgent && !floatButton_androidUserAgent && !floatButton_IEMobileUserAgent) || floatButton_mobileFirefoxUserAgent,
            ac = d.si != null && d.si >= 0,
            am = false,
            floatButton_maxImageWidth = function () {
                return Math.max(floatButton_image.width, floatButton_image.offsetWidth || 0, floatButton_image.naturalWidth || 0)
            },
            floatButton_maxImageHeight = function () {
                return Math.max(floatButton_image.height, floatButton_image.offsetHeight || 0, floatButton_image.naturalHeight || 0)
            },
            aa_GetFloatButtonLeftPixels = function () {
                return aj(((q ? o : 100 - o) / 100 * (A() - Math.min(V, floatButton_maxImageWidth()) * Q_InnerWidthScale) + (q ? S : -S)) + (!M || W_isMobileUser ? 0 : window.scrollX || window.pageXOffset))
            },
            X_GetVerticalPixels = function () {
                if (b()) {
                    return v()
                } else {
                    return c((h ? l : 100 - l) / 100 * (O() - Math.min(N, floatButton_maxImageHeight()) * Q_InnerWidthScale) + (h ? R : -R) + (!M || W_isMobileUser ? 0 : window.scrollY || window.pageYOffset))
                }
            },
            v = function () {
                return l / 100 * (O()) + R
            },
            aj = function (x) {
                var a = x;
                if (a > document.body.scrollWidth - Math.min(V, floatButton_maxImageWidth()) * Q_InnerWidthScale) {
                    if (a > A() - Math.min(V, floatButton_maxImageWidth()) * Q_InnerWidthScale) {
                        a = document.body.scrollWidth - Math.min(V, floatButton_maxImageWidth()) * Q_InnerWidthScale
                    }
                }
                return a
            },
            c = function (x) {
                var a = x;
                if (a > document.body.scrollHeight - Math.min(N, floatButton_maxImageHeight()) * Q_InnerWidthScale) {
                    if (a > O() - Math.min(N, floatButton_maxImageHeight()) * Q_InnerWidthScale) {
                        a = document.body.scrollHeight - Math.min(N, floatButton_maxImageHeight()) * Q_InnerWidthScale
                    }
                }
                return a
            };

        function O() {
            return ((floatButton_mobileAppleUserAgent || floatButton_androidUserAgent || floatButton_mobileFirefoxUserAgent) ? window.innerHeight : ((W_isMobileUser ^ !M) && floatButton_documentElement.clientHeight || floatButton_body && floatButton_body.clientHeight) * Q_InnerWidthScale)
        }

        function A() {
            return ((floatButton_mobileAppleUserAgent || floatButton_androidUserAgent || floatButton_mobileFirefoxUserAgent) ? window.innerWidth : ((W_isMobileUser ^ !M) && floatButton_documentElement.clientWidth || floatButton_body && floatButton_body.clientWidth) * Q_InnerWidthScale)
        }
        var T = function () {
            if (floatButton_mobileAppleUserAgent || floatButton_androidUserAgent) {
                G_OrientApplication()
            }
            I.style.width = floatButton_maxImageWidth() + "px";
            I.style.height = floatButton_maxImageHeight() + "px";
            if (!ac) {
                ag_FloatButton.style.width = floatButton_maxImageWidth() + "px";
                ag_FloatButton.style.height = floatButton_maxImageHeight() + "px"
            }
            E_LeftPixels = aa_GetFloatButtonLeftPixels();
            D_VerticalPixels = X_GetVerticalPixels();
            ag_FloatButton.style.left = E_LeftPixels + "px";
            if (b()) {
                ag_FloatButton.style.bottom = D_VerticalPixels + "px"
            } else {
                ag_FloatButton.style.top = D_VerticalPixels + "px"
            }
            if (ac) {
                s(true)
            }
        };

        function G_OrientApplication() {
            if (floatButton_mobileAppleUserAgent || floatButton_androidUserAgent) {
                if (ai_IsLandscapeOrientation()) {
                    Q_InnerWidthScale = window.innerWidth / Math.max(screen.width, screen.height)
                } else {
                    Q_InnerWidthScale = window.innerWidth / Math.min(screen.width, screen.height)
                }
            }
            if (g_CurrentInnerWidthScale !== Q_InnerWidthScale) {
                var a = "top";
                if (b()) {
                    a = "bottom"
                }
                ag_FloatButton.style.transform = "scale(" + Q_InnerWidthScale + ")";
                ag_FloatButton.style.transformOrigin = a + " left";
                ag_FloatButton.style.webkitTransform = "scale(" + Q_InnerWidthScale + ")";
                ag_FloatButton.style.webkitTransformOrigin = a + " left";
                W_isMobileUser = (document.compatMode == "CSS1Compat" && (!floatButton_mobileAppleUserAgent && !floatButton_androidUserAgent || window.innerWidth == document.body.scrollWidth) && !floatButton_IEMobileUserAgent) || floatButton_mobileFirefoxUserAgent;
                k_SetFloatButtonPosition()
            }
            g_CurrentInnerWidthScale = Q_InnerWidthScale
        }

        function ai_IsLandscapeOrientation() {
            if (floatButton_mobileAppleUserAgent && typeof window.orientation !== "undefined") {
                return (Math.abs(window.orientation) === 90)
            } else {
                if (document.documentElement && document.documentElement.clientWidth) {
                    return (document.documentElement.clientWidth > document.documentElement.clientHeight)
                } else {
                    return (window.innerWidth > window.innerHeight)
                }
            }
        }

        function b() {
            return W_isMobileUser && M && !h && floatButton_mobileFirefoxUserAgent
        }

        function k_SetFloatButtonPosition() {
            ag_FloatButton.style.position = W_isMobileUser && M ? "fixed" : "absolute"
        }
        ag_FloatButton = floatButton_document.createElement("div");
        I = floatButton_document.createElement("div");
        floatButton_image = new Image();
        floatButton_anchorTag = floatButton_document.createElement("a");
        ag_FloatButton.setAttribute("class", "bcFloat");
        ag_FloatButton.style.display = "none";
        I.style.position = "absolute";
        floatButton_anchorTag.setAttribute("href", "#");
        floatButton_anchorTag.onclick = function () {
            floatButton_window._bcvmw.chatWindow(d);
            return false
        };
        if (ac) {
            var w = d.sl,
                r = d.st,
                C = 0,
                J = 0,
                L, z = d.si,
                p = 100,
                u = function (a) {
                    return 1 - Math.E * Math.exp(-1 / (1 - a * a))
                };
            V = w;
            N = r;
            s = function (aq) {
                if (am) {
                    return
                }
                am = true;
                var a = V,
                    ao = N,
                    y = Math.min(1, (floatButton_now() - J) / z),
                    x = C ? floatButton_maxImageWidth() : w || floatButton_maxImageWidth(),
                    ap = C ? floatButton_maxImageHeight() : r || floatButton_maxImageHeight();
                if (C) {
                    y = 1 - y
                }
                y = u(y);
                V = y * Math.min(floatButton_maxImageWidth(), w || floatButton_maxImageWidth()) + (1 - y) * floatButton_maxImageWidth();
                N = y * Math.min(floatButton_maxImageHeight(), r || floatButton_maxImageHeight()) + (1 - y) * floatButton_maxImageHeight();
                ag_FloatButton.style.width = V + "px";
                ag_FloatButton.style.height = N + "px";
                if (q) {
                    I.style.marginLeft = (V - floatButton_maxImageWidth()) + "px"
                }
                if (h) {
                    I.style.marginTop = (N - floatButton_maxImageHeight()) + "px"
                } else {
                    if (b()) {
                        I.style.marginBottom = (N - floatButton_maxImageHeight()) + "px"
                    }
                }
                if (V != x || N != ap) {
                    if (L) {
                        clearTimeout(L)
                    }
                    L = setTimeout(s, p)
                }
                E_LeftPixels += a - V;
                if (!b()) {
                    D_VerticalPixels += ao - N
                }
                if (V != a && !q) {
                    ag_FloatButton.style.left = E_LeftPixels + "px"
                }
                if (N != ao && !h) {
                    if (b()) {
                        ag_FloatButton.style.bottom = D_VerticalPixels + "px"
                    } else {
                        ag_FloatButton.style.top = D_VerticalPixels + "px"
                    }
                }
                am = false
            };
            I.onmouseover = function () {
                J = floatButton_now() - z * (1 - Math.min(1, (floatButton_now() - J) / z));
                C = 1;
                if (L) {
                    clearTimeout(L)
                }
                L = setTimeout(s, p)
            };
            I.onmouseout = function () {
                J = floatButton_now() - z * (1 - Math.min(1, (floatButton_now() - J) / z));
                C = 0;
                if (L) {
                    clearTimeout(L)
                }
                L = setTimeout(s, p)
            }
        }
        ag_FloatButton.appendChild(I);
        I.appendChild(floatButton_anchorTag);
        floatButton_anchorTag.appendChild(floatButton_image);
        _bcvmf.divs.push(ag_FloatButton);
        floatButton_image.setAttribute("id", randomStringNumber);
        floatButton_image.setAttribute("border", 0);
        floatButton_image.setAttribute("alt", d.altText);
        floatButton_image.onload = function () {
            ag_FloatButton.style.textAlign = "left";
            ag_FloatButton.style.zIndex = 3141591;
            ag_FloatButton.style.overflow = "hidden";
            k_SetFloatButtonPosition();
            T();
            ag_FloatButton.style.display = "block";
            _bcvmf.updateFloatVisibility()
        };
        floatButton_image.src = d.img;
        if (floatButton_mobileAppleUserAgent || floatButton_androidUserAgent) {
            ag_FloatButton.style.transition = "all 0.2s linear";
            ag_FloatButton.style.WebkitTransition = "all 0.2s linear"
        }

        function f() {
            try {
                floatButton_document.body.appendChild(ag_FloatButton)
            } catch (a) {
                try {
                    floatButton_document.body.insertBefore(ag_FloatButton, floatButton_document.body.firstChild)
                } catch (a) {
                    setTimeout(f, 1000);
                    return
                }
            }
            floatButton_body = floatButton_document.body;
            T()
        }
        f();
        _bcvm.addEvent(floatButton_window, "resize", T);
        if (floatButton_mobileAppleUserAgent || (floatButton_androidUserAgent && !floatButton_4AndroidWebkitUserAgent)) {
            function ah() {
                var a = !W_isMobileUser || !M;
                if (a) {
                    ag_FloatButton.style.position = "fixed"
                }
                T();
                setTimeout(function () {
                    if (a) {
                        k_SetFloatButtonPosition()
                    }
                    T()
                }, 500)
            }
            _bcvm.addEvent(floatButton_window, "orientationchange", ah)
        }

        function F() {
            setTimeout(function () {
                T()
            }, 500)
        }
        _bcvm.addEvent(floatButton_window, "touchend", F);
        _bcvm.addEvent(floatButton_window, "scroll", T);
        if (floatButton_window.pageViewer && pageViewer.addButton) {
            pageViewer.addButton({
                parents: [ag_FloatButton],
                id: randomStringNumber,
                bdid: d.bdid,
                type: d.type,
                roid: d.roid,
                rdid: d.rdid,
                obj: d
            }, true)
        }
        if (window.pageViewer.addExperimentButton) {
            window.pageViewer.addExperimentButton({
                id: d.id,
                type: d.type
            }, d.originalButtonId)
        }
    },
    updateFloatVisibility: function (a, d) {
        var c = false;
        if (a) {
            _bcvmf.windows[a] = d
        }
        for (var b in _bcvmf.windows) {
            if (!_bcvmf.windows[b]) {
                c = true
            }
        }
        for (var b = 0; b < _bcvmf.divs.length; b++) {
            _bcvmf.divs[b].style.display = c ? "none" : "block"
        }
    }
};
window._bcvmb = {
    //e_element is either an object that has a reference to an element string,
    //or it is an element itself
    button: function (e_element) {
        if (window.pageViewer && pageViewer.removeButton) {
            pageViewer.removeButton(e_element.id || e_element.bdid)
        }
        if (!e_element.img) {
            return
        }
        if (e_element.hideUnsupported) {
            var isSupported = (function () {
                try {
                    if (typeof navigator === "undefined") {
                        return false
                    }
                    if ((/^Opera\//).test(navigator.userAgent) || (/ OPR\//).test(navigator.userAgent)) {
                        return false
                    } else {
                        if (false && navigator.mozGetUserMedia) {
                            var a = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
                            return a >= 38
                        } else {
                            if (navigator.webkitGetUserMedia) {
                                return !(/(iPad|iPhone|iPod)/g).test(navigator.userAgent)
                            }
                        }
                    }
                } catch (i) {}
                return false
            }());
            if (!isSupported) {
                return
            }
        }
        var g__window = window,
            m__document = document,
            b, h = !e_element.id ? _bcvm.select(e_element.element) : [m__document.getElementById(e_element.id)],
            c_id = Math.random() + "",
            f_element, l_buttonLink, o_buttonLinkOnClick = function () {
                g__window._bcvmw.chatWindow(e_element);
                return false
            },
            k_elements = [],
            j_parentElements = [];
        for (var d = 0; d < h.length; d++) {
            b = h[d];
            l_buttonLink = m__document.createElement("a");
            b.className = (b.className + " " || "") + "bcStatic";
            l_buttonLink.setAttribute("href", "#");
            l_buttonLink.onclick = o_buttonLinkOnClick;
            if (!e_element.html) {
                f_element = new Image();
                f_element.setAttribute("border", 0);
                f_element.setAttribute("alt", e_element.altText);
                f_element.src = e_element.img
            } else {
                f_element = m__document.createElement("div");
                f_element.innerHTML = !e_element.img ? "" : e_element[e_element.img]
            }
            k_elements.push(f_element);
            l_buttonLink.appendChild(f_element);
            j_parentElements.push(l_buttonLink);
            b.appendChild(l_buttonLink)
        }
        if (g__window.pageViewer && pageViewer.addButton) {
            pageViewer.addButton({
                parents: j_parentElements,
                id: c_id,
                eid: e_element.id,
                tbid: e_element.html ? e_element.bdid : null,
                html: e_element.html,
                available: e_element.available,
                unavailable: e_element.unavailable,
                elements: k_elements,
                bdid: e_element.bdid,
                type: e_element.type,
                roid: e_element.roid,
                rdid: e_element.rdid,
                obj: e_element
            }, true)
        }
        if (window.pageViewer.addExperimentButton) {
            window.pageViewer.addExperimentButton({
                id: e_element.id,
                type: e_element.type
            }, e_element.originalButtonId)
        }
    }
};
window._bcvmt = {
    text: function (d) {
        if (window.pageViewer && pageViewer.removeButton) {
            pageViewer.removeButton(d.id)
        }
        if (d.hideUnsupported) {
            var k = (function () {
                try {
                    if (typeof navigator === "undefined") {
                        return false
                    }
                    if ((/^Opera\//).test(navigator.userAgent) || (/ OPR\//).test(navigator.userAgent)) {
                        return false
                    } else {
                        if (false && navigator.mozGetUserMedia) {
                            var firefoxVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
                            return firefoxVersion >= 38
                        } else {
                            if (navigator.webkitGetUserMedia) {
                                return !(/(iPad|iPhone|iPod)/g).test(navigator.userAgent)
                            }
                        }
                    }
                } catch (l) {}
                return false
            }());
            if (!k) {
                return
            }
        }
        if (!d.available) {
            return
        }
        var g_window = window,
            j_document = document,
            b = j_document.getElementById(d.id),
            c = Math.random() + "",
            i, h = j_document.createElement("div"),
            f = g_window._bcvm.textButtons[d.id],
            e = f && f[d.available];
        i = j_document.createElement("a");
        b.setAttribute("class", "bcText");
        i.setAttribute("href", "#");
        i.onclick = function () {
            g_window._bcvmw.chatWindow(d);
            return false
        };
        h.setAttribute("id", c);
        h.innerHTML = e;
        i.appendChild(h);
        b.appendChild(i);
        if (g_window.pageViewer && pageViewer.addButton) {
            pageViewer.addButton({
                parents: [i],
                id: c,
                available: f && f.available,
                unavailable: f && f.unavailable,
                tbid: d.id,
                type: d.type,
                roid: d.roid,
                rdid: d.rdid,
                obj: d
            }, true)
        }
    }
};
(function (g_document, e_window) {
    e_window.bcLoaded = true;
    var now = function () {
            return new Date().getTime()
        },
        getQueryParameters = function (m, k, j) {
            var n, l = m.indexOf(k + "=");
            if (l != -1) {
                l += k.length + 1;
                n = m.indexOf(j, l);
                return m.substring(l, n == -1 ? m.length : n)
            }
        },
        getCookie = function (j) {
            return getQueryParameters(g_document.cookie, j, ";")
        },
        setCookie = function (k, n, p) {
            var j = p && new Date(now() + p),
                l = g_document.location.host,
                o = l.indexOf(".");
            l = o == l.lastIndexOf(".") ? "." + l : l.substring(o);
            var m = l.indexOf(":");
            if (m !== -1) {
                l = l.substring(0, m)
            }
            g_document.cookie = k + "=" + n + (p ? ";expires=" + j.toUTCString() : "") + ";domain=" + (e_window._bcvm.domain || l) + ";path=" + (e_window._bcvm.path || "/")
        },
        c = function (j) {
            return getQueryParameters(g_document.location.href, j, "&")
        },
        a_copyObject = function (obj) {
            var newObj = {};
            for (var key in obj) {
                newObj[key] = obj[key]
            }
            return newObj
        };
    host = ".boldchat.com/aid/";
    e_window._bcvm = e_window._bcvm || {
        getCookie: getCookie,
        setCookie: setCookie,
        addEvent: function (event_window, eventName, listener) {
            var onEventName = "on" + eventName,
                currentEventFunction = event_window[onEventName];
            if (event_window.addEventListener) {
                event_window.addEventListener(eventName, listener, false)
            } else {
                if (event_window.attachEvent) {
                    event_window.attachEvent(onEventName, listener)
                } else {
                    event_window[onEventName] = function (n) {
                        listener(n);
                        return currentEventFunction(n)
                    }
                }
            }
        },
        loadScript: function (src) {
            var j = g_document.getElementsByTagName("head")[0] || g_document.body;
            var k_scriptElement = g_document.createElement("script");
            k_scriptElement.id = "bcvm_script_" + new Date().getTime();
            k_scriptElement.async = true;
            k_scriptElement.type = "text/javascript";
            k_scriptElement.src = src;
            j.appendChild(k_scriptElement)
        },
        textButtons: {},
        getPageViewer: function (E) {
            var I_setTimeout = setTimeout,
                l_clearTimeout = clearTimeout,
                aF_Image = new Image(),
                C = [],
                H = 0,
                ac = new Image(),
                ax = function () {
                    return (an ? 2 : 1) * (H >= 60000 ? (H >= 600000 ? (H >= 3600000 ? (H >= 14400000 ? (H >= 43200000 ? 300 : 180) : 120) : 60) : 30) : (H >= 10000 ? (H >= 30000 ? 30 : 30) : 30)) * 1000
                },
                ao = g_document.location.protocol,
                ar = "https:" == ao ? "https://" : "http://",
                ah = (ao == "https:" || ao == "http:") && true,
                L, aU, an = false,
                p, ag = false,
                aR = {},
                aq_buttons = {},
                D = "",
                z = "",
                al = "",
                aj, af_visitorID, aQ, v, ad, aJ = "",
                am, ab, aM, aL_SecureParametersKey = "SecureParameters",
                A_VisitInfoKeys = {
                    VisitRef: "vr",
                    VisitInfo: "vi",
                    VisitName: "vn",
                    VisitPhone: "vp",
                    VisitEmail: "ve"
                },
                j_ParamKeys = {
                    WindowParameters: "&",
                    OpenParameters: ","
                },
                at = {
                    OpenParameters: "op",
                    InvitationID: "idid",
                    InvitationDefID: "idid",
                    WindowScheme: "cp",
                    CharSet: ".cs",
                    CustomUrl: "curl",
                    ChatWidth: "cwidth",
                    ChatHeight: "cheight",
                    CallWidth: "pwidth",
                    CallHeight: "pheight",
                    ChatWindowID: "cwdid",
                    ChatWindowDefID: "cwdid",
                    CallWindowDefID: "pwdid",
                    Language: "lc",
                    Difficulty: "Difficulty",
                    Urgency: "Urgency"
                },
                t_ConversionKeys = {
                    ConversionCodeID: "ccid",
                    ConversionAmount: "ca",
                    ConversionRef: "cr",
                    ConversionInfo: "ci"
                },
                J_parameters = {},
                G = {},
                ae = function () {
                    return Math.floor(parseFloat(E) * 99 / 1000000 + (now() - 1332800000000) + Math.random() * 1000000) + "" + Math.floor(1000 + Math.random() * (10000 - 1000))
                },
                x_setDomain = function (aV) {
                    e_window._bcvm.domain = aV
                },
                q_setPath = function (aV) {
                    e_window._bcvm.path = aV
                },
                Z_set = function (aW, aV, aX) {
                    p = aX;
                    aJ = ak_ParameterizeKeyValue("wdid", aP_getParameter("WebsiteDefID") || aP_getParameter("WebsiteID")) + ak_ParameterizeKeyValue("pvid", p);
                    aG(aW, aV);
                    M = true;
                    n_load()
                },
                aG = function (aW, aV) {
                    aQ = aP_getParameter("WebsiteDefID") || aP_getParameter("WebsiteID") || E;
                    v = "_bcvm_vid_" + aQ;
                    ad = "_bcvm_vrid_" + aQ;
                    aj = aV || ah && getCookie(v) || c(v) || aj;
                    af_visitorID = aW || ah && getCookie(ad) || c(ad) || af_visitorID;
                    if (aj && ah) {
                        setCookie(v, aj)
                    }
                    if (af_visitorID && ah) {
                        setCookie(ad, af_visitorID, 365 * 86400000)
                    }
                },
                aa = function (aW, aV) {
                    aG();
                    var aX = aW.indexOf("#");
                    return aW.substring(0, aX == -1 ? aW.length : aX) + (aW.indexOf("?") == -1 ? "?" : "") + (ah ? ak_ParameterizeKeyValue("_bcvm_vrid_", "true") : "") + ak_ParameterizeKeyValue(v, aj) + ak_ParameterizeKeyValue(ad, af_visitorID) + (aV ? "" : ak_ParameterizeKeyValue("curl", J_parameters.CustomUrl) + "&" + (J_parameters.WindowParameters || "")) + (aX == -1 ? "" : aW.substring(aX))
                },
                u_link = function (aW, aV) {
                    for (var aX = 0; aX < aS.length; aX++) {
                        aW = aS[aX](aW, aV)
                    }
                    return aW
                },
                aS = [aa],
                az_addLink = function (aV) {
                    aS.push(aV)
                },
                P_removeLink = function (aV) {
                    for (var aW = 0; aW < aS.length; aW++) {
                        if (aS[aW] == aV) {
                            aS.splice(aW, 1)
                        }
                    }
                },
                ai_doExperiments = function () {
                    return p
                },
                m_setAccountID = function (aV) {
                    E = aV;
                    e_window._bcvm.host = host + E
                },
                aK = function (aW, a0) {
                    if (!aW) {
                        return {}
                    }
                    var aZ = aW.split(a0),
                        aV, aY, aX = {};
                    for (aV = 0; aV < aZ.length; aV++) {
                        aY = aZ[aV].indexOf("=");
                        aX[aY == -1 ? aZ[aV] : aZ[aV].substring(0, aY)] = aY == -1 ? null : aZ[aV].substring(aY + 1)
                    }
                    return aX
                },
                T = function (aZ, aX, a1) {
                    if (!a1) {
                        return aX || aZ
                    }
                    var aV = aK(aZ, a1),
                        aW = aK(aX, a1),
                        a0 = "";
                    for (var aY in aW) {
                        if (!aV[aY] || aW[aY]) {
                            aV[aY] = aW[aY]
                        }
                    }
                    for (var aY in aV) {
                        if (a0 != "") {
                            a0 += a1
                        }
                        a0 += aY + (aV[aY] == null ? "" : "=" + aV[aY])
                    }
                    return a0
                },
                aE_setParameter = function (aX, aV, aW) {
                    J_parameters[aX] = aW ? aV : T(J_parameters[aX], aV, j_ParamKeys[aX])
                },
                aP_getParameter = function (aX_key, aW) {
                    var aV = (aW ? aW[aX_key] : null) || (aW && aW.id && G[aW.id] ? G[aW.id]["parameters"][aX_key] : null) || J_parameters[aX_key] || "";
                    return aV
                },
                aA_getWindowParameter = function (a1, aX) {
                    var aW = {};
                    var a0 = aP_getParameter("WindowParameters", aX);
                    if (a0 && a0.length) {
                        var aZ = a0.split(j_ParamKeys.WindowParameters);
                        for (var aV = 0; aV < aZ.length; aV++) {
                            var aY = aZ[aV].split("=");
                            aW[aY[0] && decodeURIComponent(aY[0])] = aY[1] && decodeURIComponent(aY[1])
                        }
                    }
                    return aP_getParameter(a1, aX) || aW[a1] || aW[A_VisitInfoKeys[a1]] || aW[at[a1]]
                },
                ak_ParameterizeKeyValue = function (key, value, firstParameter) {
                    return value && value != "" ? (firstParameter ? "?" : "&") + key + "=" + (encodeURIComponent || escape)(typeof value == "function" ? value() : value) : ""
                },
                aN_ParameterizeKeyValues = function (aY, aX) {
                    var aW = "",
                        aV;
                    for (var aZ_key in aY) {
                        aW += ak_ParameterizeKeyValue(aY[aZ_key], aP_getParameter(aZ_key, aX))
                    }
                    return aW
                },
                ap_beforeUnloadEvent = function () {
                    setCookie("bc_pv_end", p, 30000)
                },
                N_focusEvent = function () {
                    an = false;
                    var aV = ax() - (now() - aU - H);
                    if (L) {
                        l_clearTimeout(L);
                        L = null;
                        if (aV > 0) {
                            L = I_setTimeout(aw, aV)
                        } else {
                            Q()
                        }
                    }
                },
                w_blurEvent = function () {
                    an = true
                },
                k = {
                    id: "pageView"
                },
                o_LoadInvitationScript = function (ftid, visitIndicator) {
                    H = 0;
                    _bcvm.loadScript("https://ci" + host + E + "/bc.inv/ci.js?resize=true&std=" + (document.compatMode == "CSS1Compat") + "&ftid=" + ftid + "&visit=" + visitIndicator + aJ + aN_ParameterizeKeyValues(at, k) + "&" + now())
                },
                isCobrowseSetupped = false,
                y = function () {
                    if (!isCobrowseSetupped) {
                        isCobrowseSetupped = true;
                        H = -99999999;
                        _bcvm.loadScript(ar + "vms" + host + E + "/bc.cobrowse/setup.js?wait=250" + aJ);
                        _bcvm.loadScript(ar + "vms" + host + E + "/visitor/cobrowse/script.jsp")
                    } else {
                        if (typeof _bccb != "undefined") {
                            _bccb.initialize(p)
                        }
                    }
                },
                Y = function (aV) {
                    if (aV == 4) {
                        o_LoadInvitationScript(29, "true")
                    }
                    if (aV == 5) {
                        o_LoadInvitationScript(51, "true")
                    }
                    if (aV == 6) {
                        _bccb.receive()
                    }
                    if (aV == 7) {
                        y()
                    }
                },
                S_update = function (aZ, aW, a0, aY) {
                    var aV = aR[aZ] && aR[aZ].elements || [g_document.getElementById(aZ)],
                        a1, a2 = !aW ? "" : aR[aZ] && aR[aZ][aW];
                    if (aR[aZ] && aR[aZ].obj) {
                        aR[aZ].obj.token = aY
                    }
                    for (var aX = 0; aX < aV.length; aX++) {
                        a1 = aV[aX];
                        if (a0 && a1 && a1.innerHTML != a2) {
                            a1.innerHTML = a2
                        } else {
                            if (!a0 && a1 && a1.src != aW) {
                                a1.src = aW
                            }
                        }
                    }
                },
                aO_removeButton = function (id) {
                    var aX = aq_buttons[id];
                    if (aX) {
                        var parents = aX.parents;
                        for (var i = 0; parents && i < parents.length; i++) {
                            parents[i].parentNode.removeChild(parents[i])
                        }
                        delete aR[aX.id];
                        delete aq_buttons[id]
                    }
                },
                R = function (aV) {
                    var aW = aV.id;
                    return ak_ParameterizeKeyValue("bdid", aW) + ak_ParameterizeKeyValue(aW + "_html", aV.html) + ak_ParameterizeKeyValue(aW + "_roid", aV.roid) + ak_ParameterizeKeyValue(aW + "_rdid", aV.rdid) + ak_ParameterizeKeyValue(aW + (aV.tbid ? "_tbid" : aV.type == "call" ? "_pbdid" : "_cbdid"), aV.tbid || aV.bdid)
                },
                X_addButton = function (aW, aV) {
                    if (aV) {
                        aR[aW.id] = aW;
                        aq_buttons[aW.eid || aW.bdid || aW.tbid] = aW
                    } else {
                        D += R(aW)
                    }
                },
                aH_addFloat = function (aW) {
                    var aV = (aW.type == "call" ? "&fpbdid=" : "&fcbdid=") + aW.id;
                    al = U(aW, aV);
                    aC_setParametersAndQuery(aW.id, J_parameters, aV)
                },
                aB_addExperimentButton = function (aV, aW) {
                    if (!G[aV.id] && G[aW]) {
                        G[aV.id] = G[aW]
                    }
                },
                av_addStatic = function (aW) {
                    var aV = (aW.type == "call" ? "&spbdid=" : "&scbdid=") + aW.bdid + "," + aW.id;
                    al = U(aW, aV);
                    aC_setParametersAndQuery(aW.id, J_parameters, aV)
                },
                W_addText = function (aW_button) {
                    var aV_query = (aW_button.type == "call" ? "&tpwdid=" : "&tcwdid=") + aW_button.id + "," + (aW_button.window || "") + "," + (aW_button.department || "") + "," + (aW_button.operator || "");
                    al = U(aW_button, aV_query);
                    aC_setParametersAndQuery(aW_button.id, J_parameters, aV_query);
                    _bcvm.textButtons[aW_button.id] = aW_button
                },
                au = function () {
                    var aW = aF_Image.width & 7,
                        aV = aF_Image.height;
                    F_check(aV, aW)
                },
                aD_timeoutID = null,
                F_check = function (aV, aW) {
                    if (aW == 2) {
                        l_clearTimeout(L);
                        L = null
                    }
                    if (aW == 3) {
                        V_pageViewed(am, "")
                    }
                    if (aW >= 4) {
                        if (aD_timeoutID) {
                            l_clearTimeout(aD_timeoutID)
                        }
                        aD_timeoutID = I_setTimeout(function () {
                            aD_timeoutID = null;
                            o_LoadInvitationScript(aW == 4 ? 29 : 51, "false")
                        }, (aV - 1) * 1000 + 1)
                    }
                    if (aW == 1) {
                        Y(aV & 15)
                    }
                },
                aw = function () {
                    Q()
                },
                Q = function (aW) {
                    H = now() - aU;
                    var aV = "";
                    for (var aY in aR) {
                        aV += R(aR[aY])
                    }
                    var aX = u_link(ar + "vmp" + host + E + "/bc.vm?blur=" + an + "&poll=" + (5000 + 2 * ax()) + aJ + aV + D + "&" + now());
                    if (aV || D) {
                        _bcvm.loadScript(aX.replace("?", "?script=true&"))
                    } else {
                        aF_Image.src = aX
                    }
                    if (!aW) {
                        L = I_setTimeout(aw, ax())
                    }
                },
                K_reinvite = function (aV, aW) {
                    V_pageViewed(null, null, aV, aW)
                },
                M = true,
                n_load = function () {
                    var aZ = e_window._bcvma || [],
                        aW = aZ.length || 0;
                    e_window._bcvma = [];
                    for (var aX = 0; aX < aZ.length || 0; aX++) {
                        var a1 = aZ[aX],
                            aY = (a1 || [])[0];
                        if (aY == "pageViewed" && aX < aW) {
                            G[k.id] = {
                                parameters: a_copyObject(J_parameters)
                            };
                            aZ.push(a1)
                        } else {
                            var aV = e_pageViewer[aY];
                            if (aV) {
                                aV(a1[1], a1[2])
                            }
                        }
                    }
                    if (al != z) {
                        V_pageViewed(null, null, null, null, true)
                    }
                    if (M) {
                        var a0 = e_window._bcct || [];
                        e_window._bcct = [];
                        for (var aX = 0; aX < a0.length; aX++) {
                            s_conversion(a0[aX])
                        }
                    }
                },
                ay_addConversion = function (aV) {
                    e_window._bcct = e_window._bcct || [];
                    e_window._bcct.push(aV)
                },
                s_conversion = function (aX, aZ, aW) {
                    if (aZ && aX[aL_SecureParametersKey]) {
                        return true
                    }
                    for (var aY in t_ConversionKeys) {
                        aE_setParameter(aY, null, true)
                    }
                    for (var aY in aX) {
                        if (aX[aY] && aX[aY] != "") {
                            aE_setParameter(aY, aX[aY])
                        }
                    }
                    if (!aW) {
                        aW = aP_getParameter(aL_SecureParametersKey)
                    }
                    if (typeof aW == "function") {
                        aW = aW(function (a0) {
                            s_conversion(aX, aZ, a0)
                        }, "conversion");
                        if (!aW) {
                            return
                        }
                    }
                    if (!aZ) {
                        var aV = new Image();
                        aV.src = u_link(ar + "vms" + host + E + "/bc.vci?" + now() + (aJ || ak_ParameterizeKeyValue("wdid", aP_getParameter("WebsiteDefID") || aP_getParameter("WebsiteID"))) + aN_ParameterizeKeyValues(A_VisitInfoKeys) + aN_ParameterizeKeyValues(t_ConversionKeys) + ak_ParameterizeKeyValue("secured", aW));
                        C.push(aV)
                    }
                },
                aI = function () {
                    var aX = screen,
                        aY = e_window.devicePixelRatio || (aX.deviceXDPI || 1) / (aX.logicalXDPI || 1),
                        aV = aY,
                        a1 = g_document.createElement("div"),
                        aW_Style = "height: 1in; left: -100%; position: absolute; top: -100%; width: 10%;";
                    a1.setAttribute("style", aW_Style);
                    try {
                        g_document.body.appendChild(a1)
                    } catch (a0) {
                        try {
                            g_document.body.insertBefore(a1, g_document.body.firstChild)
                        } catch (a0) {}
                    }
                    if (Math.abs(aX.width / a1.offsetWidth / 10 - aV) / aV < 0.2) {
                        aV = 1
                    }
                    var aZ = (aX && aX.width && aX.height ? "&swidth=" + (aX.width * aV) + "&sheight=" + (aX.height * aV) : "") + (a1 && a1.offsetWidth ? "&sdpi=" + (96 * aY) : "");
                    try {
                        g_document.body.removeChild(a1)
                    } catch (a0) {}
                    return aZ
                },
                V_pageViewed = function (aW, a4, aX, a5, a1, aZ) {
                    if (!aZ) {
                        aZ = aP_getParameter(aL_SecureParametersKey, k)
                    }
                    if (typeof aZ == "function") {
                        aZ = aZ(function (a7) {
                            V_pageViewed(aW, a4, aX, a5, a1, a7)
                        }, "visit");
                        if (!aZ) {
                            return
                        }
                    }
                    var a0 = [],
                        a3, a6 = p || getCookie("bc_pv_end"),
                        aY = e_window.hideBox || e_window.bt_hideAnimationImpl;
                    if (!aX && !a1) {
                        M = false;
                        a0 = e_window._bcct || [];
                        e_window._bcct = a0
                    }
                    if (a6) {
                        setCookie("bc_pv_end", "", 0)
                    }
                    am = aW || g_document.location.href;
                    aM = a4 || g_document.referrer;
                    if (am.indexOf("bc_ignore_vm") != -1) {
                        a1 = true
                    }
                    H = 0;
                    aU = now();
                    if (L && !a1) {
                        l_clearTimeout(L)
                    }
                    var a2 = a0[0] && s_conversion(a0[0], true);
                    if (a0[0] && !a2) {
                        e_window._bcct = a0.splice(1)
                    }
                    aF_Image.onload = au;
                    if (!aX && !a1) {
                        p = null
                    }
                    aJ = ak_ParameterizeKeyValue("wdid", aP_getParameter("WebsiteDefID", k) || aP_getParameter("WebsiteID", k)) + ak_ParameterizeKeyValue("pvid", p);
                    var aV = u_link(ar + "vms" + host + E + "/bc.pv?blur=" + an + "&vm=" + !a1 + "&poll=" + (5000 + 2 * ax()) + aI() + (aX ? ak_ParameterizeKeyValue("reinvite", aX) + ak_ParameterizeKeyValue("adi", a5) : ak_ParameterizeKeyValue("vpvid", c("vpvid")) + ak_ParameterizeKeyValue("pve", a6) + ak_ParameterizeKeyValue("url", am) + ak_ParameterizeKeyValue("referrer", aM) + aN_ParameterizeKeyValues(A_VisitInfoKeys, k)) + ak_ParameterizeKeyValue("secured", aZ) + aJ + aN_ParameterizeKeyValues(at, k) + (a2 ? "" : aN_ParameterizeKeyValues(t_ConversionKeys)) + "&" + now());
                    _bcvm.loadScript(aV.replace("?", "?script=true&securevm=true&") + (aX ? "" : "&hasbutton=" + ag + al));
                    z = al;
                    if (!a1) {
                        L = I_setTimeout(aw, ax())
                    }
                },
                r_setCustomChatWindow = function (aV) {
                    if (_bcvmw) {
                        _bcvmw.customChatWindow = aV
                    }
                },
                O_getVisitorID = function () {
                    return af_visitorID
                };

            function U(aW, aV) {
                var aX = B(aW.id);
                return aX + aV
            }

            function B(aW_id) {
                var aX = al;
                if (G[aW_id]) {
                    var aY_query = G[aW_id].query;
                    var aV = new RegExp(aY_query + "(?=&|$)");
                    aX = aX.replace(aV, "")
                }
                return aX
            }

            function aC_setParametersAndQuery(id, parameters, query) {
                G[id] = {
                    parameters: a_copyObject(parameters),
                    id: id,
                    query: query
                }
            }
            _bcvm.addEvent(e_window, "beforeunload", ap_beforeUnloadEvent);
            _bcvm.addEvent(e_window, "focus", N_focusEvent);
            _bcvm.addEvent(e_window, "blur", w_blurEvent);
            _bcvm.pageViewer = {
                set: Z_set,
                doExperiments: ai_doExperiments,
                setAccountID: m_setAccountID,
                setDomain: x_setDomain,
                setPath: q_setPath,
                pageViewed: V_pageViewed,
                load: n_load,
                reinvite: K_reinvite,
                check: F_check,
                getParameter: aP_getParameter,
                getWindowParameter: aA_getWindowParameter,
                setParameter: aE_setParameter,
                setCustomChatWindow: r_setCustomChatWindow,
                getVisitorID: O_getVisitorID,
                addFloat: aH_addFloat,
                addStatic: av_addStatic,
                addText: W_addText,
                addButton: X_addButton,
                removeButton: aO_removeButton,
                update: S_update,
                addExperimentButton: aB_addExperimentButton,
                addConversion: ay_addConversion,
                conversion: s_conversion,
                link: u_link,
                removeLink: P_removeLink,
                addLink: az_addLink
            };
            return _bcvm.pageViewer
        },
        select: function (m) {
            if (!g_document.getElementsByTagName) {
                return []
            }
            m = m.replace(/\s*([^\w])\s*/g, "$1");
            var D = [],
                q = m.split(","),
                z, L, k, J, p;
            var q = m.split(",");
            var y = function (S, P) {
                if (!P) {
                    P = "*"
                }
                z = [];
                for (var Q = 0, o = S.length; p = S[Q], Q < o; Q++) {
                    var l;
                    if (P == "*") {
                        l = p.all ? p.all : p.getElementsByTagName("*")
                    } else {
                        l = p.getElementsByTagName(P)
                    }
                    for (var j = 0, R = l.length; j < R; j++) {
                        z.push(l[j])
                    }
                }
            };
            COMMA: for (var M = 0, v = q.length; L = q[M], M < v; M++) {
                var n = [g_document],
                    A = L.split(" ");
                SPACE: for (var K = 0, u = A.length; k = A[K], K < u; K++) {
                    var leftBracketIndex = k.indexOf("["),
                        rightBracketIndex = k.indexOf("]"),
                        hashTagIndex = k.indexOf("#");
                    if (hashTagIndex + 1 && !(hashTagIndex > leftBracketIndex && hashTagIndex < rightBracketIndex)) {
                        var E = k.split("#"),
                            O = E[0],
                            B_elementId = E[1],
                            x = g_document.getElementById(B_elementId);
                        if (!x || (O && x.nodeName.toLowerCase() != O)) {
                            continue COMMA
                        }
                        n = [x];
                        continue SPACE
                    }
                    hashTagIndex = k.indexOf(".");
                    if (hashTagIndex + 1 && !(hashTagIndex > leftBracketIndex && hashTagIndex < rightBracketIndex)) {
                        var E = k.split("."),
                            O = E[0],
                            I = E[1];
                        y(n, O);
                        n = [];
                        for (var H = 0, N = z.length; J = z[H], H < N; H++) {
                            if (J.className && J.className.match(new RegExp("(^|s)" + I + "(s|$)"))) {
                                n.push(J)
                            }
                        }
                        continue SPACE
                    }
                    if (k.indexOf("[") + 1) {
                        if (k.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?['"]?([^\]'"]*)['"]?\]$/)) {
                            var O = RegExp.$1,
                                G = RegExp.$2,
                                w = RegExp.$3,
                                F = RegExp.$4
                        }
                        y(n, O);
                        n = [];
                        for (var H = 0, N = z.length; J = z[H], H < N; H++) {
                            if (w == "=" && J.getAttribute(G) != F) {
                                continue
                            }
                            if (w == "~" && !J.getAttribute(G).match(new RegExp("(^|\\s)" + F + "(\\s|$)"))) {
                                continue
                            }
                            if (w == "|" && !J.getAttribute(G).match(new RegExp("^" + F + "-?"))) {
                                continue
                            }
                            if (w == "^" && J.getAttribute(G).indexOf(F) != 0) {
                                continue
                            }
                            if (w == "$" && J.getAttribute(G).lastIndexOf(F) != (J.getAttribute(G).length - F.length)) {
                                continue
                            }
                            if (w == "*" && !(J.getAttribute(G).indexOf(F) + 1)) {
                                continue
                            } else {
                                if (!J.getAttribute(G)) {
                                    continue
                                }
                            }
                            n.push(J)
                        }
                        continue SPACE
                    }
                    y(n, k);
                    n = z
                }
                for (var C = 0, N = n.length; C < N; C++) {
                    D.push(n[C])
                }
            }
            return D
        }
    };
    var e_pageViewer = e_window.pageViewer || e_window._bcvm.getPageViewer();
    e_window.pageViewer = e_pageViewer;
    e_window.pageViewer.load()
})(document, window);