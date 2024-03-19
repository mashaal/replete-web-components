const template = `<link rel="stylesheet" href="${import.meta.resolve(
  './button.element.css'
)}"/><button><slot></slot></button>`;

export { template };

if (typeof document !== 'undefined') {
  class ExButton extends HTMLElement {
    constructor() {
      super();

      const internals = this.attachInternals();

      // check for a Declarative Shadow Root:
      let shadow = internals.shadowRoot;

      if (!shadow) {
        // there wasn't one. create a new Shadow Root:
        shadow = this.attachShadow({
          mode: 'open',
        });

        shadow.innerHTML = template;
      }

      console.log(shadow);
    }
    connectedCallback() {
      const button = this?.shadowRoot?.querySelector('button');
      button?.addEventListener('click', () => {
        alert('🐦‍🔥');
      });
    }
  }

  if (!customElements.get('ex-button')) {
    customElements.define('ex-button', ExButton);
  }
}
