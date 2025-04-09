<script lang="ts">
  import type { CareerEvent } from '$lib/types';
  import { fly } from 'svelte/transition';
  
  export let event: CareerEvent;
  export let onClick: (id: number) => void;
  export let index: number = 0;
</script>

<div
  class="timeline-item"
  on:click={() => onClick(event.id)}
  on:keydown={(e) => e.key === "Enter" && onClick(event.id)}
  tabindex="0"
  role="button"
  aria-label="View details for {event.title} at {event.company}"
  in:fly={{ y: 20, duration: 300, delay: index * 100 }}
>
  <div class="timeline-content">
    <div class="timeline-date">{event.period}</div>
    <h2>{event.title}</h2>
    <h3>{event.company}</h3>
    <div class="view-more">
      <span>View Details</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </div>
  </div>
</div>

<style>
  .timeline-item {
    position: relative;
    margin-bottom: 3em;
    padding-left: 80px;
    cursor: pointer;
    transform-origin: left center;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .timeline-item::before {
    content: "";
    position: absolute;
    left: 42px;
    top: 10px;
    width: 16px;
    height: 16px;
    border: 2px solid #3e84ff;
    border-radius: 50%;
    background-color: white;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 0 0 0 rgba(62, 132, 255, 0);
  }

  .timeline-item:hover::before {
    box-shadow: 0 0 0 6px rgba(62, 132, 255, 0.2);
    transform: scale(1.1);
  }

  .timeline-content {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 1.8em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
  }

  .timeline-content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3e84ff, #6eb4ff, transparent);
    transition: width 0.6s ease;
  }

  .timeline-item:hover .timeline-content:before {
    width: 100%;
  }

  .timeline-content:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }

  .timeline-date {
    font-weight: bold;
    color: #3e84ff;
    margin-bottom: 0.7em;
    letter-spacing: 0.5px;
    font-size: 0.95em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0 0 0.5em 0;
    font-size: 1.4em;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .timeline-content:hover h2 {
    transform: translateX(4px);
    color: #3e84ff;
  }

  h3 {
    margin: 0 0 1em 0;
    font-size: 1.1em;
    color: #555;
    font-weight: normal;
  }

  .view-more {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    color: #3e84ff;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .view-more span {
    margin-right: 5px;
  }

  .view-more svg {
    transition: transform 0.3s ease;
  }

  .timeline-content:hover .view-more {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-content:hover .view-more svg {
    transform: translateX(4px);
  }

  @media (max-width: 640px) {
    .timeline-item {
      padding-left: 50px;
    }
    
    .timeline-item::before {
      left: 12px;
    }
  }
</style>
