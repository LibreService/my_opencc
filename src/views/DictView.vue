<script setup lang="ts">
import { MyBulkConverter } from '@libreservice/my-widget'
import { txtToOcd2 } from '../workerAPI'
</script>

<template>
  <my-bulk-converter
    class="my-column"
    title="TXT to OCD2"
    :extensions="['txt']"
    zip-name="ocd2-dicts"
    :converter="txtToOcd2"
  />
</template>
