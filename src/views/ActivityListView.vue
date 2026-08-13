<template>
  <div class="activity-list">
    <h1>Activity List</h1>
    <p class="subtitle">{{ activities.length }} activities and counting. Browse, filter, and find your next thing to do.</p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th @click="sort('name')" :class="sortClass('name')">Activity</th>
            <th @click="sort('physicalStrain')" :class="sortClass('physicalStrain')" title="Physical strain 1-5">Strain</th>
            <th @click="sort('coordinationRequired')" :class="sortClass('coordinationRequired')" title="Coordination required 1-5">Coord.</th>
            <th @click="sort('minParticipants')" :class="sortClass('minParticipants')">Min</th>
            <th @click="sort('maxParticipants')" :class="sortClass('maxParticipants')">Max</th>
            <th @click="sort('cost')" :class="sortClass('cost')">Cost</th>
            <th @click="sort('travelRequired')" :class="sortClass('travelRequired')">Travel</th>
            <th @click="sort('timeRequired')" :class="sortClass('timeRequired')">Time</th>
            <th @click="sort('fun')" :class="sortClass('fun')" title="Fun rating 1-5">Fun</th>
            <th @click="sort('replayability')" :class="sortClass('replayability')" title="Replayability 1-5">Replay</th>
            <th @click="sort('learnFromIt')" :class="sortClass('learnFromIt')">Learn</th>
            <th @click="sort('socialConnection')" :class="sortClass('socialConnection')">Social</th>
            <th @click="sort('getsHeartRateUp')" :class="sortClass('getsHeartRateUp')">♥ Rate</th>
            <th @click="sort('canDoOutside')" :class="sortClass('canDoOutside')">Outside</th>
            <th>Related</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in sortedActivities" :key="activity.id">
            <td class="name-cell">{{ activity.name }}</td>
            <td><span class="rating-dots" :title="`${activity.physicalStrain}/5`"><span class="star-filled">{{ '⭐'.repeat(activity.physicalStrain) }}</span><span class="star-empty">{{ '☆'.repeat(5 - activity.physicalStrain) }}</span></span></td>
            <td><span class="rating-dots" :title="`${activity.coordinationRequired}/5`"><span class="star-filled">{{ '⭐'.repeat(activity.coordinationRequired) }}</span><span class="star-empty">{{ '☆'.repeat(5 - activity.coordinationRequired) }}</span></span></td>
            <td class="center">{{ activity.minParticipants }}</td>
            <td class="center">{{ activity.maxParticipants }}</td>
            <td>{{ activity.cost === '$0.00' ? '' : activity.cost }}</td>
            <td class="center"><span :class="['badge', activity.travelRequired === 'Yes' ? 'badge-yellow' : 'badge-green']">{{ activity.travelRequired }}</span></td>
            <td>{{ activity.timeRequired.slice(0, -3) }}</td>
            <td><span class="rating-dots" :title="`${activity.fun}/5`"><span class="star-filled">{{ '⭐'.repeat(activity.fun) }}</span><span class="star-empty">{{ '☆'.repeat(5 - activity.fun) }}</span></span></td>
            <td><span class="rating-dots" :title="`${activity.replayability}/5`"><span class="star-filled">{{ '⭐'.repeat(activity.replayability) }}</span><span class="star-empty">{{ '☆'.repeat(5 - activity.replayability) }}</span></span></td>
            <td class="center"><span :class="['badge', activity.learnFromIt === 'Yes' ? 'badge-blue' : 'badge-gray']">{{ activity.learnFromIt }}</span></td>
            <td class="center"><span :class="['badge', activity.socialConnection === 'Yes' ? 'badge-purple' : 'badge-gray']">{{ activity.socialConnection }}</span></td>
            <td class="center"><span :class="['badge', activity.getsHeartRateUp === 'Yes' ? 'badge-red' : 'badge-gray']">{{ activity.getsHeartRateUp }}</span></td>
            <td class="center"><span :class="['badge', activity.canDoOutside === 'Yes' ? 'badge-green' : 'badge-gray']">{{ activity.canDoOutside }}</span></td>
            <td class="related-cell">{{ activity.relatedActivities.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import activities from '../data/activities.json'

const sortKey = ref('name')
const sortDir = ref(1)

function sort(key) {
  if (sortKey.value === key) {
    sortDir.value *= -1
  } else {
    sortKey.value = key
    sortDir.value = 1
  }
}

function sortClass(key) {
  if (sortKey.value !== key) return 'sortable'
  return sortDir.value === 1 ? 'sortable sort-asc' : 'sortable sort-desc'
}

const sortedActivities = computed(() => {
  return [...activities].sort((a, b) => {
    let av = a[sortKey.value]
    let bv = b[sortKey.value]
    if (sortKey.value === 'cost') {
      av = parseFloat(av.replace('$', ''))
      bv = parseFloat(bv.replace('$', ''))
    }
    if (av < bv) return -1 * sortDir.value
    if (av > bv) return 1 * sortDir.value
    return 0
  })
})


</script>

<style scoped>
.activity-list h1 {
  font-size: 2rem;
  color: #1b4332;
  margin-bottom: 0.4rem;
}

.subtitle {
  color: #5a7a65;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 0.88rem;
}

thead th {
  background: #2d6a4f;
  color: white;
  padding: 0.75rem 0.6rem;
  text-align: left;
  white-space: nowrap;
  position: sticky;
  top: 0;
}

thead th.sortable {
  cursor: pointer;
  user-select: none;
}

thead th.sortable:hover {
  background: #3a8a65;
}

thead th.sort-asc::after {
  content: ' ▲';
  font-size: 0.65rem;
}

thead th.sort-desc::after {
  content: ' ▼';
  font-size: 0.65rem;
}

tbody tr:nth-child(even) {
  background: #f7fbf8;
}

tbody tr:hover {
  background: #e8f5ec;
}

td {
  padding: 0.6rem 0.6rem;
  border-bottom: 1px solid #e5efe8;
  vertical-align: top;
}

.name-cell {
  font-weight: 600;
  color: #1b4332;
  white-space: nowrap;
}

.center {
  text-align: center;
}

.rating-dots {
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #2d6a4f;
  white-space: nowrap;
}

.star-filled {
  font-size: 0.5rem;
}

.star-empty {
  font-size: 0.7rem;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-green { background: #d1fadf; color: #166534; }
.badge-yellow { background: #fef3c7; color: #92400e; }
.badge-blue { background: #dbeafe; color: #1e40af; }
.badge-purple { background: #ede9fe; color: #4c1d95; }
.badge-red { background: #fee2e2; color: #991b1b; }
.badge-gray { background: #f3f4f6; color: #6b7280; }

.related-cell {
  color: #666;
  font-size: 0.8rem;
  max-width: 200px;
}

.legend {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.legend h3 {
  color: #1b4332;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.4rem 2rem;
  font-size: 0.88rem;
  color: #555;
}
</style>
