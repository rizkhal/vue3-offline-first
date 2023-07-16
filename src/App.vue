<script setup>
import { v4 } from "uuid";
import { ref, reactive } from "vue";
import { useDatabase } from "./database";

const items = ref([]);
const loading = ref(true);
const model = reactive({
  name: null,
  company_name: null,
});

const db = useDatabase();
const source = db.collections.contacts;

const observable = source.find().$;

observable.subscribe((allNonDoneTodos) => {
  items.value = { ...allNonDoneTodos };
  loading.value = false;
});

const save = async () => {
  const data = {
    id: v4(),
    ...model,
  };

  await source.insert(data);

  resetModel();
};

const resetModel = () => {
  for (const key in model) {
    if (Object.prototype.hasOwnProperty.call(model, key)) {
      model[key] = null;
    }
  }
};
</script>
<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-slate-500">Contact</h1>
    <form class="flex flex-col space-y-2">
      <input
        class="border"
        placeholder="name"
        type="text"
        v-model="model.name"
      />
      <input
        class="border"
        placeholder="company name"
        type="text"
        v-model="model.company_name"
      />
      <button class="border bg-indigo-500" @click.prevent="save">Save</button>
    </form>

    <table class="border mt-6">
      <thead>
        <th class="p-4">id</th>
        <th class="p-4">name</th>
        <th class="p-4">company</th>
      </thead>
      <tbody>
        <tr v-if="loading" class="border">
          <td class="p-4" colspan="3">Loading...</td>
        </tr>
        <tr
          v-if="!loading"
          v-for="(item, index) in items"
          :key="index.toString()"
          class="border"
        >
          <td class="p-4">{{ item.id }}</td>
          <td class="p-4">{{ item.name }}</td>
          <td class="p-4">{{ item.company_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
