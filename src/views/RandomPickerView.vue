<template>
  <div class="random-picker">
    <h1>Random Activity Picker</h1>
    <p class="subtitle">Can't decide what to do? Let fate decide for you.</p>

    <div class="slot-machine">
      <div class="machine-frame">
        <div class="machine-top">
          <div class="light" v-for="i in 3" :key="i" :class="{ lit: isSpinning }"></div>
        </div>

        <div class="reels-container">
          <div class="reel-wrapper">
            <div class="reel">
              <div
                class="reel-strip"
                :style="{ transform: `translateY(${reels[0].offset}px)`, transition: reels[0].transitioning ? `transform ${reels[0].duration}ms cubic-bezier(0.15, 0.05, 0.25, 1)` : 'none' }"
              >
                <div class="reel-item" v-for="(item, i) in reels[0].items" :key="i">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="machine-bottom">
          <div class="light" v-for="i in 3" :key="i" :class="{ lit: isSpinning }"></div>
        </div>
      </div>

      <button class="spin-button" @click="spin" :disabled="isSpinning">
        {{ isSpinning ? 'Spinning...' : '🎰 SPIN!' }}
      </button>
    </div>

    <transition name="result-fade">
      <div v-if="result && !isSpinning" class="result-card">
        <div class="result-header">
          <h2>🎉 Your Activity:</h2>
          <h3 class="result-name">{{ result.name }}</h3>
        </div>
        <div class="result-details">
          <div class="detail-item">
            <span class="detail-label">Time</span>
            <span class="detail-value">{{ result.timeRequired }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Cost</span>
            <span class="detail-value">{{ result.cost }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">People</span>
            <span class="detail-value">{{ result.minParticipants }}–{{ result.maxParticipants }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Fun</span>
            <span class="detail-value">{{ '★'.repeat(result.fun) }}{{ '☆'.repeat(5 - result.fun) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Gets heart rate up</span>
            <span class="detail-value">{{ result.getsHeartRateUp }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Social</span>
            <span class="detail-value">{{ result.socialConnection }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Outside</span>
            <span class="detail-value">{{ result.canDoOutside }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Travel needed</span>
            <span class="detail-value">{{ result.travelRequired }}</span>
          </div>
        </div>
        <div class="result-related" v-if="result.relatedActivities.length">
          <span class="detail-label">You might also like:</span>
          <span class="related-tags">
            <span class="tag" v-for="r in result.relatedActivities" :key="r">{{ r }}</span>
          </span>
        </div>
        <button class="spin-again" @click="spin">Spin Again</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import activities from '../data/activities.json'

const ITEM_HEIGHT = 80

const EMOJIS = [
  '🚴', '🧗', '🏀', '⛺', '🎨', '🎲', '🥾', '🎣',
  '🏊', '🎸', '🍳', '📚', '🧩', '⚽', '🌿', '🎯',
  '🏄', '🤸', '🎭', '🌄',
]

function buildReelItems() {
  const repeated = []
  for (let i = 0; i < 8; i++) {
    repeated.push(...EMOJIS)
  }
  return repeated
}

const reels = reactive([
  { items: buildReelItems(), offset: -(ITEM_HEIGHT * 2), duration: 1800, transitioning: false },
  { items: buildReelItems(), offset: -(ITEM_HEIGHT * 2), duration: 2200, transitioning: false },
  { items: buildReelItems(), offset: -(ITEM_HEIGHT * 2), duration: 2600, transitioning: false },
])

const isSpinning = ref(false)
const result = ref(null)

async function spin() {
  if (isSpinning.value) return
  isSpinning.value = true
  result.value = null

  const chosen = activities[Math.floor(Math.random() * activities.length)]

  // Pick a random landing emoji for each reel (purely decorative — result shown in card)
  reels.forEach((reel, index) => {
    const targetEmojiIndex = Math.floor(Math.random() * EMOJIS.length)
    // Land on the second-to-last copy of that emoji so there's always room above
    const copyOffset = (5 + index) * EMOJIS.length
    const targetIndex = copyOffset + targetEmojiIndex
    const targetPos = -(targetIndex * ITEM_HEIGHT) + ITEM_HEIGHT // center row
    reel.duration = 1800 + index * 400
    reel.transitioning = true
    reel.offset = targetPos
  })

  const maxDuration = reels[reels.length - 1].duration
  setTimeout(async () => {
    // Snap each reel back to a stable near-top position without animation
    reels.forEach(reel => {
      reel.transitioning = false
    })
    await nextTick()
    reels.forEach(reel => {
      // Reset to a visible position near top of strip
      reel.offset = -(ITEM_HEIGHT * 2)
    })
    isSpinning.value = false
    result.value = chosen
  }, maxDuration + 100)
}
</script>

<style scoped>
.random-picker {
  max-width: 700px;
  margin: 0 auto;
}

.random-picker h1 {
  font-size: 2rem;
  color: #1b4332;
  margin-bottom: 0.4rem;
}

.subtitle {
  color: #5a7a65;
  margin-bottom: 2rem;
}

.slot-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.machine-frame {
  background: linear-gradient(145deg, #c0392b, #922b21);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15);
  width: fit-content;
}

.machine-top,
.machine-bottom {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
}

.light {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffd700;
  opacity: 0.3;
  transition: opacity 0.15s;
  box-shadow: 0 0 4px #ffd700;
}

.light.lit {
  opacity: 1;
  animation: blink 0.4s infinite alternate;
}

@keyframes blink {
  from { opacity: 0.4; }
  to { opacity: 1; box-shadow: 0 0 12px #ffd700; }
}

.reels-container {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  padding: 0.75rem 0;
}

.reel-wrapper {
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  width: 120px;
  height: 160px;
  position: relative;
  box-shadow: inset 0 4px 12px rgba(0,0,0,0.5);
}

.reel-wrapper::before,
.reel-wrapper::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 30%;
  z-index: 2;
  pointer-events: none;
}

.reel-wrapper::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(17,17,17,0.95), transparent);
}

.reel-wrapper::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(17,17,17,0.95), transparent);
}

.reel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.reel-strip {
  display: flex;
  flex-direction: column;
}

.reel-item {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  border-bottom: 1px solid #333;
  line-height: 1;
}

.spin-button {
  background: linear-gradient(145deg, #f39c12, #e67e22);
  color: white;
  border: none;
  margin-bottom: 1.5rem;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(230, 126, 34, 0.5);
  transition: transform 0.1s, box-shadow 0.1s;
  letter-spacing: 1px;
}

.spin-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(230, 126, 34, 0.6);
}

.spin-button:active:not(:disabled) {
  transform: translateY(1px);
}

.spin-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  width: 100%;
  border-top: 5px solid #2d6a4f;
}

.result-header {
  margin-bottom: 1.25rem;
}

.result-header h2 {
  font-size: 1rem;
  color: #5a7a65;
  margin-bottom: 0.3rem;
}

.result-name {
  font-size: 1.8rem;
  color: #1b4332;
}

.result-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  font-weight: 600;
}

.detail-value {
  font-size: 0.95rem;
  color: #2d4a2d;
  font-weight: 500;
}

.result-related {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.related-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background: #e8f5ec;
  color: #2d6a4f;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
}

.spin-again {
  margin-top: 1.25rem;
  background: #2d6a4f;
  color: white;
  border: none;
  padding: 0.65rem 1.75rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.spin-again:hover {
  opacity: 0.85;
}

.result-fade-enter-active {
  transition: all 0.4s ease;
}

.result-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
