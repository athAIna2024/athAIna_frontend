<script>
export default {
  name: "Floating_Dropdown",
  props: {
    items: Array,
    top: {
      type: String,
      required: true,
    },
    right: {
      type: Number,
      // required: true,
    },
    height: {
      type: Number,
      // required: true,
    },
    width: {
      type: Number,
      // required: true,
    }
  },
  methods: {
    // generateTab(item) {
    //   return (
    //       <button class="text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
    //               key="item.name"
    //       >
    //         <router-link to="item.route">
    //           {{item.name}}
    //         </router-link>
    //       </button>
    //   );
    // },
  },
};
</script>

<template>
  <div class="absolute h-[150px] w-[250px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col gap-y-3 justify-between p-5 shadow-md items-center"
    :style="{
      top: `${top}`,
      right: `${right}`,
      height: `${height}`,
      width: `${width}`,
     }"
  >
    <div v-for="item in items" :key="item" class="w-full">
      <button
          class="text-base border-athAIna-orange border-[3.5px] py-[5px] px-[30px] rounded-3xl text-sm w-full"
          :class="item.active ? 'bg-athAIna-orange text-athAIna-white' : 'border-athAIna-orange border-[3.5px]'"
      >
        <router-link :to="item.route">{{ item }}</router-link>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>