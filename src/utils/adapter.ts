class Adapter<T> {
  private ids: Set<string>;
  private entities: Map<string, T>;

  constructor(entities: T[], selectId: (item: T) => string) {
    this.ids = new Set(entities.map(selectId));
    this.entities = new Map(
      entities.map((entity) => [selectId(entity), entity])
    );
    this.selectId = selectId;
  }

  get all() {
    return Array.from(this.entities.values());
  }

  get length() {
    return this.ids.size;
  }

  has(id: string) {
    return this.ids.has(id);
  }

  get(id: string) {
    return this.entities.get(id);
  }

  add(entity: T) {
    const id = this.getId(entity);
    if (!this.ids.has(id)) {
      this.ids.add(id);
      this.entities.set(id, entity);
    }
  }

  update(id: string, changes: Partial<T>) {
    const entity = this.entities.get(id);
    if (entity) {
      this.entities.set(id, { ...entity, ...changes });
    }
  }

  remove(id: string) {
    this.ids.delete(id);
    this.entities.delete(id);
  }

  clear() {
    this.ids.clear();
    this.entities.clear();
  }

  private getId(entity: T) {
    return this.selectId(entity);
  }

  private selectId: (item: T) => string;
}

export default Adapter;
