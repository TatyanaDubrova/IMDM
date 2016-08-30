"use strict";
let instance = null;

class Router{
    constructor (routes = [], mode = 'hash', root = '/') {
        if(!instance){
            instance = this;
        }
        this.routes = routes;
        this.mode = mode && mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
        this.root = root ? '/' + this.clearSlashes(root) + '/' : '/';

        // to test whether we have singleton or not
        //this.time = new Date();

        return instance;
    }

    getFragment () {
        let fragment = '';
        if(this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            let match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    }

    clearSlashes (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    add (re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    }

    remove (param) {
        for(let i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }

    flush () {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    }

    check (f) {
        let fragment = f || this.getFragment();
        for(let i=0; i<this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler(... match);
                return this;
            }
        }
        return this;
    }

    listen () {
        let current = this.getFragment();
        let fn = () => {
            if(current !== this.getFragment()) {
                current = this.getFragment();
                this.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    }

    navigate (path) {
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}

module.exports = Router;

