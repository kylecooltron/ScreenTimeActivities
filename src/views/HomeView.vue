<template>
  <div class="home">
    <div class="hero">
      <h1>Fun Ideas To Get Off Your Phone</h1>
      <p class="tagline">
        A crowd-sourced list of things to do instead of scrolling. Find something that sounds fun and go do it.
      </p>
    </div>

    <div class="cta-section">
      <div class="cta-card" @click="$router.push('/activities')">
        <h2>Activity List</h2>
        <p>Browse all activities with details on cost, time, people needed, and more.</p>
        <button class="cta-button green">Browse Activities →</button>
      </div>

      <div class="cta-card" @click="$router.push('/random')">
        <h2>Random Picker</h2>
        <p>Can't decide? Spin and let fate choose something for you.</p>
        <button class="cta-button orange">Spin the Wheel →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 1rem 2rem;
}

.hero h1 {
  font-size: 2.6rem;
  font-weight: 800;
  color: #1b4332;
  line-height: 1.2;
  margin-bottom: 1.2rem;
}

.tagline {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #3d6b52;
  max-width: 680px;
  margin: 0 auto;
}

.cta-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}

@media (max-width: 640px) {
  .cta-section {
    grid-template-columns: 1fr;
  }
  .hero h1 {
    font-size: 1.9rem;
  }
}

.cta-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.13);
}

.cta-card h2 {
  font-size: 1.5rem;
  color: #1b4332;
  margin-bottom: 0.75rem;
}

.cta-card p {
  color: #555;
  line-height: 1.6;
  font-size: 0.97rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.cta-button {
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.cta-button:hover {
  opacity: 0.88;
  transform: scale(1.03);
}

.cta-button.green {
  background: #2d6a4f;
  color: white;
}

.cta-button.orange {
  background: #e07b39;
  color: white;
}
</style>
