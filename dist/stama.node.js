!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.stama=r():t.stama=r()}(global,function(){return function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(r){return t[r]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=0)}([function(t,r,e){"use strict";e.r(r);var n={};e.r(n),e.d(n,"setState",function(){return i}),e.d(n,"modifyState",function(){return u}),e.d(n,"createProps",function(){return a});const o={}.constructor.prototype,i=(t,r,e)=>{let n=t;if(r&&(n={...t}),"function"==typeof r?Object.assign(n,r(t)):Object.assign(n,r),!e)return n;if("function"==typeof e)return Object.assign(n,e(n));if("object"==typeof e)return Object.keys(e).forEach(t=>{const r=e[t];n[t]="function"==typeof r?r(n):r}),n;throw new Error("Modify state: unknown type of derive props")},s=(t,r,e)=>{if(!r)return t;if("function"==typeof r)return s(t,r(t,e,t));const n={...t};return Object.keys(r).forEach(i=>{const u=r[i],c=n[i];let a;(t=>Object.getPrototypeOf(t)===o)(a="function"==typeof u?u(c,e,t):u)&&(a=s(c,a,e,t)),n[i]=a}),n},u=(t,r,e)=>{const n=s(t,r,t);if(!e)return n;if("function"==typeof e)return Object.assign(n,e(n));if("object"==typeof e)return Object.keys(e).forEach(t=>{const r=e[t];n[t]="function"==typeof r?r(n):r}),n;throw new Error("Modify state: unknown type of derive props")},c=(t,r=[])=>{let e=t;if("function"==typeof t)e=t(...r);else{if("object"!=typeof t)throw new Error("createProps: don't know how to interpret: ",t);e={},Object.keys(t).forEach(n=>{const o=t[n];e[n]="function"==typeof o?o(...r):o})}return e},a=(t,r)=>{if(Array.isArray(t)){const e={};return t.forEach(t=>Object.assign(e,c(t,r))),e}return c(t,r)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var p=function(t,r){return(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(t,r)};function h(t,r){function e(){this.constructor=t}p(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}function f(t){return"function"==typeof t}var l=!1,b={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;l=t},get useDeprecatedSynchronousErrorHandling(){return l}};function d(t){setTimeout(function(){throw t})}var y={closed:!0,next:function(t){},error:function(t){if(b.useDeprecatedSynchronousErrorHandling)throw t;d(t)},complete:function(){}},v=Array.isArray||function(t){return t&&"number"==typeof t.length};var _,w={e:{}};function E(){try{return _.apply(this,arguments)}catch(t){return w.e=t,w}}function S(t){return _=t,E}function g(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(t,r){return r+1+") "+t.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}g.prototype=Object.create(Error.prototype);var m=g,x=function(){function t(t){this.closed=!1,this._parent=null,this._parents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}var r;return t.prototype.unsubscribe=function(){var t,r=!1;if(!this.closed){var e=this._parent,n=this._parents,o=this._unsubscribe,i=this._subscriptions;this.closed=!0,this._parent=null,this._parents=null,this._subscriptions=null;for(var s,u=-1,c=n?n.length:0;e;)e.remove(this),e=++u<c&&n[u]||null;if(f(o))S(o).call(this)===w&&(r=!0,t=t||(w.e instanceof m?O(w.e.errors):[w.e]));if(v(i))for(u=-1,c=i.length;++u<c;){var a=i[u];if(null!=(s=a)&&"object"==typeof s)if(S(a.unsubscribe).call(a)===w){r=!0,t=t||[];var p=w.e;p instanceof m?t=t.concat(O(p.errors)):t.push(p)}}if(r)throw new m(t)}},t.prototype.add=function(r){if(!r||r===t.EMPTY)return t.EMPTY;if(r===this)return this;var e=r;switch(typeof r){case"function":e=new t(r);case"object":if(e.closed||"function"!=typeof e.unsubscribe)return e;if(this.closed)return e.unsubscribe(),e;if("function"!=typeof e._addParent){var n=e;(e=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+r+" added to Subscription.")}return(this._subscriptions||(this._subscriptions=[])).push(e),e._addParent(this),e},t.prototype.remove=function(t){var r=this._subscriptions;if(r){var e=r.indexOf(t);-1!==e&&r.splice(e,1)}},t.prototype._addParent=function(t){var r=this._parent,e=this._parents;r&&r!==t?e?-1===e.indexOf(t)&&e.push(t):this._parents=[t]:this._parent=t},t.EMPTY=((r=new t).closed=!0,r),t}();function O(t){return t.reduce(function(t,r){return t.concat(r instanceof m?r.errors:r)},[])}var j="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),P=function(t){function r(e,n,o){var i=t.call(this)||this;switch(i.syncErrorValue=null,i.syncErrorThrown=!1,i.syncErrorThrowable=!1,i.isStopped=!1,i._parentSubscription=null,arguments.length){case 0:i.destination=y;break;case 1:if(!e){i.destination=y;break}if("object"==typeof e){e instanceof r?(i.syncErrorThrowable=e.syncErrorThrowable,i.destination=e,e.add(i)):(i.syncErrorThrowable=!0,i.destination=new T(i,e));break}default:i.syncErrorThrowable=!0,i.destination=new T(i,e,n,o)}return i}return h(r,t),r.prototype[j]=function(){return this},r.create=function(t,e,n){var o=new r(t,e,n);return o.syncErrorThrowable=!1,o},r.prototype.next=function(t){this.isStopped||this._next(t)},r.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},r.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},r.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},r.prototype._next=function(t){this.destination.next(t)},r.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},r.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},r.prototype._unsubscribeAndRecycle=function(){var t=this._parent,r=this._parents;return this._parent=null,this._parents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parent=t,this._parents=r,this._parentSubscription=null,this},r}(x),T=function(t){function r(r,e,n,o){var i,s=t.call(this)||this;s._parentSubscriber=r;var u=s;return f(e)?i=e:e&&(i=e.next,n=e.error,o=e.complete,e!==y&&(f((u=Object.create(e)).unsubscribe)&&s.add(u.unsubscribe.bind(u)),u.unsubscribe=s.unsubscribe.bind(s))),s._context=u,s._next=i,s._error=n,s._complete=o,s}return h(r,t),r.prototype.next=function(t){if(!this.isStopped&&this._next){var r=this._parentSubscriber;b.useDeprecatedSynchronousErrorHandling&&r.syncErrorThrowable?this.__tryOrSetError(r,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},r.prototype.error=function(t){if(!this.isStopped){var r=this._parentSubscriber,e=b.useDeprecatedSynchronousErrorHandling;if(this._error)e&&r.syncErrorThrowable?(this.__tryOrSetError(r,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(r.syncErrorThrowable)e?(r.syncErrorValue=t,r.syncErrorThrown=!0):d(t),this.unsubscribe();else{if(this.unsubscribe(),e)throw t;d(t)}}},r.prototype.complete=function(){var t=this;if(!this.isStopped){var r=this._parentSubscriber;if(this._complete){var e=function(){return t._complete.call(t._context)};b.useDeprecatedSynchronousErrorHandling&&r.syncErrorThrowable?(this.__tryOrSetError(r,e),this.unsubscribe()):(this.__tryOrUnsub(e),this.unsubscribe())}else this.unsubscribe()}},r.prototype.__tryOrUnsub=function(t,r){try{t.call(this._context,r)}catch(t){if(this.unsubscribe(),b.useDeprecatedSynchronousErrorHandling)throw t;d(t)}},r.prototype.__tryOrSetError=function(t,r,e){if(!b.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{r.call(this._context,e)}catch(r){return b.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=r,t.syncErrorThrown=!0,!0):(d(r),!0)}return!1},r.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},r}(P);var D="function"==typeof Symbol&&Symbol.observable||"@@observable";function M(){}function k(t){return t?1===t.length?t[0]:function(r){return t.reduce(function(t,r){return r(t)},r)}:M}var H=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(r){var e=new t;return e.source=this,e.operator=r,e},t.prototype.subscribe=function(t,r,e){var n=this.operator,o=function(t,r,e){if(t){if(t instanceof P)return t;if(t[j])return t[j]()}return t||r||e?new P(t,r,e):new P(y)}(t,r,e);if(n?n.call(o,this.source):o.add(this.source||b.useDeprecatedSynchronousErrorHandling&&!o.syncErrorThrowable?this._subscribe(o):this._trySubscribe(o)),b.useDeprecatedSynchronousErrorHandling&&o.syncErrorThrowable&&(o.syncErrorThrowable=!1,o.syncErrorThrown))throw o.syncErrorValue;return o},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(r){b.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=r),!function(t){for(;t;){var r=t,e=r.closed,n=r.destination,o=r.isStopped;if(e||o)return!1;t=n&&n instanceof P?n:null}return!0}(t)?console.warn(r):t.error(r)}},t.prototype.forEach=function(t,r){var e=this;return new(r=U(r))(function(r,n){var o;o=e.subscribe(function(r){try{t(r)}catch(t){n(t),o&&o.unsubscribe()}},n,r)})},t.prototype._subscribe=function(t){var r=this.source;return r&&r.subscribe(t)},t.prototype[D]=function(){return this},t.prototype.pipe=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return 0===t.length?this:k(t)(this)},t.prototype.toPromise=function(t){var r=this;return new(t=U(t))(function(t,e){var n;r.subscribe(function(t){return n=t},function(t){return e(t)},function(){return t(n)})})},t.create=function(r){return new t(r)},t}();function U(t){if(t||(t=b.Promise||Promise),!t)throw new Error("no Promise impl found");return t}function V(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}V.prototype=Object.create(Error.prototype);var A=V,Y=function(t){function r(r,e){var n=t.call(this)||this;return n.subject=r,n.subscriber=e,n.closed=!1,n}return h(r,t),r.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,r=t.observers;if(this.subject=null,r&&0!==r.length&&!t.isStopped&&!t.closed){var e=r.indexOf(this.subscriber);-1!==e&&r.splice(e,1)}}},r}(x),C=function(t){function r(r){var e=t.call(this,r)||this;return e.destination=r,e}return h(r,t),r}(P),z=function(t){function r(){var r=t.call(this)||this;return r.observers=[],r.closed=!1,r.isStopped=!1,r.hasError=!1,r.thrownError=null,r}return h(r,t),r.prototype[j]=function(){return new C(this)},r.prototype.lift=function(t){var r=new R(this,this);return r.operator=t,r},r.prototype.next=function(t){if(this.closed)throw new A;if(!this.isStopped)for(var r=this.observers,e=r.length,n=r.slice(),o=0;o<e;o++)n[o].next(t)},r.prototype.error=function(t){if(this.closed)throw new A;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var r=this.observers,e=r.length,n=r.slice(),o=0;o<e;o++)n[o].error(t);this.observers.length=0},r.prototype.complete=function(){if(this.closed)throw new A;this.isStopped=!0;for(var t=this.observers,r=t.length,e=t.slice(),n=0;n<r;n++)e[n].complete();this.observers.length=0},r.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},r.prototype._trySubscribe=function(r){if(this.closed)throw new A;return t.prototype._trySubscribe.call(this,r)},r.prototype._subscribe=function(t){if(this.closed)throw new A;return this.hasError?(t.error(this.thrownError),x.EMPTY):this.isStopped?(t.complete(),x.EMPTY):(this.observers.push(t),new Y(this,t))},r.prototype.asObservable=function(){var t=new H;return t.source=this,t},r.create=function(t,r){return new R(t,r)},r}(H),R=function(t){function r(r,e){var n=t.call(this)||this;return n.destination=r,n.source=e,n}return h(r,t),r.prototype.next=function(t){var r=this.destination;r&&r.next&&r.next(t)},r.prototype.error=function(t){var r=this.destination;r&&r.error&&this.destination.error(t)},r.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},r.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):x.EMPTY},r}(z),W=function(t){function r(r){var e=t.call(this)||this;return e._value=r,e}return h(r,t),Object.defineProperty(r.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),r.prototype._subscribe=function(r){var e=t.prototype._subscribe.call(this,r);return e&&!e.closed&&r.next(this._value),e},r.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new A;return this._value},r.prototype.next=function(r){t.prototype.next.call(this,this._value=r)},r}(z);function q(t,r,e){if(!r.has(t))throw new TypeError("attempted to set private field on non-instance");var n=r.get(t);if(!n.writable)throw new TypeError("attempted to set read only private field");return n.value=e,e}function B(t,r){if(!r.has(t))throw new TypeError("attempted to get private field on non-instance");return r.get(t).value}var F=new WeakMap,G=class{get state(){return B(this,F).value}get stateStream(){return B(this,F).asObservable()}constructor(t){var r,e,n;F.set(this,{writable:!0,value:void 0}),n=((...t)=>B(this,F).subscribe(...t)),(e="subscribe")in(r=this)?Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[e]=n,this.forceStateUpdate=this.forceStateUpdate.bind(this);const o=t||this.constructor.initState;if(o){const t=this.constructor.deriveProps||this.deriveProps;q(this,F,new W(i(o,null,t))),this.stateDidChange(this.state)}else q(this,F,new W)}async modState(t,r){if(null===t)return void(r&&r());const e=this.constructor.deriveProps||this.deriveProps,n=this.state,o=u(n,t,e);B(this,F).next(o),r&&r(o),this.stateDidChange(o,n)}async setState(t,r){if(null===t)return void(r&&r());const e=this.constructor.deriveProps||this.deriveProps,n=this.state,o=i(n,t,e);B(this,F).next(o),r&&r(o),this.stateDidChange(o,n)}stateDidChange(t,r){}forceStateUpdate(){return this.setState({})}clone(){const t=new this.constructor;return B(t,F).next(this.state),t}};e.d(r,"StateUtils",function(){return I});const I=n;r.default=G}])});