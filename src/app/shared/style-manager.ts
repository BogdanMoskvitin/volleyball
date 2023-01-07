import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class StyleManager {

  setStyle(key: string, href: string): void{
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string): void{
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  getLinkElementForKey(key: string): Element {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  getExistingLinkElementByKey(key: string): Element {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`) as Element;
  }

  createLinkElementWithKey(key: string): Element {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  getClassNameForKey(key: string): string {
    return `style-manager-${key}`;
  }
}
