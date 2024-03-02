import { Component, ComponentInterface, Host, State, h } from '@stencil/core';

const DEFAULT_ITEM_COUNT = 8;
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
  scoped: true,
})
export class MyComponent implements ComponentInterface {
  private nestedTestExampleRef: HTMLMyNestedComponentElement;
  @State() dynamicTestItems: HTMLElement[] = [];

  componentWillLoad(): void | Promise<void> {
    this.dynamicTestItems = this.createTestVNodes();
  }

  private createTestVNodes = (count = DEFAULT_ITEM_COUNT, shuffle = false): HTMLElement[] => {
    const items = Array.from(new Array(count)).map((_, i) => <span class="default-slot-item">{`item-${i}`}</span>);
    return shuffle ? items.sort(() => Math.random() - 0.5) : items;
  };

  private createTestElements = (count = DEFAULT_ITEM_COUNT, shuffle = false): HTMLElement[] => {
    const items = Array.from(new Array(count)).map((_, i) => {
      const element = document.createElement('span');
      element.className = 'default-slot-item';
      element.textContent = `item-${i}`;
      return element;
    });
    return shuffle ? items.sort(() => Math.random() - 0.5) : items;
  };

  render() {
    return (
      <Host>
        <my-nested-component ref={el => (this.nestedTestExampleRef = el)}>
          <span slot="header">Header Text</span>
          {this.dynamicTestItems}
        </my-nested-component>

        <button
          onClick={() => {
            const items = Array.from(this.nestedTestExampleRef?.querySelectorAll('.default-slot-item') || []);
            for (let i = 0; i < items.length; i++) {
              items[i].remove();
            }
            for (const item of this.createTestElements(getRandomInt(1, 20))) {
              this.nestedTestExampleRef?.appendChild(item);
            }
          }}
        >
          Randomize Item Count
        </button>
      </Host>
    );
  }
}
