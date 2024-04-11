declare module '@svgdotjs/svg.js' {
    const registerWindow;
}
import { SVG, Container, registerWindow } from '@svgdotjs/svg.js';
import * as svgdom from 'svgdom';
registerWindow(svgdom, svgdom.document);

const canvas = SVG(svgdom.document.documentElement) as Container;

const rect = canvas.rect(100, 100).fill('#f06');
import { DOMImplementation, Document } from 'xmldom';

interface SVGWindow extends Window {
    document: Document;
}

interface CreateSVGWindowOptions {
    features?: {
        FetchExternalResources?: boolean;
        ProcessExternalResources?: boolean;
        SkipExternalResources?: boolean;
        MutationEvents?: boolean;
        QuerySelector?: boolean;
        MutationObserver?: boolean;
    };
    url?: string;
}

declare function createSVGWindow(options?: CreateSVGWindowOptions): SVGWindow;

interface SVGElement extends Element {
    setAttribute(name: string, value: string): void;
}
