<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useGymClassesStore } from '@/stores/gymClassesStore'

const router = useRouter()
const store = useGymClassesStore()

// Services
const services = [
  {
    name: 'Classes',
    icon: 'pi pi-users',
    description: 'Group fitness classes led by expert trainers',
  },
  {
    name: 'Personal Training',
    icon: 'pi pi-heart',
    description: 'One-on-one sessions tailored to your goals',
  },
  {
    name: 'Equipment',
    icon: 'pi pi-ellipsis-h',
    description: 'State-of-the-art fitness equipment',
  },
  {
    name: 'Workouts',
    icon: 'pi pi-bolt',
    description: 'Customized workout plans for all levels',
  },
]

// Workout Types
const workoutTypes = [
  { name: 'Cardio', description: 'Boost your cardiovascular fitness' },
  { name: 'Leg Training', description: 'Strengthen and tone your legs' },
  { name: 'Arms & Shoulders', description: 'Build upper body strength' },
  { name: 'Back & Core', description: 'Core stability and back strength' },
]

// Benefits/Features
const benefits = [
  { title: 'Clean Air 24/7', icon: 'pi pi-cloud' },
  { title: 'Modern Equipment', icon: 'pi pi-circle-fill' },
  { title: 'Café Services', icon: 'pi pi-coffee' },
  { title: 'Workout Plans', icon: 'pi pi-calendar' },
  { title: 'Nutrition Plans', icon: 'pi pi-apple' },
  { title: 'Community', icon: 'pi pi-comments' },
]

// Categories for class management
const categories = [
  {
    name: 'Yoga',
    icon: 'pi pi-video',
    description: 'Improve flexibility and meditation',
  },
  {
    name: 'Fitness',
    icon: 'pi pi-bolt',
    description: 'Build strength and endurance',
  },
  {
    name: 'Pilates',
    icon: 'pi pi-circle',
    description: 'Core strength and flexibility',
  },
  {
    name: 'CrossFit',
    icon: 'pi pi-star',
    description: 'High-intensity workouts',
  },
]

// Testimonials
const testimonials = [
  {
    name: 'John Doe',
    role: 'Satisfied Client',
    text: 'The trainers here are amazing! I started as a complete beginner and now I feel confident with my workouts.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Regular Member',
    text: "Best gym experience I've had. The community here is supportive and the equipment is top-notch!",
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Fitness Enthusiast',
    text: 'Transformed my fitness journey here. Highly recommend for anyone serious about their health.',
    rating: 5,
  },
]

// Stats
const stats = [
  { value: '5+', label: 'Years of Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '50+', label: 'Modern Equipment' },
  { value: '24/7', label: 'Access' },
]

// Navigate to class list
const navigateToCategory = (categoryName: string) => {
  router.push({
    name: 'GymClasses',
    query: { category: categoryName },
  })
}

// Navigate to manage classes
const goToManagement = () => {
  router.push({
    name: 'GymClasses',
  })
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Fetch classes on mount
onMounted(() => {
  store.fetchClasses()
})
</script>

<template>
  <div class="home-container">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">IGNITE YOUR FITNESS JOURNEY</h1>
        <p class="hero-subtitle">
          Join our community where energy ignites, strength builds, and dreams become reality
        </p>
        <div class="hero-buttons">
          <Button
            label="Start Training"
            icon="pi pi-arrow-right"
            @click="goToManagement"
            class="hero-btn primary"
          />
          <Button
            label="Learn More"
            icon="pi pi-chevron-down"
            @click="scrollToSection('services')"
            class="hero-btn secondary"
          />
        </div>
      </div>
    </section>

    <!-- SERVICES SECTION -->
    <section class="services" id="services">
      <div class="section-container">
        <h2 class="section-title">What We Offer</h2>
        <p class="section-subtitle">Everything you need for your fitness goals</p>
        <div class="services-grid">
          <div v-for="service in services" :key="service.name" class="service-card">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WORKOUT TYPES SECTION -->
    <section class="workouts">
      <div class="section-container">
        <h2 class="section-title">Our Workouts</h2>
        <p class="section-subtitle">Choose the training style that fits you</p>
        <div class="workouts-grid">
          <div v-for="workout in workoutTypes" :key="workout.name" class="workout-card">
            <h3>{{ workout.name }}</h3>
            <p>{{ workout.description }}</p>
            <Button
              label="Explore"
              icon="pi pi-arrow-right"
              @click="navigateToCategory('Fitness')"
              class="workout-btn"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS SECTION -->
    <section class="benefits">
      <div class="section-container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.title" class="benefit-item">
            <i :class="benefit.icon"></i>
            <h4>{{ benefit.title }}</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- CLASS CATEGORIES SECTION -->
    <section class="classes-section">
      <div class="section-container">
        <h2 class="section-title">Our Classes</h2>
        <p class="section-subtitle">Select a category to explore and manage classes</p>
        <div class="categories-grid">
          <div v-for="category in categories" :key="category.name" class="category-card-wrapper">
            <Card class="category-card">
              <template #content>
                <div class="card-content">
                  <i :class="category.icon" class="card-icon"></i>
                  <h3>{{ category.name }}</h3>
                  <p>{{ category.description }}</p>
                  <Button
                    label="Manage"
                    icon="pi pi-arrow-right"
                    @click="navigateToCategory(category.name)"
                    class="manage-btn"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section class="testimonials">
      <div class="section-container">
        <h2 class="section-title">What Our Members Say</h2>
        <div class="testimonials-grid">
          <Card
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="testimonial-card"
          >
            <template #content>
              <div class="rating">
                <i v-for="i in testimonial.rating" :key="i" class="pi pi-star-fill"></i>
              </div>
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.role }}</p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats">
      <div class="section-container">
        <h2 class="section-title">Our Impact</h2>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Transform?</h2>
        <p>Join thousands of members who have already started their fitness journey</p>
        <Button
          label="Get Started Today"
          icon="pi pi-check"
          @click="goToManagement"
          class="cta-btn"
        />
      </div>
    </section>

    <!-- FOOTER SECTION -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>About Us</h4>
          <p>Your premier gym destination for professional training and community support.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#classes">Classes</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>Email: info@gymapp.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 GymApp. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Root container */
.home-container {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  overflow-x: hidden;
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* HERO SECTION */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(15, 15, 15, 0.95) 0%,
    rgba(26, 26, 26, 0.95) 50%,
    rgba(255, 140, 0, 0.05) 100%
  );
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #e5e5e5;
  margin-bottom: 2.5rem;
  font-weight: 300;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

:deep(.hero-btn.primary) {
  background: #ff8c00 !important;
  border: 2px solid #ff8c00 !important;
  color: #0f0f0f !important;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 2.5rem !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

:deep(.hero-btn.primary:hover) {
  background: #ffa500 !important;
  border-color: #ffa500 !important;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.6);
}

:deep(.hero-btn.secondary) {
  background: transparent !important;
  border: 2px solid #ff8c00 !important;
  color: #ff8c00 !important;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 2.5rem !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

:deep(.hero-btn.secondary:hover) {
  background: rgba(255, 140, 0, 0.1) !important;
  border-color: #ffa500 !important;
  color: #ffa500 !important;
}

/* SECTION TITLES */
.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  color: #ff8c00;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  text-align: center;
  color: #e5e5e5;
  margin-bottom: 3rem;
  font-weight: 300;
}

/* SERVICES SECTION */
.services {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #ff8c00;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 140, 0, 0.1);
  transition: left 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(255, 140, 0, 0.3);
  border-color: #ffa500;
}

.service-card:hover::before {
  left: 0;
}

.service-icon {
  font-size: 3rem;
  color: #ff8c00;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.service-card h3 {
  font-size: 1.5rem;
  color: #ffa500;
  margin-bottom: 0.5rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.service-card p {
  font-size: 0.95rem;
  color: #e5e5e5;
  position: relative;
  z-index: 1;
}

/* WORKOUTS SECTION */
.workouts {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%);
}

.workouts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.workout-card {
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%);
  border: 2px solid #ff8c00;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.workout-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 50px rgba(255, 140, 0, 0.4);
}

.workout-card h3 {
  font-size: 1.5rem;
  color: #ffa500;
  margin-bottom: 1rem;
  font-weight: 700;
}

.workout-card p {
  font-size: 0.95rem;
  color: #e5e5e5;
  margin-bottom: 1.5rem;
}

:deep(.workout-btn) {
  background: #ff8c00 !important;
  border: 2px solid #ff8c00 !important;
  color: #0f0f0f !important;
  font-weight: 700;
  transition: all 0.3s ease;
}

:deep(.workout-btn:hover) {
  background: #ffa500 !important;
  border-color: #ffa500 !important;
}

/* BENEFITS SECTION */
.benefits {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.benefit-item {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #ff8c00;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.benefit-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(255, 140, 0, 0.3);
}

.benefit-item i {
  font-size: 2.5rem;
  color: #ffa500;
  margin-bottom: 1rem;
}

.benefit-item h4 {
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 700;
}

/* CLASS CATEGORIES SECTION */
.classes-section {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.category-card-wrapper {
  transition: all 0.3s ease;
}

.category-card-wrapper:hover {
  transform: translateY(-15px) scale(1.05);
}

:deep(.category-card) {
  height: 100%;
  border: 3px solid #ff8c00 !important;
  box-shadow: 0 8px 32px rgba(255, 140, 0, 0.3);
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.95) 0%,
    rgba(15, 15, 15, 0.95) 100%
  ) !important;
  transition: all 0.3s ease;
}

:deep(.category-card:hover) {
  box-shadow: 0 20px 50px rgba(255, 140, 0, 0.5);
  border-color: #ffa500 !important;
}

:deep(.category-card .p-card-content) {
  padding: 2rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff8c00;
  text-shadow: 0 0 20px rgba(255, 140, 0, 0.3);
}

.card-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #ffa500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-content p {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: #e5e5e5;
  font-weight: 300;
}

:deep(.manage-btn) {
  background: #ff8c00 !important;
  border: 2px solid #ff8c00 !important;
  color: #0f0f0f !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  transition: all 0.3s ease !important;
}

:deep(.manage-btn:hover) {
  background: #ffa500 !important;
  border-color: #ffa500 !important;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.5) !important;
  transform: scale(1.05);
}

/* TESTIMONIALS SECTION */
.testimonials {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

:deep(.testimonial-card) {
  background: rgba(26, 26, 26, 0.9) !important;
  border: 2px solid #ff8c00 !important;
  border-radius: 12px !important;
  padding: 2rem !important;
  transition: all 0.3s ease;
}

:deep(.testimonial-card:hover) {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(255, 140, 0, 0.3) !important;
}

.rating {
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.rating i {
  color: #ff8c00;
  font-size: 1rem;
}

.testimonial-text {
  font-size: 0.95rem;
  color: #e5e5e5;
  margin-bottom: 1.5rem;
  font-style: italic;
  line-height: 1.6;
}

.testimonial-author h4 {
  color: #ffa500;
  margin-bottom: 0.2rem;
  font-weight: 700;
}

.testimonial-author p {
  color: #999999;
  font-size: 0.85rem;
}

/* STATS SECTION */
.stats {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #ff8c00;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 50px rgba(255, 140, 0, 0.4);
}

.stat-value {
  font-size: 3rem;
  font-weight: 900;
  color: #ff8c00;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #e5e5e5;
  font-weight: 600;
}

/* CTA SECTION */
.cta {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.15) 0%, rgba(15, 15, 15, 0.95) 100%);
  border-top: 3px solid #ff8c00;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  color: #ff8c00;
  margin-bottom: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.cta-content p {
  font-size: 1.1rem;
  color: #e5e5e5;
  margin-bottom: 2rem;
  font-weight: 300;
}

:deep(.cta-btn) {
  background: #ff8c00 !important;
  border: 2px solid #ff8c00 !important;
  color: #0f0f0f !important;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 3rem !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

:deep(.cta-btn:hover) {
  background: #ffa500 !important;
  border-color: #ffa500 !important;
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.6);
  transform: scale(1.05);
}

/* FOOTER */
.footer {
  background: #0a0a0a;
  border-top: 2px solid #ff8c00;
  padding: 3rem 2rem 1rem;
  color: #e5e5e5;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto 2rem;
}

.footer-section h4 {
  color: #ff8c00;
  margin-bottom: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-section p {
  font-size: 0.9rem;
  opacity: 0.9;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ffa500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #ff8c00;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 140, 0, 0.2);
  font-size: 0.85rem;
  opacity: 0.7;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  :deep(.hero-btn),
  :deep(.cta-btn) {
    width: 100%;
  }

  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
