<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import AttendeesView from './AttendeesView.vue'
import UshersView from './UshersView.vue'
import VenueView from './VenueView.vue'

const themeOverrides: GlobalThemeOverrides = {
  Tabs: {
    tabTextColorLine: '#01328a',
    tabTextColorActiveLine: '#fe15c6',
    barColor: '#fe15c6',
    tabTextColorHoverLine: '#fe15c6',
    paneTextColor: '#01328a'
  },
  Card: {
    titleTextColor: '#01328a',
    titleFontSizeMedium: '1.5rem',
    borderColor: 'none'
  },
  Button: {
    colorHoverPrimary: '#fe15c6',
    colorPrimary: '#01328a',
    borderPrimary: 'none',
    borderHoverPrimary: 'none',
    colorDisabledPrimary: '#01328a',
    borderDisabledPrimary: 'none'
  },
  Input: {
    borderHover: '#fe15c6',
    borderFocus: '#fe15c6',
    borderColor: '#fe15c6',
    boxShadowFocus: '#fe15c6',
    caretColor: '#01328a',
    textColor: '#01328a'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <n-card title="View wallet details">
        <n-tabs
          class="card-tabs"
          default-value="attendees"
          justify-content="space-evenly"
          type="line"
          size="large"
          animated
        >
          <n-tab-pane name="attendees" tab="Attendees">
            <attendees-view />
          </n-tab-pane>
          <n-tab-pane name="ushers" tab="Ushers">
            <ushers-view />
          </n-tab-pane>
          <n-tab-pane name="venue" tab="Venue">
            <venue-view />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </main>
  </n-config-provider>
</template>

<style scoped></style>
