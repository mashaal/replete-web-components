const html = String.raw;

const css = import.meta.resolve('./button.element.css');

const template = html`<link rel="stylesheet" href="${css}" />
  <button>
    <slot></slot>
  </button>`;

export { template };

if (typeof document !== 'undefined') {
  class ExButton extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachInternals().shadowRoot;
      if (!shadow) {
        shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = template;
      }
    }
    connectedCallback() {
      const button = this?.shadowRoot?.querySelector('button');
      button?.addEventListener('click', () => {
        confirm('🐦‍🔥');
      });
    }
  }
  if (!customElements.get('ex-button')) {
    customElements.define('ex-button', ExButton);
  }
}
