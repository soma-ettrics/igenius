/*!
 * MorphSVGPlugin 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2023, GreenSock. All rights reserved.
 * This plugin is a membership benefit of Club GreenSock and is only authorized for use in sites/apps/products developed by individuals/companies with an active Club GreenSock membership. See https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], e)
      : e(((t = t || self).window = t.window || {}));
  })(this, function (t) {
    "use strict";
    function m(t) {
      return "string" == typeof t;
    }
    var x = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      N = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      b = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
      n = /(^[#\.][a-z]|[a-y][a-z])/i,
      B = Math.PI / 180,
      D = Math.sin,
      E = Math.cos,
      k = Math.abs,
      J = Math.sqrt,
      s = function _isNumber(t) {
        return "number" == typeof t;
      },
      h = function _round(t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      };
    function reverseSegment(t) {
      var e,
        r = 0;
      for (t.reverse(); r < t.length; r += 2)
        (e = t[r]), (t[r] = t[r + 1]), (t[r + 1] = e);
      t.reversed = !t.reversed;
    }
    var A = {
      rect: "rx,ry,x,y,width,height",
      circle: "r,cx,cy",
      ellipse: "rx,ry,cx,cy",
      line: "x1,x2,y1,y2"
    };
    function convertToPath(t, e) {
      var r,
        n,
        a,
        o,
        i,
        s,
        h,
        l,
        g,
        c,
        p,
        u,
        f,
        d,
        _,
        P,
        m,
        v,
        y,
        w,
        M,
        x,
        T = t.tagName.toLowerCase(),
        b = 0.552284749831;
      return "path" !== T && t.getBBox
        ? ((s = (function _createPath(t, e) {
            var r,
              n = document.createElementNS("http://www.w3.org/2000/svg", "path"),
              a = [].slice.call(t.attributes),
              o = a.length;
            for (e = "," + e + ","; -1 < --o; )
              (r = a[o].nodeName.toLowerCase()),
                e.indexOf("," + r + ",") < 0 &&
                  n.setAttributeNS(null, r, a[o].nodeValue);
            return n;
          })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
          (x = (function _attrToObj(t, e) {
            for (var r = e ? e.split(",") : [], n = {}, a = r.length; -1 < --a; )
              n[r[a]] = +t.getAttribute(r[a]) || 0;
            return n;
          })(t, A[T])),
          "rect" === T
            ? ((o = x.rx),
              (i = x.ry || o),
              (n = x.x),
              (a = x.y),
              (c = x.width - 2 * o),
              (p = x.height - 2 * i),
              (r =
                o || i
                  ? "M" +
                    (P = (d = (f = n + o) + c) + o) +
                    "," +
                    (v = a + i) +
                    " V" +
                    (y = v + p) +
                    " C" +
                    [
                      P,
                      (w = y + i * b),
                      (_ = d + o * b),
                      (M = y + i),
                      d,
                      M,
                      d - (d - f) / 3,
                      M,
                      f + (d - f) / 3,
                      M,
                      f,
                      M,
                      (u = n + o * (1 - b)),
                      M,
                      n,
                      w,
                      n,
                      y,
                      n,
                      y - (y - v) / 3,
                      n,
                      v + (y - v) / 3,
                      n,
                      v,
                      n,
                      (m = a + i * (1 - b)),
                      u,
                      a,
                      f,
                      a,
                      f + (d - f) / 3,
                      a,
                      d - (d - f) / 3,
                      a,
                      d,
                      a,
                      _,
                      a,
                      P,
                      m,
                      P,
                      v
                    ].join(",") +
                    "z"
                  : "M" +
                    (n + c) +
                    "," +
                    a +
                    " v" +
                    p +
                    " h" +
                    -c +
                    " v" +
                    -p +
                    " h" +
                    c +
                    "z"))
            : "circle" === T || "ellipse" === T
            ? ((l =
                "circle" === T
                  ? (o = i = x.r) * b
                  : ((o = x.rx), (i = x.ry) * b)),
              (r =
                "M" +
                ((n = x.cx) + o) +
                "," +
                (a = x.cy) +
                " C" +
                [
                  n + o,
                  a + l,
                  n + (h = o * b),
                  a + i,
                  n,
                  a + i,
                  n - h,
                  a + i,
                  n - o,
                  a + l,
                  n - o,
                  a,
                  n - o,
                  a - l,
                  n - h,
                  a - i,
                  n,
                  a - i,
                  n + h,
                  a - i,
                  n + o,
                  a - l,
                  n + o,
                  a
                ].join(",") +
                "z"))
            : "line" === T
            ? (r = "M" + x.x1 + "," + x.y1 + " L" + x.x2 + "," + x.y2)
            : ("polyline" !== T && "polygon" !== T) ||
              ((r =
                "M" +
                (n = (g =
                  (t.getAttribute("points") + "").match(N) || []).shift()) +
                "," +
                (a = g.shift()) +
                " L" +
                g.join(",")),
              "polygon" === T && (r += "," + n + "," + a + "z")),
          s.setAttribute(
            "d",
            rawPathToString((s._gsRawPath = stringToRawPath(r)))
          ),
          e &&
            t.parentNode &&
            (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)),
          s)
        : t;
    }
    function arcToSegment(t, e, r, n, a, o, i, s, h) {
      if (t !== s || e !== h) {
        (r = k(r)), (n = k(n));
        var l = (a % 360) * B,
          g = E(l),
          c = D(l),
          p = Math.PI,
          u = 2 * p,
          f = (t - s) / 2,
          d = (e - h) / 2,
          _ = g * f + c * d,
          P = -c * f + g * d,
          m = _ * _,
          v = P * P,
          y = m / (r * r) + v / (n * n);
        1 < y && ((r = J(y) * r), (n = J(y) * n));
        var w = r * r,
          M = n * n,
          x = (w * M - w * v - M * m) / (w * v + M * m);
        x < 0 && (x = 0);
        var T = (o === i ? -1 : 1) * J(x),
          b = ((r * P) / n) * T,
          S = ((-n * _) / r) * T,
          N = g * b - c * S + (t + s) / 2,
          z = c * b + g * S + (e + h) / 2,
          A = (_ - b) / r,
          R = (P - S) / n,
          O = (-_ - b) / r,
          j = (-P - S) / n,
          Y = A * A + R * R,
          C = (R < 0 ? -1 : 1) * Math.acos(A / J(Y)),
          I =
            (A * j - R * O < 0 ? -1 : 1) *
            Math.acos((A * O + R * j) / J(Y * (O * O + j * j)));
        isNaN(I) && (I = p),
          !i && 0 < I ? (I -= u) : i && I < 0 && (I += u),
          (C %= u),
          (I %= u);
        var V,
          F = Math.ceil(k(I) / (u / 4)),
          L = [],
          X = I / F,
          U = ((4 / 3) * D(X / 2)) / (1 + E(X / 2)),
          G = g * r,
          Q = c * r,
          q = c * -n,
          H = g * n;
        for (V = 0; V < F; V++)
          (_ = E((a = C + V * X))),
            (P = D(a)),
            (A = E((a += X))),
            (R = D(a)),
            L.push(_ - U * P, P + U * _, A + U * R, R - U * A, A, R);
        for (V = 0; V < L.length; V += 2)
          (_ = L[V]),
            (P = L[V + 1]),
            (L[V] = _ * G + P * q + N),
            (L[V + 1] = _ * Q + P * H + z);
        return (L[V - 2] = s), (L[V - 1] = h), L;
      }
    }
    function stringToRawPath(t) {
      function uc(t, e, r, n) {
        (g = (r - t) / 3),
          (c = (n - e) / 3),
          s.push(t + g, e + c, r - g, n - c, r, n);
      }
      var e,
        r,
        n,
        a,
        o,
        i,
        s,
        h,
        l,
        g,
        c,
        p,
        u,
        f,
        d,
        _ =
          (t + "")
            .replace(b, function (t) {
              var e = +t;
              return e < 1e-4 && -1e-4 < e ? 0 : e;
            })
            .match(x) || [],
        P = [],
        m = 0,
        v = 0,
        y = _.length,
        w = 0,
        M = "ERROR: malformed path: " + t;
      if (!t || !isNaN(_[0]) || isNaN(_[1])) return console.log(M), P;
      for (e = 0; e < y; e++)
        if (
          ((u = o),
          isNaN(_[e]) ? (i = (o = _[e].toUpperCase()) !== _[e]) : e--,
          (n = +_[e + 1]),
          (a = +_[e + 2]),
          i && ((n += m), (a += v)),
          e || ((h = n), (l = a)),
          "M" === o)
        )
          s && (s.length < 8 ? --P.length : (w += s.length)),
            (m = h = n),
            (v = l = a),
            (s = [n, a]),
            P.push(s),
            (e += 2),
            (o = "L");
        else if ("C" === o)
          i || (m = v = 0),
            (s = s || [0, 0]).push(
              n,
              a,
              m + 1 * _[e + 3],
              v + 1 * _[e + 4],
              (m += 1 * _[e + 5]),
              (v += 1 * _[e + 6])
            ),
            (e += 6);
        else if ("S" === o)
          (g = m),
            (c = v),
            ("C" !== u && "S" !== u) ||
              ((g += m - s[s.length - 4]), (c += v - s[s.length - 3])),
            i || (m = v = 0),
            s.push(g, c, n, a, (m += 1 * _[e + 3]), (v += 1 * _[e + 4])),
            (e += 4);
        else if ("Q" === o)
          (g = m + (2 / 3) * (n - m)),
            (c = v + (2 / 3) * (a - v)),
            i || (m = v = 0),
            (m += 1 * _[e + 3]),
            (v += 1 * _[e + 4]),
            s.push(g, c, m + (2 / 3) * (n - m), v + (2 / 3) * (a - v), m, v),
            (e += 4);
        else if ("T" === o)
          (g = m - s[s.length - 4]),
            (c = v - s[s.length - 3]),
            s.push(
              m + g,
              v + c,
              n + (2 / 3) * (m + 1.5 * g - n),
              a + (2 / 3) * (v + 1.5 * c - a),
              (m = n),
              (v = a)
            ),
            (e += 2);
        else if ("H" === o) uc(m, v, (m = n), v), (e += 1);
        else if ("V" === o) uc(m, v, m, (v = n + (i ? v - m : 0))), (e += 1);
        else if ("L" === o || "Z" === o)
          "Z" === o && ((n = h), (a = l), (s.closed = !0)),
            ("L" === o || 0.5 < k(m - n) || 0.5 < k(v - a)) &&
              (uc(m, v, n, a), "L" === o && (e += 2)),
            (m = n),
            (v = a);
        else if ("A" === o) {
          if (
            ((f = _[e + 4]),
            (d = _[e + 5]),
            (g = _[e + 6]),
            (c = _[e + 7]),
            (r = 7),
            1 < f.length &&
              (f.length < 3
                ? ((c = g), (g = d), r--)
                : ((c = d), (g = f.substr(2)), (r -= 2)),
              (d = f.charAt(1)),
              (f = f.charAt(0))),
            (p = arcToSegment(
              m,
              v,
              +_[e + 1],
              +_[e + 2],
              +_[e + 3],
              +f,
              +d,
              (i ? m : 0) + 1 * g,
              (i ? v : 0) + 1 * c
            )),
            (e += r),
            p)
          )
            for (r = 0; r < p.length; r++) s.push(p[r]);
          (m = s[s.length - 2]), (v = s[s.length - 1]);
        } else console.log(M);
      return (
        (e = s.length) < 6
          ? (P.pop(), (e = 0))
          : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
        (P.totalPoints = w + e),
        P
      );
    }
    function rawPathToString(t) {
      s(t[0]) && (t = [t]);
      var e,
        r,
        n,
        a,
        o = "",
        i = t.length;
      for (r = 0; r < i; r++) {
        for (
          a = t[r],
            o += "M" + h(a[0]) + "," + h(a[1]) + " C",
            e = a.length,
            n = 2;
          n < e;
          n++
        )
          o +=
            h(a[n++]) +
            "," +
            h(a[n++]) +
            " " +
            h(a[n++]) +
            "," +
            h(a[n++]) +
            " " +
            h(a[n++]) +
            "," +
            h(a[n]) +
            " ";
        a.closed && (o += "z");
      }
      return o;
    }
    function y() {
      return (
        r ||
        ("undefined" != typeof window &&
          (r = window.gsap) &&
          r.registerPlugin &&
          r)
      );
    }
    function z(t) {
      return "function" == typeof t;
    }
    function M(t) {
      return console && console.warn(t);
    }
    function O(t) {
      var e,
        r = t.length,
        n = 0,
        a = 0;
      for (e = 0; e < r; e++) (n += t[e++]), (a += t[e]);
      return [n / (r / 2), a / (r / 2)];
    }
    function P(t) {
      var e,
        r,
        n,
        a = t.length,
        o = t[0],
        i = o,
        s = t[1],
        h = s;
      for (n = 6; n < a; n += 6)
        o < (e = t[n]) ? (o = e) : e < i && (i = e),
          s < (r = t[n + 1]) ? (s = r) : r < h && (h = r);
      return (
        (t.centerX = (o + i) / 2),
        (t.centerY = (s + h) / 2),
        (t.size = (o - i) * (s - h))
      );
    }
    function Q(t, e) {
      void 0 === e && (e = 3);
      for (
        var r,
          n,
          a,
          o,
          i,
          s,
          h,
          l,
          g,
          c,
          p,
          u,
          f,
          d,
          _,
          P,
          m = t.length,
          v = t[0][0],
          y = v,
          w = t[0][1],
          M = w,
          x = 1 / e;
        -1 < --m;
  
      )
        for (r = (i = t[m]).length, o = 6; o < r; o += 6)
          for (
            g = i[o],
              c = i[o + 1],
              p = i[o + 2] - g,
              d = i[o + 3] - c,
              u = i[o + 4] - g,
              _ = i[o + 5] - c,
              f = i[o + 6] - g,
              P = i[o + 7] - c,
              s = e;
            -1 < --s;
  
          )
            v <
            (n =
              ((h = x * s) * h * f + 3 * (l = 1 - h) * (h * u + l * p)) * h + g)
              ? (v = n)
              : n < y && (y = n),
              w < (a = (h * h * P + 3 * l * (h * _ + l * d)) * h + c)
                ? (w = a)
                : a < M && (M = a);
      return (
        (t.centerX = (v + y) / 2),
        (t.centerY = (w + M) / 2),
        (t.left = y),
        (t.width = v - y),
        (t.top = M),
        (t.height = w - M),
        (t.size = (v - y) * (w - M))
      );
    }
    function R(t, e) {
      return e.length - t.length;
    }
    function S(t, e) {
      var r = t.size || P(t),
        n = e.size || P(e);
      return Math.abs(n - r) < (r + n) / 20
        ? e.centerX - t.centerX || e.centerY - t.centerY
        : n - r;
    }
    function T(t, e) {
      var r,
        n,
        a = t.slice(0),
        o = t.length,
        i = o - 2;
      for (e |= 0, r = 0; r < o; r++)
        (n = (r + e) % i), (t[r++] = a[n]), (t[r] = a[1 + n]);
    }
    function U(t, e, r, n, a) {
      var o,
        i,
        s,
        h,
        l = t.length,
        g = 0,
        c = l - 2;
      for (r *= 6, i = 0; i < l; i += 6)
        (h = t[(o = (i + r) % c)] - (e[i] - n)),
          (s = t[1 + o] - (e[i + 1] - a)),
          (g += _(s * s + h * h));
      return g;
    }
    function V(t, e, r) {
      var n,
        a,
        o,
        i = t.length,
        s = O(t),
        h = O(e),
        l = h[0] - s[0],
        g = h[1] - s[1],
        c = U(t, e, 0, l, g),
        p = 0;
      for (o = 6; o < i; o += 6)
        (a = U(t, e, o / 6, l, g)) < c && ((c = a), (p = o));
      if (r)
        for (reverseSegment((n = t.slice(0))), o = 6; o < i; o += 6)
          (a = U(n, e, o / 6, l, g)) < c && ((c = a), (p = -o));
      return p / 6;
    }
    function W(t, e, r) {
      for (var n, a, o, i, s, h, l = t.length, g = 1e20, c = 0, p = 0; -1 < --l; )
        for (h = (n = t[l]).length, s = 0; s < h; s += 6)
          (a = n[s] - e),
            (o = n[s + 1] - r),
            (i = _(a * a + o * o)) < g && ((g = i), (c = n[s]), (p = n[s + 1]));
      return [c, p];
    }
    function X(t, e, r, n, a, o) {
      var i,
        s,
        h,
        l,
        g = e.length,
        c = 0,
        p = Math.min(t.size || P(t), e[r].size || P(e[r])) * n,
        u = 1e20,
        f = t.centerX + a,
        d = t.centerY + o;
      for (i = r; i < g && !((e[i].size || P(e[i])) < p); i++)
        (s = e[i].centerX - f),
          (h = e[i].centerY - d),
          (l = _(s * s + h * h)) < u && ((c = i), (u = l));
      return (l = e[c]), e.splice(c, 1), l;
    }
    function Y(t, e) {
      var r,
        n,
        a,
        o,
        i,
        s,
        h,
        l,
        g,
        c,
        p,
        u,
        f,
        d,
        _ = 0,
        P = t.length,
        m = e / ((P - 2) / 6);
      for (f = 2; f < P; f += 6)
        for (_ += m; 0.999999 < _; )
          (r = t[f - 2]),
            (n = t[f - 1]),
            (a = t[f]),
            (o = t[f + 1]),
            (i = t[f + 2]),
            (s = t[f + 3]),
            (h = t[f + 4]),
            (l = t[f + 5]),
            (g = r + (a - r) * (d = 1 / ((Math.floor(_) || 1) + 1))),
            (g += ((p = a + (i - a) * d) - g) * d),
            (p += (i + (h - i) * d - p) * d),
            (c = n + (o - n) * d),
            (c += ((u = o + (s - o) * d) - c) * d),
            (u += (s + (l - s) * d - u) * d),
            t.splice(
              f,
              4,
              r + (a - r) * d,
              n + (o - n) * d,
              g,
              c,
              g + (p - g) * d,
              c + (u - c) * d,
              p,
              u,
              i + (h - i) * d,
              s + (l - s) * d
            ),
            (f += 6),
            (P += 6),
            _--;
      return t;
    }
    function Z(t, e, r, n, a) {
      var o,
        i,
        s,
        h,
        l,
        g,
        c,
        p = e.length - t.length,
        u = 0 < p ? e : t,
        f = 0 < p ? t : e,
        d = 0,
        _ = "complexity" === n ? R : S,
        m = "position" === n ? 0 : "number" == typeof n ? n : 0.8,
        v = f.length,
        y = "object" == typeof r && r.push ? r.slice(0) : [r],
        w = "reverse" === y[0] || y[0] < 0,
        x = "log" === r;
      if (f[0]) {
        if (
          1 < u.length &&
          (t.sort(_),
          e.sort(_),
          u.size || Q(u),
          f.size || Q(f),
          (g = u.centerX - f.centerX),
          (c = u.centerY - f.centerY),
          _ === S)
        )
          for (v = 0; v < f.length; v++) u.splice(v, 0, X(f[v], u, v, m, g, c));
        if (p)
          for (
            p < 0 && (p = -p),
              u[0].length > f[0].length &&
                Y(f[0], ((u[0].length - f[0].length) / 6) | 0),
              v = f.length;
            d < p;
  
          )
            u[v].size || P(u[v]),
              (h = (s = W(f, u[v].centerX, u[v].centerY))[0]),
              (l = s[1]),
              (f[v++] = [h, l, h, l, h, l, h, l]),
              (f.totalPoints += 8),
              d++;
        for (v = 0; v < t.length; v++)
          (o = e[v]),
            (i = t[v]),
            (p = o.length - i.length) < 0
              ? Y(o, (-p / 6) | 0)
              : 0 < p && Y(i, (p / 6) | 0),
            w && !1 !== a && !i.reversed && reverseSegment(i),
            (r = y[v] || 0 === y[v] ? y[v] : "auto") &&
              (i.closed ||
              (Math.abs(i[0] - i[i.length - 2]) < 0.5 &&
                Math.abs(i[1] - i[i.length - 1]) < 0.5)
                ? "auto" === r || "log" === r
                  ? ((y[v] = r = V(i, o, !v || !1 === a)),
                    r < 0 && ((w = !0), reverseSegment(i), (r = -r)),
                    T(i, 6 * r))
                  : "reverse" !== r &&
                    (v && r < 0 && reverseSegment(i), T(i, 6 * (r < 0 ? -r : r)))
                : !w &&
                  (("auto" === r &&
                    Math.abs(o[0] - i[0]) +
                      Math.abs(o[1] - i[1]) +
                      Math.abs(o[o.length - 2] - i[i.length - 2]) +
                      Math.abs(o[o.length - 1] - i[i.length - 1]) >
                      Math.abs(o[0] - i[i.length - 2]) +
                        Math.abs(o[1] - i[i.length - 1]) +
                        Math.abs(o[o.length - 2] - i[0]) +
                        Math.abs(o[o.length - 1] - i[1])) ||
                    r % 2)
                ? (reverseSegment(i), (y[v] = -1), (w = !0))
                : "auto" === r
                ? (y[v] = 0)
                : "reverse" === r && (y[v] = -1),
              i.closed !== o.closed && (i.closed = o.closed = !1));
        return x && M("shapeIndex:[" + y.join(",") + "]"), (t.shapeIndex = y);
      }
    }
    function $(t, e, r, n, a) {
      var o = stringToRawPath(t[0]),
        i = stringToRawPath(t[1]);
      Z(o, i, e || 0 === e ? e : "auto", r, a) &&
        ((t[0] = rawPathToString(o)),
        (t[1] = rawPathToString(i)),
        ("log" !== n && !0 !== n) ||
          M('precompile:["' + t[0] + '","' + t[1] + '"]'));
    }
    function aa(t, e) {
      var r,
        n,
        a,
        o,
        i,
        s,
        h,
        l = 0,
        g = parseFloat(t[0]),
        c = parseFloat(t[1]),
        p = g + "," + c + " ";
      for (r = (0.5 * e) / (0.5 * (a = t.length) - 1), n = 0; n < a - 2; n += 2) {
        if (
          ((l += r),
          (s = parseFloat(t[n + 2])),
          (h = parseFloat(t[n + 3])),
          0.999999 < l)
        )
          for (i = 1 / (Math.floor(l) + 1), o = 1; 0.999999 < l; )
            (p +=
              (g + (s - g) * i * o).toFixed(2) +
              "," +
              (c + (h - c) * i * o).toFixed(2) +
              " "),
              l--,
              o++;
        (p += s + "," + h + " "), (g = s), (c = h);
      }
      return p;
    }
    function ba(t) {
      var e = t[0].match(G) || [],
        r = t[1].match(G) || [],
        n = r.length - e.length;
      0 < n ? (t[0] = aa(e, n)) : (t[1] = aa(r, -n));
    }
    function ca(e) {
      return isNaN(e)
        ? ba
        : function (t) {
            ba(t),
              (t[1] = (function _offsetPoints(t, e) {
                if (!e) return t;
                var r,
                  n,
                  a,
                  o = t.match(G) || [],
                  i = o.length,
                  s = "";
                for (
                  r =
                    "reverse" === e
                      ? ((n = i - 1), -2)
                      : ((n = (2 * (parseInt(e, 10) || 0) + 1 + 100 * i) % i), 2),
                    a = 0;
                  a < i;
                  a += 2
                )
                  (s += o[n - 1] + "," + o[n] + " "), (n = (n + r) % i);
                return s;
              })(t[1], parseInt(e, 10)));
          };
    }
    function ea(t, e) {
      for (
        var r, n, a, o, i, s, h, l, g, c, p, u, f = t.length, d = 0.2 * (e || 1);
        -1 < --f;
  
      ) {
        for (
          p = (n = t[f]).isSmooth = n.isSmooth || [0, 0, 0, 0],
            u = n.smoothData = n.smoothData || [0, 0, 0, 0],
            p.length = 4,
            l = n.length - 2,
            h = 6;
          h < l;
          h += 6
        )
          (a = n[h] - n[h - 2]),
            (o = n[h + 1] - n[h - 1]),
            (i = n[h + 2] - n[h]),
            (s = n[h + 3] - n[h + 1]),
            (g = w(o, a)),
            (c = w(s, i)),
            (r = Math.abs(g - c) < d) &&
              ((u[h - 2] = g),
              (u[h + 2] = c),
              (u[h - 1] = _(a * a + o * o)),
              (u[h + 3] = _(i * i + s * s))),
            p.push(r, r, 0, 0, r, r);
        n[l] === n[0] &&
          n[1 + l] === n[1] &&
          ((a = n[0] - n[l - 2]),
          (o = n[1] - n[l - 1]),
          (i = n[2] - n[0]),
          (s = n[3] - n[1]),
          (g = w(o, a)),
          (c = w(s, i)),
          Math.abs(g - c) < d &&
            ((u[l - 2] = g),
            (u[2] = c),
            (u[l - 1] = _(a * a + o * o)),
            (u[3] = _(i * i + s * s)),
            (p[l - 2] = p[l - 1] = !0)));
      }
      return t;
    }
    function fa(t) {
      var e = t.trim().split(" ");
      return {
        x:
          (~t.indexOf("left")
            ? 0
            : ~t.indexOf("right")
            ? 100
            : isNaN(parseFloat(e[0]))
            ? 50
            : parseFloat(e[0])) / 100,
        y:
          (~t.indexOf("top")
            ? 0
            : ~t.indexOf("bottom")
            ? 100
            : isNaN(parseFloat(e[1]))
            ? 50
            : parseFloat(e[1])) / 100
      };
    }
    function ia(t, e, r, n) {
      var a,
        o,
        i = this._origin,
        s = this._eOrigin,
        h = t[r] - i.x,
        l = t[r + 1] - i.y,
        g = _(h * h + l * l),
        c = w(l, h);
      return (
        (h = e[r] - s.x),
        (l = e[r + 1] - s.y),
        (o = (function _shortAngle(t) {
          return t !== t % p ? t + (t < 0 ? u : -u) : t;
        })((a = w(l, h) - c))),
        !n && I && Math.abs(o + I.ca) < f && (n = I),
        (this._anchorPT = I = {
          _next: this._anchorPT,
          t: t,
          sa: c,
          ca: n && o * n.ca < 0 && Math.abs(o) > d ? a : o,
          sl: g,
          cl: _(h * h + l * l) - g,
          i: r
        })
      );
    }
    function ja(t) {
      (r = y()),
        (a = a || (r && r.plugins.morphSVG)),
        r && a
          ? ((C = r.utils.toArray), (a.prototype._tweenRotation = ia), (F = 1))
          : t && M("Please gsap.registerPlugin(MorphSVGPlugin)");
    }
    var r,
      C,
      I,
      F,
      a,
      w = Math.atan2,
      j = Math.cos,
      L = Math.sin,
      _ = Math.sqrt,
      p = Math.PI,
      u = 2 * p,
      f = 0.3 * p,
      d = 0.7 * p,
      G = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
      q = /(^[#\.][a-z]|[a-y][a-z])/i,
      H = /[achlmqstvz]/i,
      K =
        "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
      tt = {
        version: "3.12.2",
        name: "morphSVG",
        rawVars: 1,
        register: function register(t, e) {
          (r = t), (a = e), ja();
        },
        init: function init(t, e, r, n, a) {
          if ((F || ja(1), !e)) return M("invalid shape"), !1;
          var o, i, s, h, l, g, c, p, u, f, d, _, P, m, v, y, w, x, T, b, S, N;
          if (
            (z(e) && (e = e.call(r, n, t, a)),
            "string" == typeof e || e.getBBox || e[0])
          )
            e = { shape: e };
          else if ("object" == typeof e) {
            for (i in ((o = {}), e))
              o[i] = z(e[i]) && "render" !== i ? e[i].call(r, n, t, a) : e[i];
            e = o;
          }
          var A = t.nodeType ? window.getComputedStyle(t) : {},
            R = A.fill + "",
            O = !(
              "none" === R ||
              "0" === (R.match(G) || [])[3] ||
              "evenodd" === A.fillRule
            ),
            j = (e.origin || "50 50").split(",");
          if (
            ((l =
              "POLYLINE" === (o = (t.nodeName + "").toUpperCase()) ||
              "POLYGON" === o),
            "PATH" !== o && !l && !e.prop)
          )
            return M("Cannot morph a <" + o + "> element. " + K), !1;
          if (
            ((i = "PATH" === o ? "d" : "points"), !e.prop && !z(t.setAttribute))
          )
            return !1;
          if (
            ((h = (function _parseShape(t, e, r) {
              var n, a;
              return (
                (!("string" == typeof t) ||
                  q.test(t) ||
                  (t.match(G) || []).length < 3) &&
                  ((n = C(t)[0])
                    ? ((a = (n.nodeName + "").toUpperCase()),
                      e &&
                        "PATH" !== a &&
                        ((n = convertToPath(n, !1)), (a = "PATH")),
                      (t = n.getAttribute("PATH" === a ? "d" : "points") || ""),
                      n === r &&
                        (t = n.getAttributeNS(null, "data-original") || t))
                    : (M("WARNING: invalid morph to: " + t), (t = !1))),
                t
              );
            })(e.shape || e.d || e.points || "", "d" === i, t)),
            l && H.test(h))
          )
            return M("A <" + o + "> cannot accept path data. " + K), !1;
          if (
            ((g = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto"),
            (c = e.map || tt.defaultMap),
            (this._prop = e.prop),
            (this._render = e.render || tt.defaultRender),
            (this._apply =
              "updateTarget" in e ? e.updateTarget : tt.defaultUpdateTarget),
            (this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision)),
            (this._tween = r),
            h)
          ) {
            if (
              ((this._target = t),
              (w = "object" == typeof e.precompile),
              (f = this._prop ? t[this._prop] : t.getAttribute(i)),
              this._prop ||
                t.getAttributeNS(null, "data-original") ||
                t.setAttributeNS(null, "data-original", f),
              "d" === i || this._prop)
            ) {
              if (
                ((f = stringToRawPath(w ? e.precompile[0] : f)),
                (d = stringToRawPath(w ? e.precompile[1] : h)),
                !w && !Z(f, d, g, c, O))
              )
                return !1;
              for (
                ("log" !== e.precompile && !0 !== e.precompile) ||
                  M(
                    'precompile:["' +
                      rawPathToString(f) +
                      '","' +
                      rawPathToString(d) +
                      '"]'
                  ),
                  (S = "linear" !== (e.type || tt.defaultType)) &&
                    ((f = ea(f, e.smoothTolerance)),
                    (d = ea(d, e.smoothTolerance)),
                    f.size || Q(f),
                    d.size || Q(d),
                    (b = fa(j[0])),
                    (this._origin = f.origin = {
                      x: f.left + b.x * f.width,
                      y: f.top + b.y * f.height
                    }),
                    j[1] && (b = fa(j[1])),
                    (this._eOrigin = {
                      x: d.left + b.x * d.width,
                      y: d.top + b.y * d.height
                    })),
                  this._rawPath = t._gsRawPath = f,
                  P = f.length;
                -1 < --P;
  
              )
                for (
                  v = f[P],
                    y = d[P],
                    p = v.isSmooth || [],
                    u = y.isSmooth || [],
                    m = v.length,
                    _ = I = 0;
                  _ < m;
                  _ += 2
                )
                  (y[_] === v[_] && y[_ + 1] === v[_ + 1]) ||
                    (S
                      ? p[_] && u[_]
                        ? ((x = v.smoothData),
                          (T = y.smoothData),
                          (N = _ + (_ === m - 4 ? 7 - m : 5)),
                          (this._controlPT = {
                            _next: this._controlPT,
                            i: _,
                            j: P,
                            l1s: x[_ + 1],
                            l1c: T[_ + 1] - x[_ + 1],
                            l2s: x[N],
                            l2c: T[N] - x[N]
                          }),
                          (s = this._tweenRotation(v, y, _ + 2)),
                          this._tweenRotation(v, y, _, s),
                          this._tweenRotation(v, y, N - 1, s),
                          (_ += 4))
                        : this._tweenRotation(v, y, _)
                      : ((s = this.add(v, _, v[_], y[_], 0, 0, 0, 0, 0, 1)),
                        (s =
                          this.add(
                            v,
                            _ + 1,
                            v[_ + 1],
                            y[_ + 1],
                            0,
                            0,
                            0,
                            0,
                            0,
                            1
                          ) || s)));
            } else
              s = this.add(
                t,
                "setAttribute",
                t.getAttribute(i) + "",
                h + "",
                n,
                a,
                0,
                ca(g),
                i
              );
            S &&
              (this.add(
                this._origin,
                "x",
                this._origin.x,
                this._eOrigin.x,
                0,
                0,
                0,
                0,
                0,
                1
              ),
              (s = this.add(
                this._origin,
                "y",
                this._origin.y,
                this._eOrigin.y,
                0,
                0,
                0,
                0,
                0,
                1
              ))),
              s && (this._props.push("morphSVG"), (s.end = h), (s.endProp = i));
          }
          return 1;
        },
        render: function render(t, e) {
          for (
            var r,
              n,
              a,
              o,
              i,
              s,
              h,
              l,
              g,
              c,
              p,
              u,
              f = e._rawPath,
              d = e._controlPT,
              _ = e._anchorPT,
              P = e._rnd,
              m = e._target,
              v = e._pt;
            v;
  
          )
            v.r(t, v.d), (v = v._next);
          if (1 === t && e._apply)
            for (v = e._pt; v; )
              v.end &&
                (e._prop
                  ? (m[e._prop] = v.end)
                  : m.setAttribute(v.endProp, v.end)),
                (v = v._next);
          else if (f) {
            for (; _; )
              (i = _.sa + t * _.ca),
                (o = _.sl + t * _.cl),
                (_.t[_.i] = e._origin.x + j(i) * o),
                (_.t[_.i + 1] = e._origin.y + L(i) * o),
                (_ = _._next);
            for (n = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1; d; )
              (u =
                (s = d.i) + (s === (a = f[d.j]).length - 4 ? 7 - a.length : 5)),
                (i = w(a[u] - a[s + 1], a[u - 1] - a[s])),
                (c = L(i)),
                (p = j(i)),
                (l = a[s + 2]),
                (g = a[s + 3]),
                (o = d.l1s + n * d.l1c),
                (a[s] = l - p * o),
                (a[s + 1] = g - c * o),
                (o = d.l2s + n * d.l2c),
                (a[u - 1] = l + p * o),
                (a[u] = g + c * o),
                (d = d._next);
            if (((m._gsRawPath = f), e._apply)) {
              for (r = "", h = 0; h < f.length; h++)
                for (
                  o = (a = f[h]).length,
                    r +=
                      "M" +
                      ((a[0] * P) | 0) / P +
                      " " +
                      ((a[1] * P) | 0) / P +
                      " C",
                    s = 2;
                  s < o;
                  s++
                )
                  r += ((a[s] * P) | 0) / P + " ";
              e._prop ? (m[e._prop] = r) : m.setAttribute("d", r);
            }
          }
          e._render && f && e._render.call(e._tween, f, m);
        },
        kill: function kill() {
          this._pt = this._rawPath = 0;
        },
        getRawPath: function getRawPath(t) {
          var e,
            r = (t = (m(t) && n.test(t) && document.querySelector(t)) || t)
              .getAttribute
              ? t
              : 0;
          return r && (t = t.getAttribute("d"))
            ? (r._gsPath || (r._gsPath = {}),
              (e = r._gsPath[t]) && !e._dirty
                ? e
                : (r._gsPath[t] = stringToRawPath(t)))
            : t
            ? m(t)
              ? stringToRawPath(t)
              : s(t[0])
              ? [t]
              : t
            : console.warn(
                "Expecting a <path> element or an SVG path data string"
              );
        },
        stringToRawPath: stringToRawPath,
        rawPathToString: rawPathToString,
        normalizeStrings: function normalizeStrings(t, e, r) {
          var n = r.shapeIndex,
            a = r.map,
            o = [t, e];
          return $(o, n, a), o;
        },
        pathFilter: $,
        pointsFilter: ba,
        getTotalSize: Q,
        equalizeSegmentQuantity: Z,
        convertToPath: function convertToPath$1(t, e) {
          return C(t).map(function (t) {
            return convertToPath(t, !1 !== e);
          });
        },
        defaultType: "linear",
        defaultUpdateTarget: !0,
        defaultMap: "size"
      };
    y() && r.registerPlugin(tt), (t.MorphSVGPlugin = tt), (t.default = tt);
    if (typeof window === "undefined" || window !== t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
    } else {
      delete t.default;
    }
  });
  