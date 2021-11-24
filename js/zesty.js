(() => {
    var lt = Object.create,
        B = Object.defineProperty;
    var ct = Object.getOwnPropertyDescriptor;
    var ft = Object.getOwnPropertyNames;
    var pt = Object.getPrototypeOf,
        ht = Object.prototype.hasOwnProperty;
    var dt = (t) => B(t, "__esModule", { value: !0 });
    var c = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
    var mt = (t, e, r) => {
            if ((e && typeof e == "object") || typeof e == "function") for (let s of ft(e)) !ht.call(t, s) && s !== "default" && B(t, s, { get: () => e[s], enumerable: !(r = ct(e, s)) || r.enumerable });
            return t;
        },
        re = (t) => mt(dt(B(t != null ? lt(pt(t)) : {}, "default", t && t.__esModule && "default" in t ? { get: () => t.default, enumerable: !0 } : { value: t, enumerable: !0 })), t);
    var P = c((ur, se) => {
        "use strict";
        se.exports = function (e, r) {
            return function () {
                for (var n = new Array(arguments.length), a = 0; a < n.length; a++) n[a] = arguments[a];
                return e.apply(r, n);
            };
        };
    });
    var h = c((lr, ae) => {
        "use strict";
        var yt = P(),
            g = Object.prototype.toString;
        function z(t) {
            return g.call(t) === "[object Array]";
        }
        function D(t) {
            return typeof t == "undefined";
        }
        function bt(t) {
            return t !== null && !D(t) && t.constructor !== null && !D(t.constructor) && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
        }
        function gt(t) {
            return g.call(t) === "[object ArrayBuffer]";
        }
        function wt(t) {
            return typeof FormData != "undefined" && t instanceof FormData;
        }
        function xt(t) {
            var e;
            return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? (e = ArrayBuffer.isView(t)) : (e = t && t.buffer && t.buffer instanceof ArrayBuffer), e;
        }
        function vt(t) {
            return typeof t == "string";
        }
        function Et(t) {
            return typeof t == "number";
        }
        function ne(t) {
            return t !== null && typeof t == "object";
        }
        function C(t) {
            if (g.call(t) !== "[object Object]") return !1;
            var e = Object.getPrototypeOf(t);
            return e === null || e === Object.prototype;
        }
        function qt(t) {
            return g.call(t) === "[object Date]";
        }
        function Ct(t) {
            return g.call(t) === "[object File]";
        }
        function Tt(t) {
            return g.call(t) === "[object Blob]";
        }
        function ie(t) {
            return g.call(t) === "[object Function]";
        }
        function Rt(t) {
            return ne(t) && ie(t.pipe);
        }
        function St(t) {
            return typeof URLSearchParams != "undefined" && t instanceof URLSearchParams;
        }
        function At(t) {
            return t.replace(/^\s*/, "").replace(/\s*$/, "");
        }
        function kt() {
            return typeof navigator != "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window != "undefined" && typeof document != "undefined";
        }
        function F(t, e) {
            if (!(t === null || typeof t == "undefined"))
                if ((typeof t != "object" && (t = [t]), z(t))) for (var r = 0, s = t.length; r < s; r++) e.call(null, t[r], r, t);
                else for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.call(null, t[n], n, t);
        }
        function j() {
            var t = {};
            function e(n, a) {
                C(t[a]) && C(n) ? (t[a] = j(t[a], n)) : C(n) ? (t[a] = j({}, n)) : z(n) ? (t[a] = n.slice()) : (t[a] = n);
            }
            for (var r = 0, s = arguments.length; r < s; r++) F(arguments[r], e);
            return t;
        }
        function Ot(t, e, r) {
            return (
                F(e, function (n, a) {
                    r && typeof n == "function" ? (t[a] = yt(n, r)) : (t[a] = n);
                }),
                t
            );
        }
        function Lt(t) {
            return t.charCodeAt(0) === 65279 && (t = t.slice(1)), t;
        }
        ae.exports = {
            isArray: z,
            isArrayBuffer: gt,
            isBuffer: bt,
            isFormData: wt,
            isArrayBufferView: xt,
            isString: vt,
            isNumber: Et,
            isObject: ne,
            isPlainObject: C,
            isUndefined: D,
            isDate: qt,
            isFile: Ct,
            isBlob: Tt,
            isFunction: ie,
            isStream: Rt,
            isURLSearchParams: St,
            isStandardBrowserEnv: kt,
            forEach: F,
            merge: j,
            extend: Ot,
            trim: At,
            stripBOM: Lt,
        };
    });
    var M = c((cr, ue) => {
        "use strict";
        var w = h();
        function oe(t) {
            return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        ue.exports = function (e, r, s) {
            if (!r) return e;
            var n;
            if (s) n = s(r);
            else if (w.isURLSearchParams(r)) n = r.toString();
            else {
                var a = [];
                w.forEach(r, function (l, b) {
                    l === null ||
                        typeof l == "undefined" ||
                        (w.isArray(l) ? (b = b + "[]") : (l = [l]),
                        w.forEach(l, function (m) {
                            w.isDate(m) ? (m = m.toISOString()) : w.isObject(m) && (m = JSON.stringify(m)), a.push(oe(b) + "=" + oe(m));
                        }));
                }),
                    (n = a.join("&"));
            }
            if (n) {
                var u = e.indexOf("#");
                u !== -1 && (e = e.slice(0, u)), (e += (e.indexOf("?") === -1 ? "?" : "&") + n);
            }
            return e;
        };
    });
    var ce = c((fr, le) => {
        "use strict";
        var Ut = h();
        function T() {
            this.handlers = [];
        }
        T.prototype.use = function (e, r) {
            return this.handlers.push({ fulfilled: e, rejected: r }), this.handlers.length - 1;
        };
        T.prototype.eject = function (e) {
            this.handlers[e] && (this.handlers[e] = null);
        };
        T.prototype.forEach = function (e) {
            Ut.forEach(this.handlers, function (s) {
                s !== null && e(s);
            });
        };
        le.exports = T;
    });
    var pe = c((pr, fe) => {
        "use strict";
        var Nt = h();
        fe.exports = function (e, r, s) {
            return (
                Nt.forEach(s, function (a) {
                    e = a(e, r);
                }),
                e
            );
        };
    });
    var I = c((hr, he) => {
        "use strict";
        he.exports = function (e) {
            return !!(e && e.__CANCEL__);
        };
    });
    var me = c((dr, de) => {
        "use strict";
        var Bt = h();
        de.exports = function (e, r) {
            Bt.forEach(e, function (n, a) {
                a !== r && a.toUpperCase() === r.toUpperCase() && ((e[r] = n), delete e[a]);
            });
        };
    });
    var be = c((mr, ye) => {
        "use strict";
        ye.exports = function (e, r, s, n, a) {
            return (
                (e.config = r),
                s && (e.code = s),
                (e.request = n),
                (e.response = a),
                (e.isAxiosError = !0),
                (e.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                    };
                }),
                e
            );
        };
    });
    var H = c((yr, ge) => {
        "use strict";
        var Pt = be();
        ge.exports = function (e, r, s, n, a) {
            var u = new Error(e);
            return Pt(u, r, s, n, a);
        };
    });
    var xe = c((br, we) => {
        "use strict";
        var zt = H();
        we.exports = function (e, r, s) {
            var n = s.config.validateStatus;
            !s.status || !n || n(s.status) ? e(s) : r(zt("Request failed with status code " + s.status, s.config, null, s.request, s));
        };
    });
    var Ee = c((gr, ve) => {
        "use strict";
        var R = h();
        ve.exports = R.isStandardBrowserEnv()
            ? (function () {
                  return {
                      write: function (r, s, n, a, u, i) {
                          var l = [];
                          l.push(r + "=" + encodeURIComponent(s)),
                              R.isNumber(n) && l.push("expires=" + new Date(n).toGMTString()),
                              R.isString(a) && l.push("path=" + a),
                              R.isString(u) && l.push("domain=" + u),
                              i === !0 && l.push("secure"),
                              (document.cookie = l.join("; "));
                      },
                      read: function (r) {
                          var s = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
                          return s ? decodeURIComponent(s[3]) : null;
                      },
                      remove: function (r) {
                          this.write(r, "", Date.now() - 864e5);
                      },
                  };
              })()
            : (function () {
                  return {
                      write: function () {},
                      read: function () {
                          return null;
                      },
                      remove: function () {},
                  };
              })();
    });
    var Ce = c((wr, qe) => {
        "use strict";
        qe.exports = function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
        };
    });
    var Re = c((xr, Te) => {
        "use strict";
        Te.exports = function (e, r) {
            return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e;
        };
    });
    var Ae = c((vr, Se) => {
        "use strict";
        var Dt = Ce(),
            Ft = Re();
        Se.exports = function (e, r) {
            return e && !Dt(r) ? Ft(e, r) : r;
        };
    });
    var Oe = c((Er, ke) => {
        "use strict";
        var _ = h(),
            jt = [
                "age",
                "authorization",
                "content-length",
                "content-type",
                "etag",
                "expires",
                "from",
                "host",
                "if-modified-since",
                "if-unmodified-since",
                "last-modified",
                "location",
                "max-forwards",
                "proxy-authorization",
                "referer",
                "retry-after",
                "user-agent",
            ];
        ke.exports = function (e) {
            var r = {},
                s,
                n,
                a;
            return (
                e &&
                    _.forEach(
                        e.split(`
`),
                        function (i) {
                            if (((a = i.indexOf(":")), (s = _.trim(i.substr(0, a)).toLowerCase()), (n = _.trim(i.substr(a + 1))), s)) {
                                if (r[s] && jt.indexOf(s) >= 0) return;
                                s === "set-cookie" ? (r[s] = (r[s] ? r[s] : []).concat([n])) : (r[s] = r[s] ? r[s] + ", " + n : n);
                            }
                        }
                    ),
                r
            );
        };
    });
    var Ne = c((qr, Ue) => {
        "use strict";
        var Le = h();
        Ue.exports = Le.isStandardBrowserEnv()
            ? (function () {
                  var e = /(msie|trident)/i.test(navigator.userAgent),
                      r = document.createElement("a"),
                      s;
                  function n(a) {
                      var u = a;
                      return (
                          e && (r.setAttribute("href", u), (u = r.href)),
                          r.setAttribute("href", u),
                          {
                              href: r.href,
                              protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                              host: r.host,
                              search: r.search ? r.search.replace(/^\?/, "") : "",
                              hash: r.hash ? r.hash.replace(/^#/, "") : "",
                              hostname: r.hostname,
                              port: r.port,
                              pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
                          }
                      );
                  }
                  return (
                      (s = n(window.location.href)),
                      function (u) {
                          var i = Le.isString(u) ? n(u) : u;
                          return i.protocol === s.protocol && i.host === s.host;
                      }
                  );
              })()
            : (function () {
                  return function () {
                      return !0;
                  };
              })();
    });
    var K = c((Cr, Be) => {
        "use strict";
        var S = h(),
            Mt = xe(),
            It = Ee(),
            Ht = M(),
            _t = Ae(),
            Wt = Oe(),
            Kt = Ne(),
            W = H();
        Be.exports = function (e) {
            return new Promise(function (s, n) {
                var a = e.data,
                    u = e.headers;
                S.isFormData(a) && delete u["Content-Type"];
                var i = new XMLHttpRequest();
                if (e.auth) {
                    var l = e.auth.username || "",
                        b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                    u.Authorization = "Basic " + btoa(l + ":" + b);
                }
                var v = _t(e.baseURL, e.url);
                if (
                    (i.open(e.method.toUpperCase(), Ht(v, e.params, e.paramsSerializer), !0),
                    (i.timeout = e.timeout),
                    (i.onreadystatechange = function () {
                        if (!(!i || i.readyState !== 4) && !(i.status === 0 && !(i.responseURL && i.responseURL.indexOf("file:") === 0))) {
                            var o = "getAllResponseHeaders" in i ? Wt(i.getAllResponseHeaders()) : null,
                                E = !e.responseType || e.responseType === "text" ? i.responseText : i.response,
                                ut = { data: E, status: i.status, statusText: i.statusText, headers: o, config: e, request: i };
                            Mt(s, n, ut), (i = null);
                        }
                    }),
                    (i.onabort = function () {
                        !i || (n(W("Request aborted", e, "ECONNABORTED", i)), (i = null));
                    }),
                    (i.onerror = function () {
                        n(W("Network Error", e, null, i)), (i = null);
                    }),
                    (i.ontimeout = function () {
                        var o = "timeout of " + e.timeout + "ms exceeded";
                        e.timeoutErrorMessage && (o = e.timeoutErrorMessage), n(W(o, e, "ECONNABORTED", i)), (i = null);
                    }),
                    S.isStandardBrowserEnv())
                ) {
                    var m = (e.withCredentials || Kt(v)) && e.xsrfCookieName ? It.read(e.xsrfCookieName) : void 0;
                    m && (u[e.xsrfHeaderName] = m);
                }
                if (
                    ("setRequestHeader" in i &&
                        S.forEach(u, function (o, E) {
                            typeof a == "undefined" && E.toLowerCase() === "content-type" ? delete u[E] : i.setRequestHeader(E, o);
                        }),
                    S.isUndefined(e.withCredentials) || (i.withCredentials = !!e.withCredentials),
                    e.responseType)
                )
                    try {
                        i.responseType = e.responseType;
                    } catch (f) {
                        if (e.responseType !== "json") throw f;
                    }
                typeof e.onDownloadProgress == "function" && i.addEventListener("progress", e.onDownloadProgress),
                    typeof e.onUploadProgress == "function" && i.upload && i.upload.addEventListener("progress", e.onUploadProgress),
                    e.cancelToken &&
                        e.cancelToken.promise.then(function (o) {
                            !i || (i.abort(), n(o), (i = null));
                        }),
                    a || (a = null),
                    i.send(a);
            });
        };
    });
    var $ = c((Tr, De) => {
        "use strict";
        var d = h(),
            Pe = me(),
            $t = { "Content-Type": "application/x-www-form-urlencoded" };
        function ze(t, e) {
            !d.isUndefined(t) && d.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e);
        }
        function Xt() {
            var t;
            return typeof XMLHttpRequest != "undefined" ? (t = K()) : typeof process != "undefined" && Object.prototype.toString.call(process) === "[object process]" && (t = K()), t;
        }
        var A = {
            adapter: Xt(),
            transformRequest: [
                function (e, r) {
                    return (
                        Pe(r, "Accept"),
                        Pe(r, "Content-Type"),
                        d.isFormData(e) || d.isArrayBuffer(e) || d.isBuffer(e) || d.isStream(e) || d.isFile(e) || d.isBlob(e)
                            ? e
                            : d.isArrayBufferView(e)
                            ? e.buffer
                            : d.isURLSearchParams(e)
                            ? (ze(r, "application/x-www-form-urlencoded;charset=utf-8"), e.toString())
                            : d.isObject(e)
                            ? (ze(r, "application/json;charset=utf-8"), JSON.stringify(e))
                            : e
                    );
                },
            ],
            transformResponse: [
                function (e) {
                    if (typeof e == "string")
                        try {
                            e = JSON.parse(e);
                        } catch (r) {}
                    return e;
                },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function (e) {
                return e >= 200 && e < 300;
            },
        };
        A.headers = { common: { Accept: "application/json, text/plain, */*" } };
        d.forEach(["delete", "get", "head"], function (e) {
            A.headers[e] = {};
        });
        d.forEach(["post", "put", "patch"], function (e) {
            A.headers[e] = d.merge($t);
        });
        De.exports = A;
    });
    var Me = c((Rr, je) => {
        "use strict";
        var Fe = h(),
            X = pe(),
            Vt = I(),
            Jt = $();
        function V(t) {
            t.cancelToken && t.cancelToken.throwIfRequested();
        }
        je.exports = function (e) {
            V(e),
                (e.headers = e.headers || {}),
                (e.data = X(e.data, e.headers, e.transformRequest)),
                (e.headers = Fe.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
                Fe.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (n) {
                    delete e.headers[n];
                });
            var r = e.adapter || Jt.adapter;
            return r(e).then(
                function (n) {
                    return V(e), (n.data = X(n.data, n.headers, e.transformResponse)), n;
                },
                function (n) {
                    return Vt(n) || (V(e), n && n.response && (n.response.data = X(n.response.data, n.response.headers, e.transformResponse))), Promise.reject(n);
                }
            );
        };
    });
    var J = c((Sr, Ie) => {
        "use strict";
        var p = h();
        Ie.exports = function (e, r) {
            r = r || {};
            var s = {},
                n = ["url", "method", "data"],
                a = ["headers", "auth", "proxy", "params"],
                u = [
                    "baseURL",
                    "transformRequest",
                    "transformResponse",
                    "paramsSerializer",
                    "timeout",
                    "timeoutMessage",
                    "withCredentials",
                    "adapter",
                    "responseType",
                    "xsrfCookieName",
                    "xsrfHeaderName",
                    "onUploadProgress",
                    "onDownloadProgress",
                    "decompress",
                    "maxContentLength",
                    "maxBodyLength",
                    "maxRedirects",
                    "transport",
                    "httpAgent",
                    "httpsAgent",
                    "cancelToken",
                    "socketPath",
                    "responseEncoding",
                ],
                i = ["validateStatus"];
            function l(f, o) {
                return p.isPlainObject(f) && p.isPlainObject(o) ? p.merge(f, o) : p.isPlainObject(o) ? p.merge({}, o) : p.isArray(o) ? o.slice() : o;
            }
            function b(f) {
                p.isUndefined(r[f]) ? p.isUndefined(e[f]) || (s[f] = l(void 0, e[f])) : (s[f] = l(e[f], r[f]));
            }
            p.forEach(n, function (o) {
                p.isUndefined(r[o]) || (s[o] = l(void 0, r[o]));
            }),
                p.forEach(a, b),
                p.forEach(u, function (o) {
                    p.isUndefined(r[o]) ? p.isUndefined(e[o]) || (s[o] = l(void 0, e[o])) : (s[o] = l(void 0, r[o]));
                }),
                p.forEach(i, function (o) {
                    o in r ? (s[o] = l(e[o], r[o])) : o in e && (s[o] = l(void 0, e[o]));
                });
            var v = n.concat(a).concat(u).concat(i),
                m = Object.keys(e)
                    .concat(Object.keys(r))
                    .filter(function (o) {
                        return v.indexOf(o) === -1;
                    });
            return p.forEach(m, b), s;
        };
    });
    var Ke = c((Ar, We) => {
        "use strict";
        var He = h(),
            Qt = M(),
            _e = ce(),
            Gt = Me(),
            k = J();
        function q(t) {
            (this.defaults = t), (this.interceptors = { request: new _e(), response: new _e() });
        }
        q.prototype.request = function (e) {
            typeof e == "string" ? ((e = arguments[1] || {}), (e.url = arguments[0])) : (e = e || {}),
                (e = k(this.defaults, e)),
                e.method ? (e.method = e.method.toLowerCase()) : this.defaults.method ? (e.method = this.defaults.method.toLowerCase()) : (e.method = "get");
            var r = [Gt, void 0],
                s = Promise.resolve(e);
            for (
                this.interceptors.request.forEach(function (a) {
                    r.unshift(a.fulfilled, a.rejected);
                }),
                    this.interceptors.response.forEach(function (a) {
                        r.push(a.fulfilled, a.rejected);
                    });
                r.length;

            )
                s = s.then(r.shift(), r.shift());
            return s;
        };
        q.prototype.getUri = function (e) {
            return (e = k(this.defaults, e)), Qt(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
        };
        He.forEach(["delete", "get", "head", "options"], function (e) {
            q.prototype[e] = function (r, s) {
                return this.request(k(s || {}, { method: e, url: r, data: (s || {}).data }));
            };
        });
        He.forEach(["post", "put", "patch"], function (e) {
            q.prototype[e] = function (r, s, n) {
                return this.request(k(n || {}, { method: e, url: r, data: s }));
            };
        });
        We.exports = q;
    });
    var G = c((kr, $e) => {
        "use strict";
        function Q(t) {
            this.message = t;
        }
        Q.prototype.toString = function () {
            return "Cancel" + (this.message ? ": " + this.message : "");
        };
        Q.prototype.__CANCEL__ = !0;
        $e.exports = Q;
    });
    var Ve = c((Or, Xe) => {
        "use strict";
        var Yt = G();
        function O(t) {
            if (typeof t != "function") throw new TypeError("executor must be a function.");
            var e;
            this.promise = new Promise(function (n) {
                e = n;
            });
            var r = this;
            t(function (n) {
                r.reason || ((r.reason = new Yt(n)), e(r.reason));
            });
        }
        O.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason;
        };
        O.source = function () {
            var e,
                r = new O(function (n) {
                    e = n;
                });
            return { token: r, cancel: e };
        };
        Xe.exports = O;
    });
    var Qe = c((Lr, Je) => {
        "use strict";
        Je.exports = function (e) {
            return function (s) {
                return e.apply(null, s);
            };
        };
    });
    var Ye = c((Ur, Ge) => {
        "use strict";
        Ge.exports = function (e) {
            return typeof e == "object" && e.isAxiosError === !0;
        };
    });
    var tt = c((Nr, Y) => {
        "use strict";
        var Ze = h(),
            Zt = P(),
            L = Ke(),
            er = J(),
            tr = $();
        function et(t) {
            var e = new L(t),
                r = Zt(L.prototype.request, e);
            return Ze.extend(r, L.prototype, e), Ze.extend(r, e), r;
        }
        var y = et(tr);
        y.Axios = L;
        y.create = function (e) {
            return et(er(y.defaults, e));
        };
        y.Cancel = G();
        y.CancelToken = Ve();
        y.isCancel = I();
        y.all = function (e) {
            return Promise.all(e);
        };
        y.spread = Qe();
        y.isAxiosError = Ye();
        Y.exports = y;
        Y.exports.default = y;
    });
    var Z = c((Br, rt) => {
        rt.exports = tt();
    });
    var ee = re(Z());
    var x = {
            tall: {
                width: 0.75,
                height: 1,
                style: {
                    standard: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-tall.png",
                    minimal: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-tall-minimal.png",
                    transparent: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-tall-transparent.png",
                },
            },
            wide: {
                width: 4,
                height: 1,
                style: {
                    standard: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-wide.png",
                    minimal: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-wide-minimal.png",
                    transparent: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-wide-transparent.png",
                },
            },
            square: {
                width: 1,
                height: 1,
                style: {
                    standard: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-square.png",
                    minimal: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-square-minimal.png",
                    transparent: "https://ipfs.io/ipns/lib.zesty.market/assets/zesty-banner-square-transparent.png",
                },
            },
        },
        U = "square",
        st = "standard";
    var nt = re(Z()),
        N = (t) => {
            if (t.substring(0, 4) === "ipfs") return `https://ipfs.zesty.market/ipfs/${t.substring(7)}`;
            if (t.substring(0, 4) === "http") return t;
            if (t.substring(0, 5) === "https") return t;
            if (t.substring(0, 2) === "ar")
                nt.default
                    .get(`https://arweave.net/${t.substring(5)}`)
                    .then((e) => e.url)
                    .catch((e) => {
                        console.error(e);
                    });
            else return `https://ipfs.zesty.market/ipfs/${t}`;
        },
        rr = () => window.XRHand != null && window.XRMediaBinding != null,
        it = (t) => {
            !t ||
                (rr() &&
                    t.includes("https://www.oculus.com/experiences/quest/") &&
                    !window.confirm(`This link leads to an app in the Oculus Store.
 Proceed?`)) ||
                window.open(t, "_blank");
        };
    var sr = "https://node-1.zesty.market",
        jr = sr + "/api/v1/metrics",
        nr = {
            matic: "https://api.thegraph.com/subgraphs/name/zestymarket/zesty-market-graph-matic",
            polygon: "https://api.thegraph.com/subgraphs/name/zestymarket/zesty-market-graph-matic",
            rinkeby: "https://api.thegraph.com/subgraphs/name/zestymarket/zesty-market-graph-rinkeby",
        },
        te = { uri: void 0 },
        ir = {
            name: "Default banner",
            description: "This is the default banner that would be displayed ipsum",
            image: "https://ipfs.zesty.market/ipfs/QmWBNfP8roDrwz3XQo4qpu9fMxvUSTn8LB7d4JK7ybrfZ2/assets/zesty-ad-square.png",
            url: "https://www.zesty.market",
        },
        at = async (t, e, r = "polygon") => {
            let s = Math.floor(Date.now() / 1e3);
            return ee.default
                .post(nr[r], {
                    query: `
      query {
        tokenDatas (
          where: {
            id: "${t}"
            creator: "${e}"
          }
        )
        { 
          sellerNFTSetting {
            sellerAuctions (
              first: 5
              where: {
                contractTimeStart_lte: ${s}
                contractTimeEnd_gte: ${s}
                cancelled: false
              }
            ) {
              id
              buyerCampaigns {
                id
                uri
              }
              buyerCampaignsApproved
            }
          }
          id
        }
      }
    `,
                })
                .then((n) => ar(n))
                .catch((n) => (console.log(n), te));
        },
        ar = (t) => {
            if (t.status != 200) return te;
            let r = t.data.data.tokenDatas[0]?.sellerNFTSetting?.sellerAuctions?.find((s, n) => {
                if (s.buyerCampaigns.length > 0 && s.buyerCampaignsApproved[n]) return s;
            })?.buyerCampaigns[0];
            return r ?? te;
        },
        ot = async (t, e, r) => {
            if (!t) {
                let s = { uri: "DEFAULT_URI", data: ir },
                    n = e || U,
                    a = r || st;
                return (s.data.image = x[n].style[a]), s;
            }
            return ee.default.get(N(t)).then((s) => (s.status == 200 ? { uri: t, data: s.data } : null));
        };
    WL.registerComponent(
        "zesty-banner",
        {
            creator: { type: WL.Type.String },
            space: { type: WL.Type.Int },
            network: { type: WL.Type.Enum, values: ["rinkeby", "polygon"], default: "polygon" },
            format: { type: WL.Type.Enum, values: Object.keys(x), default: U },
            style: { type: WL.Type.Enum, values: ["standard", "minimal", "transparent"], default: "transparent" },
            scaleToRatio: { type: WL.Type.Bool, default: !0 },
            textureProperty: { type: WL.Type.String, default: "auto" },
        },
        {
            init: function () {
                (this.formats = Object.values(x)), (this.formatKeys = Object.keys(x)), (this.styleKeys = ["standard", "minimal", "transparent"]);
            },
            start: function () {
                if (((this.mesh = this.object.getComponent("mesh")), !this.mesh)) throw new Error("'zesty-banner ' missing mesh component");
                (this.collision = this.object.getComponent("collision") || this.object.addComponent("collision", { collider: WL.Collider.Box, group: 2 })),
                    (this.cursorTarget = this.object.getComponent("cursor-target") || this.object.addComponent("cursor-target")),
                    this.cursorTarget.addClickFunction(this.onClick.bind(this)),
                    this.loadBanner(this.space, this.creator, this.network, this.formatKeys[this.format], this.styleKeys[this.style]).then((t) => {
                        (this.banner = t),
                            this.scaleToRatio &&
                                ((this.height = this.object.scalingLocal[1]),
                                this.object.resetScaling(),
                                (this.collision.extents = [this.formats[this.format].width * this.height, this.height, 0.1]),
                                this.object.scale([this.formats[this.format].width * this.height, this.height, 1]));
                        let e = this.mesh.material;
                        if (this.textureProperty === "auto") {
                            let r = e.pipeline || e.shader;
                            if (r === "Phong Opaque Textured") (e.diffuseTexture = t.texture), (e.alphaMaskThreshold = 0.3);
                            else if (r === "Flat Opaque Textured") (e.flatTexture = t.texture), (e.alphaMaskThreshold = 0.8);
                            else throw Error("'zesty-banner ' unable to apply banner texture: unsupported pipeline " + e.shader);
                        } else this.mesh.material[this.textureProperty] = t.texture;
                    });
            },
            onClick: function () {
                this.banner.url && (WL.xrSession ? WL.xrSession.end().then(this.executeClick.bind(this)) : this.executeClick());
            },
            executeClick: function () {
                it(this.banner.url);
            },
            loadBanner: async function (t, e, r, s, n) {
                r = r ? "polygon" : "rinkeby";
                let a = await at(t, e, r),
                    u = await ot(a.uri, s, n),
                    i = u.data.url;
                (i = i.match(/^http[s]?:\/\//) ? i : "https://" + i), i === "https://www.zesty.market" && (i = `https://app.zesty.market/space/${t}`);
                let l = u.data.image;
                return (l = l.match(/^.+\.(png|jpe?g)/i) ? l : N(l)), WL.textures.load(l, "").then((b) => ((u.texture = b), (u.imageSrc = l), (u.url = i), u));
            },
        }
    );
})();
//# sourceMappingURL=zesty-wonderland-sdk.js.map
