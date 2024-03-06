import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
  scoped: true,
})
export class MyComponent implements ComponentInterface {
  render() {
    return (
      <Host>
        <my-nested-component>
          <span slot="header">Header Text</span>
          <slot />
        </my-nested-component>
      </Host>
    );
  }
}
