<template>
  <div class="activity-list">
    <h1>Activity List</h1>
    <p class="subtitle">{{ activities.length }} activities and counting. Browse, filter, and find your next thing to do.</p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th title="Physical strain 1-5">Strain</th>
            <th title="Coordination required 1-5">Coord.</th>
            <th>Min</th>
            <th>Max</th>
            <th>Cost</th>
            <th>Travel</th>
            <th>Time</th>
            <th title="Fun rating 1-5">Fun</th>
            <th title="Replayability 1-5">Replay</th>
            <th>Learn</th>
            <th>Social</th>
            <th>♥ Rate</th>
            <th>Outside</th>
            <th>Related</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td class="name-cell">{{ activity.name }}</td>
            <td><span class="rating-dots" :title="`${activity.physicalStrain}/5`">{{ dots(activity.physicalStrain) }}</span></td>
            <td><span class="rating-dots" :title="`${activity.coordinationRequired}/5`">{{ dots(activity.coordinationRequired) }}</span></td>
            <td class="center">{{ activity.minParticipants }}</td>
            <td class="center">{{ activity.maxParticipants }}</td>
            <td>{{ activity.cost }}</td>
            <td class="center"><span :class="['badge', activity.travelRequired === 'Yes' ? 'badge-yellow' : 'badge-green']">{{ activity.travelRequired }}</span></td>
            <td>{{ activity.timeRequired }}</td>
            <td><span class="rating-dots" :title="`${activity.fun}/5`">{{ dots(activity.fun) }}</span></td>
            <td><span class="rating-dots" :title="`${activity.replayability}/5`">{{ dots(activity.replayability) }}</span></td>
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
import activities from '../data/activities.json'

function dots(n) {
  return '●'.repeat(n) + '○'.repeat(5 - n)
}
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
