<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import _ from 'lodash'
import { NSpace, NSelect, NButton, NIcon, NPopover, NCheckbox, NInput, NGrid, NGi, useMessage } from 'naive-ui'
import { SwapHorizRound, ContentCopyFilled } from '@vicons/material'
import { convert } from '../workerAPI'

const original = ref<string>('')
const converted = ref<string>('')

type Character = 's' | 't' | 'tw' | 'hk' | 'jp'

const sourceOptions: {
  label: string,
  value: Character
}[] = [
  {
    label: '简体',
    value: 's'
  },
  {
    label: '繁体',
    value: 't'
  },
  {
    label: '繁体（台湾）',
    value: 'tw'
  },
  {
    label: '繁体（香港）',
    value: 'hk'
  },
  {
    label: '日文新字体',
    value: 'jp'
  }
]

const targetOptions = computed(() => {
  const availableTargets = matrix[source.value]
  return sourceOptions.map(option => availableTargets.includes(option.value) ? option : { ...option, disabled: true })
})

const matrix: { [key: string]: Character[] } = {
  s: ['t', 'tw', 'hk'],
  t: ['s', 'tw', 'hk', 'jp'],
  tw: ['s', 't'],
  hk: ['s', 't'],
  jp: ['t']
}

const source = ref<Character>('s')
const target = ref<Character>('t')
const phrase = ref<boolean>(false)

const phraseEnabled = computed(() => (source.value === 's' && target.value === 'tw') || (source.value === 'tw' && target.value === 's'))

function setSource (newSource: Character) {
  source.value = newSource
  const availableTargets = matrix[newSource]
  if (!availableTargets.includes(target.value)) {
    target.value = availableTargets[0]
  }
}

function swap () {
  const temp = source.value
  source.value = target.value
  target.value = temp
  original.value = converted.value
}

const autosize = { minRows: 4, maxRows: 10 }

async function convertText () {
  const p = phraseEnabled.value && phrase.value ? 'p' : ''
  converted.value = await convert(`${source.value}2${target.value}${p}.json`, original.value)
}

watch([source, target, original, phrase], _.debounce(convertText, 300))

const message = useMessage()

function copy () {
  navigator.clipboard.writeText(converted.value).then(() => {
    message.success('已复制')
  })
}
</script>

<template>
  <n-space
    vertical
    class="my-column"
  >
    <div
      style="display: flex; align-items: center"
    >
      <n-select
        :value="source"
        :options="sourceOptions"
        @update-value="setSource"
      />
      <n-popover>
        <template #trigger>
          <n-button
            circle
            secondary
            style="font-size: 24px; margin: 0 8px 0 8px"
            @click="swap"
          >
            <n-icon :component="SwapHorizRound" />
          </n-button>
        </template>
        切换
      </n-popover>
      <n-select
        v-model:value="target"
        :options="targetOptions"
      />
    </div>
    <n-checkbox
      v-model:checked="phrase"
      :disabled="!phraseEnabled"
    >
      转换地域用词
    </n-checkbox>
    <n-grid
      x-gap="12"
      y-gap="12"
      cols="1 720:2"
    >
      <n-gi>
        <n-input
          v-model:value="original"
          type="textarea"
          size="large"
          :autosize="autosize"
          maxlength="5000"
          show-count
          clearable
          placeholder="请输入"
        />
      </n-gi>
      <n-gi>
        <n-input
          type="textarea"
          size="large"
          :autosize="autosize"
          :value="converted"
          placeholder="转换结果"
        />
      </n-gi>
    </n-grid>
    <div style="text-align: right">
      <n-popover>
        <template #trigger>
          <n-button
            circle
            secondary
            :disabled="converted.length === 0"
            style="font-size: 24px"
            @click="copy"
          >
            <n-icon :component="ContentCopyFilled" />
          </n-button>
        </template>
        复制
      </n-popover>
    </div>
  </n-space>
</template>
