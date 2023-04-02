import { createPinia, setActivePinia } from "pinia";
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { useTodoStore } from "./todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  // Déclare le store
  let store: ReturnType<typeof useTodoStore>;

  // Créé un nouveau store avant chaque test
  beforeEach(() => {
    store = useTodoStore();
  });

  // Réinitialise le store après chaque test
  afterEach(() => {
    store.$reset();
  });

  test("create a store", () => {
    const store = useTodoStore();
    expect(store).toBeDefined();
  });

  test("initialize  with empty items", () => {
    expect(store.items).toEqual([]);
  });

  test("add a todo", () => {
    store.add({ title: "My todo" });
    expect(store.items).toEqual([
      {
        id: expect.any(String),
        title: "My todo",
        done: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });

  test("gets by id", () => {
    // Ajoute un todo
    store.add({ title: "My todo" });
    // Récupère le todo ajouté
    // @ts-ignore
    const item = store.items[0];
    // Récupère le todo ajouté par son id
    const todo = store.getById(item.id);
    // Vérifie que le todo récupéré est le même que celui ajouté
    expect(todo).toStrictEqual(item);
  });

  test("gets ordered todos without mutating state", () => {
    const items = [
      { createdAt: new Date(2020, 2, 14) },
      { createdAt: new Date(2023, 3, 14) },
      { createdAt: new Date(2022, 5, 13) },
    ];

    // @ts-ignore
    store.items = items;

    const orderedTodos = store.getOrderedTodos;

    expect(orderedTodos[0].createdAt.getFullYear()).toBe(2020);
    expect(orderedTodos[1].createdAt.getFullYear()).toBe(2022);
    expect(orderedTodos[2].createdAt.getFullYear()).toBe(2023);
    expect(store.items[0].createdAt.getFullYear()).toBe(2020);
  });

  test("remove a todo", () => {
    // Ajoute un todo
    store.add({ title: "My todo" });
    // Récupère le todo ajouté
    // @ts-ignore
    const item = store.items[0];
    // Supprime le todo ajouté
    store.remove(item.id);
    // Vérifie que le todo a bien été supprimé
    expect(store.items).toEqual([]);
  });

  test("update a todo", () => {
    store.add({ title: "test" });
    // @ts-ignore
    const item = store.items[0];
    store.update(item.id, { done: true });
    const updatedItem = store.items[0];
    expect(updatedItem?.done).toBe(true);
  });

  test("update a todo title", () => {
    store.add({ title: "test" });
    // @ts-ignore
    const item = store.items[0];
    store.update(item.id, { title: "zobi" });
    const updatedItem = store.items[0];
    expect(updatedItem?.title).toBe("zobi");
  });
});
