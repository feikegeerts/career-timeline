<script lang="ts">
  import type { CareerEvent } from '$lib/types';
  
  export let event: CareerEvent;
  export let onClick: (id: number) => void;
</script>

<div
  class="timeline-item"
  on:click={() => onClick(event.id)}
  on:keydown={(e) => e.key === "Enter" && onClick(event.id)}
  tabindex="0"
  role="button"
  aria-label="View details for {event.title} at {event.company}"
>
  <div class="timeline-content">
    <div class="timeline-date">{event.period}</div>
    <h2>{event.title}</h2>
    <h3>{event.company}</h3>
  </div>
</div>

<style>
  .timeline-item {
    position: relative;
    margin-bottom: 3em;
    padding-left: 80px;
    cursor: pointer;
  }

  .timeline-item::before {
    content: "";
    position: absolute;
    left: 42px;
    top: 10px;
    width: 16px;
    height: 16px;
    border: 2px solid #ff3e00;
    border-radius: 50%;
    background-color: white;
  }

  .timeline-content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .timeline-content:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .timeline-date {
    font-weight: bold;
    color: #ff3e00;
    margin-bottom: 0.5em;
  }

  h2 {
    margin: 0 0 0.5em 0;
    font-size: 1.4em;
  }

  h3 {
    margin: 0 0 1em 0;
    font-size: 1.1em;
    color: #666;
    font-weight: normal;
  }
</style>
