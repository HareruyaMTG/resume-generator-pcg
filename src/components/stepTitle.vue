<template>
  <h2 class="step-title">
    <div class="step-title-number">{{ number }}</div>
    <div class="step-title-text">{{ text }}</div>
  </h2>
</template>

<script>
export default {
  name: "stepTitle",
  props: ["number", "text"],
};
</script>

<style lang="scss" scoped>
.step-title {
  display: flex;
  align-items: flex-end;
}
.step-title-number {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #1867c0;
  text-align: center;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.step-title-text {
  font-size: 1.25rem;
  line-height: 1;
}
</style>