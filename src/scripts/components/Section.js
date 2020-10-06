class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = containerSelector;
    this._items = items;
    this._renderer = renderer;
  }

  addItem(element, isArray) {
    if (isArray) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems() {

    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}

export { Section };
